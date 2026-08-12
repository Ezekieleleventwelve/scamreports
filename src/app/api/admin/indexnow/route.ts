import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { WARNLIST_ENTRIES } from "@/data/warnlist";
import {
  allWarnlistIndexUrls,
  pingIndexNow,
} from "@/lib/indexnow";
import { rateLimit } from "@/lib/rate-limit";

/** Admin-only: push all warnlist URLs to Bing/Yandex IndexNow. */
export async function POST() {
  const limited = await rateLimit("indexnow", 3, 60 * 60 * 1000);
  if (limited) return limited;

  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const urls = allWarnlistIndexUrls(WARNLIST_ENTRIES);
  const result = await pingIndexNow(urls);

  return NextResponse.json({
    ...result,
    urlCount: urls.length,
  });
}
