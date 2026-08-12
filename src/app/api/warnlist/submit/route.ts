import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logIpAction } from "@/lib/ip";
import { rateLimit } from "@/lib/rate-limit";
import { warnlistSubmissionSchema, parseBody } from "@/lib/validations";
import { verifyTurnstile } from "@/lib/turnstile";

const MIN_FORM_MS = 5_000;

export async function POST(req: NextRequest) {
  const limited = await rateLimit("warnlist-submit", 3, 60 * 60 * 1000);
  if (limited) return limited;

  const userAgent = req.headers.get("user-agent") || "";
  if (!userAgent.trim() || /bot|crawler|spider|curl|wget|python-requests/i.test(userAgent)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = parseBody(warnlistSubmissionSchema, body);
  if (!parsed.success) return parsed.error;

  const bot = await verifyTurnstile(parsed.data.turnstileToken);
  if (bot) return bot;

  const {
    type,
    name,
    aliases,
    location,
    country,
    summary,
    amountOwed,
    amountOwedCurrency,
    contactEmail,
    submitterName,
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

  const submission = await prisma.warnlistSubmission.create({
    data: {
      type,
      name: name.trim(),
      aliases: aliases?.trim() ?? "",
      location: location?.trim() || null,
      country: country?.trim() || null,
      summary: summary.trim(),
      amountOwed: amountOwed != null && amountOwed > 0 ? amountOwed : null,
      amountOwedCurrency: amountOwedCurrency ?? "CHF",
      contactEmail: email,
      submitterName: submitterName?.trim() || null,
      ipAddress: null,
      status: "PENDING",
    },
  });

  await logIpAction(
    null,
    "WARNLIST_SUBMISSION",
    JSON.stringify({ submissionId: submission.id, type })
  );

  return NextResponse.json(
    {
      ok: true,
      message:
        "Your submission was received. Our editors will review it and contact you by email if needed.",
    },
    { status: 201 }
  );
}
