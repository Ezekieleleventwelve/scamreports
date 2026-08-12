/**
 * IndexNow — instant URL notify for Bing / Yandex / Seznam (Yahoo uses Bing).
 * Set INDEXNOW_KEY and place the same key in public/{key}.txt
 * @see https://www.indexnow.org/documentation
 */

import { WARNLIST_BASE, warnlistEntryPath } from "@/lib/warnlist-paths";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export function getIndexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim();
  return key && key.length >= 8 ? key : null;
}

export async function pingIndexNow(urls: string[]): Promise<{
  ok: boolean;
  status?: number;
  skipped?: string;
}> {
  const key = getIndexNowKey();
  if (!key) return { ok: false, skipped: "INDEXNOW_KEY not set" };

  const host = new URL(SITE_URL).host;
  const unique = [...new Set(urls.filter((u) => u.startsWith("http")))].slice(
    0,
    10_000
  );
  if (unique.length === 0) return { ok: false, skipped: "no urls" };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  let lastStatus = 0;
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host,
          key,
          keyLocation: `${SITE_URL}/${key}.txt`,
          urlList: unique,
        }),
      });
      lastStatus = res.status;
      if (res.status === 200 || res.status === 202) {
        return { ok: true, status: res.status };
      }
    } catch {
      /* try next endpoint */
    }
  }

  return { ok: false, status: lastStatus };
}

export function allWarnlistIndexUrls(entries: { slug: string }[]): string[] {
  return [
    `${SITE_URL}${WARNLIST_BASE}`,
    ...entries.map((e) => `${SITE_URL}${warnlistEntryPath(e.slug)}`),
  ];
}
