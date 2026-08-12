import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { z } from "zod";
import { parseBody } from "@/lib/validations";

const updateCommentSchema = z.object({
  status: z.enum(["VISIBLE", "PENDING", "HIDDEN", "REJECTED"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await req.json();
  const parsed = parseBody(updateCommentSchema, body);
  if (!parsed.success) return parsed.error;

  const comment = await prisma.comment.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({ comment });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  await prisma.comment.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
