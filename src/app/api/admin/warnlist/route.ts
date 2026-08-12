import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { slugifyWarnlistName, WARNLIST_TYPES } from "@/lib/warnlist";
import { z } from "zod";

const createSchema = z.object({
  type: z.enum(WARNLIST_TYPES),
  name: z.string().min(2).max(200),
  aliases: z.string().max(500).optional(),
  websites: z.string().max(500).optional(),
  country: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  summary: z.string().min(20).max(5000),
  sourceLabel: z.string().max(200).optional(),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  reportSlug: z.string().max(200).optional(),
  listedAt: z.string().datetime().optional(),
  amountOwed: z.number().min(0).max(1_000_000_000).optional().nullable(),
  amountOwedCurrency: z.string().length(3).optional(),
});

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const entries = await prisma.warnlistEntry.findMany({
    orderBy: { listedAt: "desc" },
  });

  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  let slug = slugifyWarnlistName(data.name);
  const existing = await prisma.warnlistEntry.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString(36)}`;

  const entry = await prisma.warnlistEntry.create({
    data: {
      type: data.type,
      name: data.name,
      slug,
      aliases: data.aliases || "",
      websites: data.websites || "",
      country: data.country || null,
      location: data.location || null,
      summary: data.summary,
      sourceLabel: data.sourceLabel || null,
      sourceUrl: data.sourceUrl || null,
      reportSlug: data.reportSlug || null,
      amountOwed: data.amountOwed ?? null,
      amountOwedCurrency: data.amountOwedCurrency?.toUpperCase() || "CHF",
      listedAt: data.listedAt ? new Date(data.listedAt) : new Date(),
      status: "ACTIVE",
    },
  });

  return NextResponse.json({ entry }, { status: 201 });
}
