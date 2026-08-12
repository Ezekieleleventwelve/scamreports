import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { updateUserSchema, parseBody } from "@/lib/validations";
import { logIpAction } from "@/lib/ip";

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      banned: true,
      createdAt: true,
      _count: {
        select: {
          posts: true,
          comments: true,
          claims: true,
        },
      },
    },
  });

  return NextResponse.json({ users });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const body = await req.json();
  const parsed = parseBody(updateUserSchema, body);
  if (!parsed.success) return parsed.error;

  const { userId, banned, role } = parsed.data;

  // Prevent self-modification
  if (userId === admin.userId) {
    return NextResponse.json(
      { error: "Cannot modify your own account" },
      { status: 400 }
    );
  }

  const data: Record<string, unknown> = {};
  if (banned !== undefined) data.banned = banned;
  if (role !== undefined) data.role = role;

  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  await logIpAction(
    admin.userId,
    "USER_MODIFIED",
    JSON.stringify({ targetUserId: userId, changes: Object.keys(data) })
  );

  return NextResponse.json(user);
}
