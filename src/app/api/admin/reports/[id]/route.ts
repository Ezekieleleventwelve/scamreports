import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { logIpAction } from "@/lib/ip";
import {
  updateReportSubmissionSchema,
  parseBody,
} from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const report = await prisma.reportSubmission.findUnique({
    where: { id },
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

  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(report);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const body = await req.json();
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
