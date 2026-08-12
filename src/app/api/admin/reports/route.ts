import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { logIpAction } from "@/lib/ip";
import {
  updateReportSubmissionSchema,
  parseBody,
} from "@/lib/validations";

export async function GET() {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const reports = await prisma.reportSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      subjectName: true,
      subjectType: true,
      contactEmail: true,
      submitterName: true,
      evidenceUrls: true,
      status: true,
      adminNotes: true,
      paymentAmount: true,
      paymentReference: true,
      paymentStatus: true,
      publishedPostId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ reports });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const body = await req.json();
  const id = typeof body.id === "string" ? body.id : "";
  if (!id || id.length > 50) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const parsed = parseBody(updateReportSubmissionSchema, body);
  if (!parsed.success) return parsed.error;

  const updated = await prisma.reportSubmission.update({
    where: { id },
    data: parsed.data,
  });

  await logIpAction(
    admin.userId,
    "REPORT_REVIEW_UPDATE",
    JSON.stringify({ id, status: updated.status })
  );

  return NextResponse.json({
    id: updated.id,
    title: updated.title,
    status: updated.status,
    adminNotes: updated.adminNotes,
    paymentAmount: updated.paymentAmount,
    paymentReference: updated.paymentReference,
    paymentStatus: updated.paymentStatus,
    publishedPostId: updated.publishedPostId,
    updatedAt: updated.updatedAt,
  });
}
