import { NextResponse } from "next/server";
import { getIndexNowKey } from "@/lib/indexnow";

/** Serves IndexNow key at /{KEY}.txt via next.config rewrite. */
export async function GET() {
  const key = getIndexNowKey();
  if (!key) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
