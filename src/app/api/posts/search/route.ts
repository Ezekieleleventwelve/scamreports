import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { publishedPostFeedWhere } from "@/lib/post-feed";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  // Rate limit: 30 searches per minute
  const limited = await rateLimit("search", 30, 60 * 1000);
  if (limited) return limited;

  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ posts: [] });
  }

  const posts = await prisma.post.findMany({
    where: {
      ...publishedPostFeedWhere,
      OR: [
        { title: { contains: q } },
        { excerpt: { contains: q } },
        { tags: { contains: q } },
        { keywords: { contains: q } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    take: 8,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      category: { select: { name: true, slug: true } },
    },
  });

  return NextResponse.json({ posts });
}
