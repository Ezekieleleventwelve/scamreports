import { NextResponse } from "next/server";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function turnstileEnabled(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()
  );
}

/**
 * Verify Cloudflare Turnstile when configured.
 * If keys are unset (local), skips — production should set both env vars.
 */
export async function verifyTurnstile(
  token: unknown
): Promise<NextResponse | null> {
  if (!turnstileEnabled()) return null;

  if (typeof token !== "string" || token.length < 10 || token.length > 2048) {
    return NextResponse.json({ error: "Bot check failed." }, { status: 403 });
  }

  try {
    const body = new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token,
    });
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    if (!data.success) {
      return NextResponse.json({ error: "Bot check failed." }, { status: 403 });
    }
  } catch {
    return NextResponse.json(
      { error: "Bot check unavailable. Try again." },
      { status: 503 }
    );
  }

  return null;
}
