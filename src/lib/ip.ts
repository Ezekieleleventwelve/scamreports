import { createHmac } from "crypto";
import { headers } from "next/headers";
import prisma from "./prisma";

const IPV4_REGEX =
  /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
const IPV6_REGEX = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;

function isValidIp(ip: string): boolean {
  if (ip.length > 45) return false;
  return IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip);
}

function hashSecret(): string {
  return (
    process.env.CLIENT_FINGERPRINT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "scamreports-fingerprint-fallback"
  );
}

/** Raw peer address — never export, never persist. */
async function peekRawPeer(): Promise<string> {
  const hdrs = await headers();
  const trustProxy = process.env.TRUST_PROXY === "true";

  if (trustProxy) {
    const forwarded = hdrs.get("x-forwarded-for");
    if (forwarded) {
      const ip = forwarded.split(",")[0].trim();
      if (isValidIp(ip)) return ip;
    }
    const realIp = hdrs.get("x-real-ip");
    if (realIp && isValidIp(realIp)) return realIp;
  }

  return "unknown";
}

/**
 * Opaque client fingerprint (HMAC). Safe for rate limits / audit rows.
 * Never a plaintext IP, hostname, or device id.
 */
export async function getClientFingerprint(): Promise<string> {
  const raw = await peekRawPeer();
  return createHmac("sha256", hashSecret()).update(raw).digest("hex");
}

/** @deprecated Use getClientFingerprint — never returns a raw IP. */
export async function getClientIp(): Promise<string> {
  return getClientFingerprint();
}

export async function logIpAction(
  userId: string | null,
  action: string,
  metadata?: string
): Promise<void> {
  const fingerprint = await getClientFingerprint();
  await prisma.ipLog.create({
    data: {
      userId,
      ipAddress: fingerprint,
      action,
      metadata,
    },
  });
}
