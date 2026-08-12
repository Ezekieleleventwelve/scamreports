import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sanitizeComment } from "@/lib/sanitize";
import { logIpAction, getClientIp } from "@/lib/ip";
import { rateLimit } from "@/lib/rate-limit";
import { checkCommentSpam } from "@/lib/comment-spam";
import { createCommentSchema, parseBody } from "@/lib/validations";

const commentInclude = {
  user: { select: { name: true, image: true } },
  replies: {
    where: { status: "VISIBLE" },
    orderBy: { createdAt: "asc" as const },
    include: {
      user: { select: { name: true, image: true } },
      replies: {
        where: { status: "VISIBLE" },
        orderBy: { createdAt: "asc" as const },
        include: {
          user: { select: { name: true, image: true } },
        },
      },
    },
  },
};

function displayName(comment: {
  authorName: string | null;
  user: { name: string | null; image: string | null } | null;
}) {
  return (
    comment.authorName?.trim() ||
    comment.user?.name?.trim() ||
    "Anonymous"
  );
}

type PublicComment = {
  id: string;
  content: string;
  createdAt: Date;
  authorName: string | null;
  user: { name: string | null; image: string | null } | null;
  replies?: PublicComment[];
};

type MappedComment = {
  id: string;
  content: string;
  createdAt: Date;
  authorName: string | null;
  user: { name: string; image: string | null };
  replies?: MappedComment[];
};

function mapCommentForPublic(comment: PublicComment): MappedComment {
  const name = displayName(comment);
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    authorName: comment.authorName,
    user: {
      name,
      image: comment.user?.image ?? null,
    },
    replies: comment.replies?.map(mapCommentForPublic),
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const comments = await prisma.comment.findMany({
    where: { postId: id, status: "VISIBLE", parentId: null },
    orderBy: { createdAt: "desc" },
    include: commentInclude,
  });

  return NextResponse.json(comments.map(mapCommentForPublic));
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const limited = await rateLimit("comment-create", 3, 10 * 60 * 1000);
  if (limited) return limited;

  const userAgent = req.headers.get("user-agent") || "";
  if (!userAgent.trim() || /bot|crawler|spider|curl|wget|python-requests/i.test(userAgent)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const parsed = parseBody(createCommentSchema, body);
  if (!parsed.success) return parsed.error;

  const { content, parentId, authorName, website, formOpenedAt } = parsed.data;

  const spam = checkCommentSpam({
    content,
    authorName,
    website,
    formOpenedAt,
  });
  if (!spam.ok) {
    return NextResponse.json({ error: spam.error }, { status: spam.status });
  }

  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true, status: true },
  });
  if (!post || post.status !== "PUBLISHED") {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (parentId) {
    const parent = await prisma.comment.findFirst({
      where: { id: parentId, postId: id, status: "VISIBLE" },
      select: { id: true },
    });
    if (!parent) {
      return NextResponse.json({ error: "Parent comment not found" }, { status: 400 });
    }
  }

  const ipAddress = await getClientIp();
  const sanitizedContent = sanitizeComment(content);

  const recentDuplicate = await prisma.comment.findFirst({
    where: {
      ipAddress,
      postId: id,
      content: sanitizedContent,
      createdAt: { gte: new Date(Date.now() - 15 * 60 * 1000) },
    },
    select: { id: true },
  });
  if (recentDuplicate) {
    return NextResponse.json(
      { error: "Duplicate comment detected. Please try again later." },
      { status: 429 }
    );
  }

  const comment = await prisma.comment.create({
    data: {
      content: sanitizedContent,
      authorName: authorName.trim(),
      postId: id,
      parentId: parentId || null,
      // Opaque fingerprint only (HMAC) — never a plaintext IP
      ipAddress,
      status: "PENDING",
    },
  });

  await logIpAction(
    null,
    "COMMENT_SUBMITTED",
    JSON.stringify({ commentId: comment.id, postId: id, status: "PENDING" })
  );

  return NextResponse.json(
    {
      ok: true,
      pending: true,
      message:
        "Thanks! Your comment was received and will appear after moderation.",
    },
    { status: 201 }
  );
}
