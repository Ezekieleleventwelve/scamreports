import { NextResponse } from "next/server";
import { getClientFingerprint } from "./ip";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

/**
 * In-memory rate limiter keyed by opaque client fingerprint (never a raw IP).
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number = 60_000
): Promise<NextResponse | null> {
  const fingerprint = await getClientFingerprint();
  const storeKey = `${key}:${fingerprint}`;
  const now = Date.now();

  const entry = store.get(storeKey);
  if (!entry || now > entry.resetAt) {
    store.set(storeKey, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count++;
  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    );
  }

  return null;
}
