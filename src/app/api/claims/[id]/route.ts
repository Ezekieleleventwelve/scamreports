import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logIpAction } from "@/lib/ip";
import { requireAuth, requireAdmin } from "@/lib/auth-guard";
import { rateLimit } from "@/lib/rate-limit";
import { updateClaimSchema, claimMessageSchema, parseBody } from "@/lib/validations";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const body = await req.json();

  const parsed = parseBody(updateClaimSchema, body);
  if (!parsed.success) return parsed.error;

  const { status, adminNotes, fineAmount, paymentStatus } = parsed.data;

  const data: Record<string, unknown> = {};
  if (status !== undefined) data.status = status;
  if (adminNotes !== undefined) data.adminNotes = adminNotes;
  if (fineAmount !== undefined) data.fineAmount = fineAmount;
  if (paymentStatus !== undefined) data.paymentStatus = paymentStatus;

  const claim = await prisma.claim.update({
    where: { id },
    data,
  });

  if (status === "APPROVED") {
    if (claim.postId) {
      await prisma.post.update({
        where: { id: claim.postId },
        data: { status: "DRAFT" },
      });
    }
    if (claim.warnlistEntryId) {
      await prisma.warnlistEntry.update({
        where: { id: claim.warnlistEntryId },
        data: { status: "REMOVED" },
      });
    }
  }

  await logIpAction(
    admin.userId,
    "CLAIM_UPDATED",
    JSON.stringify({ claimId: id, newStatus: status })
  );

  return NextResponse.json(claim);
}

// Send message on a claim
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Rate limit: 20 messages per 10 minutes
  const limited = await rateLimit("claim-message", 20, 10 * 60 * 1000);
  if (limited) return limited;

  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await req.json();

  const parsed = parseBody(claimMessageSchema, body);
  if (!parsed.success) return parsed.error;

  const { content } = parsed.data;

  // Verify user is admin or claim owner
  const claim = await prisma.claim.findUnique({ where: { id } });
  if (!claim) {
    return NextResponse.json({ error: "Claim not found" }, { status: 404 });
  }

  if (auth.role !== "ADMIN") {
    if (!claim.userId || claim.userId !== auth.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const message = await prisma.claimMessage.create({
    data: {
      claimId: id,
      senderId: auth.userId,
      content,
    },
    include: {
      sender: { select: { name: true } },
    },
  });

  return NextResponse.json(message, { status: 201 });
}
