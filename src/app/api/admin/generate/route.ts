import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { logIpAction } from "@/lib/ip";
import { generateArticle } from "@/lib/generate-article";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { topic, context, categoryId } = await req.json();

  const result = await generateArticle({
    topic,
    context,
    categoryId,
    authorId: admin.userId,
  });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error },
      { status: 400 }
    );
  }

  await logIpAction(
    admin.userId,
    "AI_DRAFT_GENERATED",
    JSON.stringify({ postId: result.post.id, topic: topic?.slice(0, 100) })
  );

  return NextResponse.json({
    success: true,
    post: result.post,
  });
}
