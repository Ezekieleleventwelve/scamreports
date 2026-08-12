import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logIpAction } from "@/lib/ip";
import { rateLimit } from "@/lib/rate-limit";
import { reportSubmissionSchema, parseBody } from "@/lib/validations";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  buildReportPaymentReference,
  getReportPayoutInstructions,
  isReportPayoutConfigured,
} from "@/lib/report-payout";
import { slugify } from "@/lib/utils";

const MIN_FORM_MS = 5_000;

export async function POST(req: NextRequest) {
  const limited = await rateLimit("report-submit", 3, 60 * 60 * 1000);
  if (limited) return limited;

  const userAgent = req.headers.get("user-agent") || "";
  if (
    !userAgent.trim() ||
    /bot|crawler|spider|curl|wget|python-requests|scrapy|httpclient/i.test(
      userAgent
    )
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = parseBody(reportSubmissionSchema, body);
  if (!parsed.success) return parsed.error;

  const bot = await verifyTurnstile(parsed.data.turnstileToken);
  if (bot) return bot;

  const {
    title,
    content,
    excerpt,
    subjectName,
    subjectType,
    contactEmail,
    submitterName,
    evidenceUrls,
    website,
    formOpenedAt,
  } = parsed.data;

  if (website?.trim()) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (Date.now() - formOpenedAt < MIN_FORM_MS) {
    return NextResponse.json(
      { error: "Please wait a moment before submitting." },
      { status: 400 }
    );
  }

  const email = contactEmail.trim().toLowerCase();

  const recent = await prisma.reportSubmission.count({
    where: {
      contactEmail: email,
      createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
    },
  });
  if (recent >= 2) {
    return NextResponse.json(
      { error: "Too many submissions from this email. Try again later." },
      { status: 429 }
    );
  }

  const payout = getReportPayoutInstructions();
  const fee = payout.feeAmount ? parseFloat(payout.feeAmount) : null;
  const paymentReference = buildReportPaymentReference(
    slugify(title),
    email
  );

  const submission = await prisma.reportSubmission.create({
    data: {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt?.trim() || null,
      subjectName: subjectName?.trim() || null,
      subjectType: subjectType || null,
      contactEmail: email,
      submitterName: submitterName?.trim() || null,
      evidenceUrls: evidenceUrls?.trim() || "",
      status: "PENDING",
      paymentAmount: fee != null && Number.isFinite(fee) && fee > 0 ? fee : null,
      paymentReference: isReportPayoutConfigured() ? paymentReference : null,
      paymentStatus: isReportPayoutConfigured() ? "UNPAID" : null,
      clientKey: null,
    },
  });

  await logIpAction(
    null,
    "REPORT_SUBMISSION",
    JSON.stringify({ submissionId: submission.id })
  );

  return NextResponse.json(
    {
      ok: true,
      id: submission.id,
      message:
        "Your report was received. Our editors will review it individually and contact you by email.",
      payment:
        isReportPayoutConfigured() && submission.paymentReference
          ? {
              reference: submission.paymentReference,
              amount: submission.paymentAmount,
              currency: payout.feeCurrency,
              accountName: payout.accountName,
              iban: payout.iban,
              bic: payout.bic || undefined,
              bankName: payout.bankName || undefined,
              note: "Payment is manual. Do not pay until our editors confirm a review fee applies. Payment does not guarantee publication.",
            }
          : null,
    },
    { status: 201 }
  );
}
