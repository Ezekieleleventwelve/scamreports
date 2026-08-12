import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "./prisma";

interface AuthResult {
  userId: string;
  role: string;
  email: string | null;
}

/**
 * Authenticate user and check they are not banned.
 * Returns the user info or a NextResponse error.
 */
export async function requireAuth(): Promise<AuthResult | NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is banned
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true, email: true, banned: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  if (user.banned) {
    return NextResponse.json(
      { error: "Your account has been suspended." },
      { status: 403 }
    );
  }

  return { userId: user.id, role: user.role, email: user.email };
}

/**
 * Require authenticated admin user (not banned).
 */
export async function requireAdmin(): Promise<AuthResult | NextResponse> {
  const result = await requireAuth();
  if (result instanceof NextResponse) return result;

  if (result.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return result;
}
