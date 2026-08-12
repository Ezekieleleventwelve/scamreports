import { NextRequest, NextResponse } from "next/server";
import { getWarnlistEntry } from "@/lib/warnlist-data";
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = getWarnlistEntry(slug);

  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    entry: {
      slug: entry.slug,
      name: entry.name,
      amountOwed: entry.amountOwed ?? null,
      amountOwedCurrency: entry.amountOwedCurrency ?? "CHF",
    },
  });
}
