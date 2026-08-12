/**
 * Fortress helpers — edge-safe checks for middleware + routes.
 * Layer 1: Cloudflare / edge
 * Layer 2: path + bot + rate gates (this file / middleware)
 * Layer 3: Auth (NextAuth ADMIN_EMAIL only) + optional admin gate secret
 */

const PROBE_PATHS =
  /(^|\/)(\.env|\.git|wp-admin|wp-login|xmlrpc\.php|phpmyadmin|admin\.php|cgi-bin|actuator|server-status|config\.json|credentials|id_rsa|\.aws|\.docker|vendor\/phpunit)/i;

const BAD_UA =
  /sqlmap|nikto|nmap|masscan|zgrab|dirbuster|gobuster|wfuzz|hydra|acunetix|nessus|burpsuite|python-requests|scrapy|httpclient|go-http-client\/|curl\/|wget\/|libwww-perl|java\/|semrush|ahrefs|dataforseo|petalbot|bytespider|gptbot|ccbot|amazonbot|claudebot|ai2bot|meta-externalagent/i;

/** Allow legitimate monitoring / browsers; block obvious attack tools. */
export function isHostileUserAgent(ua: string | null): boolean {
  if (!ua || ua.trim().length < 12) return true;
  if (BAD_UA.test(ua)) return true;
  return false;
}

export function isProbePath(pathname: string): boolean {
  return PROBE_PATHS.test(pathname);
}

/** Production: prefer traffic that already passed Cloudflare. */
export function missingCloudflareEdge(req: {
  headers: { get(name: string): string | null };
}): boolean {
  if (process.env.REQUIRE_CLOUDFLARE !== "true") return false;
  // Cloudflare always sends CF-Ray on proxied requests
  return !req.headers.get("cf-ray");
}

/** Optional Cloudflare Access (Zero Trust) in front of /admin. */
export function missingCloudflareAccess(req: {
  headers: { get(name: string): string | null };
}): boolean {
  if (process.env.ADMIN_REQUIRE_CF_ACCESS !== "true") return false;
  return !req.headers.get("cf-access-jwt-assertion");
}

/**
 * Shared secret gate (VPN/browser extension / CF Worker injects header or cookie).
 * Use with rotating personal VPN — IP is never allowlisted; identity is the gate.
 */
export function missingAdminGate(req: {
  headers: { get(name: string): string | null };
  cookies: { get(name: string): { value: string } | undefined };
}): boolean {
  const secret = process.env.ADMIN_GATE_SECRET?.trim();
  if (!secret) return false;
  const header = req.headers.get("x-scamreports-admin-gate");
  const cookie = req.cookies.get("scamreports_admin_gate")?.value;
  return header !== secret && cookie !== secret;
}

export function fortressSecurityHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "X-DNS-Prefetch-Control": "off",
  };
}
