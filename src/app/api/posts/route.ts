import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { publishedPostFeedWhere } from "@/lib/post-feed";
import { slugify, calculateReadingTime } from "@/lib/utils";
import { sanitizeContent } from "@/lib/sanitize";
import { logIpAction } from "@/lib/ip";
import { requireAuth } from "@/lib/auth-guard";
import { rateLimit } from "@/lib/rate-limit";
import { createPostSchema, parseBody } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  // Return categories list
  if (searchParams.get("categories") === "true") {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json({ categories });
  }

  // Return user's own posts
  if (searchParams.get("mine") === "true") {
    const auth = await requireAuth();
    if (auth instanceof NextResponse) return NextResponse.json({ posts: [] });

    const posts = await prisma.post.findMany({
      where: { authorId: auth.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ posts });
  }

  // Return published posts
  const posts = await prisma.post.findMany({
    where: publishedPostFeedWhere,
    orderBy: { publishedAt: "desc" },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: { select: { id: true, name: true, slug: true } },
      _count: { select: { comments: true } },
    },
  });

  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 posts per hour
  const limited = await rateLimit("post-create", 5, 60 * 60 * 1000);
  if (limited) return limited;

  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const parsed = parseBody(createPostSchema, body);
  if (!parsed.success) return parsed.error;

  const { title, content, excerpt, categoryId, tags, keywords, featuredImage, image1, image2, image3 } = parsed.data;

  const sanitizedContent = sanitizeContent(content);
  const slug = slugify(title) + "-" + Date.now().toString(36);
  const readingTime = calculateReadingTime(sanitizedContent);

  const isAdmin = auth.role === "ADMIN";

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content: sanitizedContent,
      excerpt: excerpt || null,
      featuredImage: featuredImage || null,
      image1: image1 || null,
      image2: image2 || null,
      image3: image3 || null,
      categoryId: categoryId || null,
      tags: tags || "",
      keywords: keywords || "",
      metaTitle: title,
      metaDescription: excerpt || sanitizedContent.substring(0, 160),
      authorId: auth.userId,
      readingTime,
      status: isAdmin ? "PUBLISHED" : "PENDING",
      publishedAt: isAdmin ? new Date() : null,
    },
  });

  await logIpAction(auth.userId, "POST_CREATED", JSON.stringify({ postId: post.id }));

  return NextResponse.json(post, { status: 201 });
}
