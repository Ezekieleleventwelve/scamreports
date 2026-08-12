import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { updatePostSchema, parseBody } from "@/lib/validations";
import { sanitizeContent } from "@/lib/sanitize";
import { logIpAction } from "@/lib/ip";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Only return published posts to public — drafts/pending require admin
  if (post.status !== "PUBLISHED") {
    const admin = await requireAdmin();
    if (admin instanceof NextResponse) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  return NextResponse.json(post);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const body = await req.json();

  // Validate only whitelisted fields — no mass assignment
  const parsed = parseBody(updatePostSchema, body);
  if (!parsed.success) return parsed.error;

  const data: Record<string, unknown> = {};
  const allowed = parsed.data;

  if (allowed.title !== undefined) data.title = allowed.title;
  if (allowed.content !== undefined) data.content = sanitizeContent(allowed.content);
  if (allowed.excerpt !== undefined) data.excerpt = allowed.excerpt;
  if (allowed.status !== undefined) data.status = allowed.status;
  if (allowed.categoryId !== undefined) data.categoryId = allowed.categoryId;
  if (allowed.tags !== undefined) data.tags = allowed.tags;
  if (allowed.keywords !== undefined) data.keywords = allowed.keywords;
  if (allowed.featuredImage !== undefined) data.featuredImage = allowed.featuredImage || null;
  if (allowed.image1 !== undefined) data.image1 = allowed.image1 || null;
  if (allowed.image2 !== undefined) data.image2 = allowed.image2 || null;
  if (allowed.image3 !== undefined) data.image3 = allowed.image3 || null;
  if (allowed.metaTitle !== undefined) data.metaTitle = allowed.metaTitle;
  if (allowed.metaDescription !== undefined) data.metaDescription = allowed.metaDescription;
  if (allowed.translations !== undefined) data.translations = allowed.translations;

  // Auto-set publishedAt when publishing
  if (allowed.status === "PUBLISHED") {
    const existing = await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } });
    if (!existing?.publishedAt) {
      data.publishedAt = new Date();
    }
  }

  const post = await prisma.post.update({ where: { id }, data });

  await logIpAction(admin.userId, "POST_UPDATED", JSON.stringify({ postId: id, fields: Object.keys(data) }));

  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  await prisma.post.delete({ where: { id } });

  await logIpAction(admin.userId, "POST_DELETED", JSON.stringify({ postId: id }));

  return NextResponse.json({ success: true });
}
