import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const comments = await prisma.comment.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      user: { select: { name: true, email: true } },
      post: { select: { title: true, slug: true } },
    },
  });

  return NextResponse.json({
    comments: comments.map((c) => ({
      id: c.id,
      content: c.content,
      authorName: c.authorName,
      status: c.status,
      createdAt: c.createdAt,
      user: c.user,
      post: c.post,
      displayName: c.authorName || c.user?.name || "Anonymous",
    })),
  });
}
