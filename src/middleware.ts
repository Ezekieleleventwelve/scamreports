import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  fortressSecurityHeaders,
  isHostileUserAgent,
  isProbePath,
  missingAdminGate,
  missingCloudflareAccess,
  missingCloudflareEdge,
} from "@/lib/fortress";

/** Per-isolate sliding window (Cloudflare + Vercel absorb real DDoS; this stops cheap floods). */
const hits = new Map<string, { n: number; reset: number }>();

function edgeRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const row = hits.get(key);
  if (!row || now > row.reset) {
    hits.set(key, { n: 1, reset: now + windowMs });
    return false;
  }
  row.n += 1;
  return row.n > limit;
}

function clientKey(req: NextRequest): string {
  // Prefer CF fingerprinting headers — never store raw IP in app logs
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function withFortressHeaders(res: NextResponse): NextResponse {
  const h = fortressSecurityHeaders();
  for (const [k, v] of Object.entries(h)) res.headers.set(k, v);
  res.headers.delete("x-powered-by");
  return res;
}

function deny(status: number, body?: string): NextResponse {
  return withFortressHeaders(
    new NextResponse(body ?? "Forbidden", {
      status,
      headers: { "Cache-Control": "no-store" },
    })
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const ua = req.headers.get("user-agent");
  const key = clientKey(req);

  // --- Layer: kill scanner probes early ---
  if (isProbePath(pathname)) {
    return deny(404);
  }

  if (missingCloudflareEdge(req)) {
    return deny(403);
  }

  // Hostile tooling on mutating / sensitive routes (allow Telegram webhook)
  const isTelegram = pathname.startsWith("/api/telegram");
  const sensitive =
    !isTelegram &&
    (pathname.startsWith("/api/") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/auth") ||
      (method !== "GET" && method !== "HEAD"));
  if (sensitive && isHostileUserAgent(ua)) {
    return deny(403);
  }

  // Global cheap flood brake (per edge isolate)
  if (edgeRateLimit(`g:${key}`, 120, 60_000)) {
    return withFortressHeaders(
      NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": "60" } }
      )
    );
  }

  // Harder limits on write APIs
  if (
    pathname.startsWith("/api/") &&
    ["POST", "PATCH", "PUT", "DELETE"].includes(method)
  ) {
    if (edgeRateLimit(`w:${key}`, 30, 60_000)) {
      return withFortressHeaders(
        NextResponse.json(
          { error: "Too many requests" },
          { status: 429, headers: { "Retry-After": "60" } }
        )
      );
    }
  }

  // Scrape brake on public JSON/search
  if (
    method === "GET" &&
    (pathname.startsWith("/api/posts") ||
      pathname.startsWith("/api/warnlist") ||
      pathname.startsWith("/api/posts/search"))
  ) {
    if (edgeRateLimit(`r:${key}`, 60, 60_000)) {
      return withFortressHeaders(
        NextResponse.json(
          { error: "Too many requests" },
          { status: 429, headers: { "Retry-After": "60" } }
        )
      );
    }
  }

  const isAdminSurface =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  // --- Admin castle: CF Access + shared gate + JWT role ---
  if (isAdminSurface) {
    if (edgeRateLimit(`a:${key}`, 40, 60_000)) {
      return deny(429);
    }
    if (missingCloudflareAccess(req)) {
      return deny(403, "Admin access requires Cloudflare Access.");
    }
    if (missingAdminGate(req)) {
      return deny(403, "Admin gate required.");
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const role =
      token && typeof token === "object"
        ? (token as { role?: string }).role
        : undefined;

    if (token && role && role !== "ADMIN") {
      return withFortressHeaders(
        NextResponse.redirect(new URL("/", req.url))
      );
    }

    // Auth routes under admin still need session for pages — layout rechecks
    const res = withFortressHeaders(NextResponse.next());
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    res.headers.set("Pragma", "no-cache");
    return res;
  }

  // --- CSRF / origin lock for API writes ---
  if (
    pathname.startsWith("/api/") &&
    ["POST", "PATCH", "PUT", "DELETE"].includes(method)
  ) {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    const secFetchSite = req.headers.get("sec-fetch-site");
    const isTelegram = pathname.startsWith("/api/telegram");
    const isAuth = pathname.startsWith("/api/auth");

    if (isTelegram || isAuth) {
      // telegram: shared secret in route; auth: NextAuth
    } else if (origin) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return withFortressHeaders(
            NextResponse.json({ error: "Forbidden" }, { status: 403 })
          );
        }
      } catch {
        return withFortressHeaders(
          NextResponse.json({ error: "Forbidden" }, { status: 403 })
        );
      }
    } else if (secFetchSite === "cross-site") {
      return withFortressHeaders(
        NextResponse.json({ error: "Forbidden" }, { status: 403 })
      );
    } else if (!secFetchSite && !pathname.startsWith("/api/auth")) {
      const accept = req.headers.get("accept") || "";
      const contentType = req.headers.get("content-type") || "";
      if (
        contentType.includes("application/json") &&
        !accept.includes("text/html")
      ) {
        return withFortressHeaders(
          NextResponse.json({ error: "Forbidden" }, { status: 403 })
        );
      }
    }
  }

  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 10 * 1024 * 1024) {
    return withFortressHeaders(
      NextResponse.json({ error: "Request too large" }, { status: 413 })
    );
  }

  return withFortressHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
