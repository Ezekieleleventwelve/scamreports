import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { postStatusFilter } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const searchParams = req.nextUrl.searchParams;
  const rawStatus = searchParams.get("status");

  // Validate status enum
  const statusResult = postStatusFilter.safeParse(rawStatus || undefined);
  const statusFilter = statusResult.success ? statusResult.data : undefined;

  const where = statusFilter ? { status: statusFilter } : {};

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { id: true, name: true, email: true } },
      category: { select: { id: true, name: true, slug: true } },
      _count: { select: { comments: true, claims: true } },
    },
  });

  return NextResponse.json({ posts });
}
