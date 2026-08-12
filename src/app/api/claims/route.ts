import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logIpAction } from "@/lib/ip";
import { requireAuth } from "@/lib/auth-guard";
import { rateLimit } from "@/lib/rate-limit";
import { checkClaimSpam } from "@/lib/claim-spam";
import { createClaimSchema, parseBody } from "@/lib/validations";
import { hasAmountOwed } from "@/lib/warnlist";
import { getWarnlistEntry } from "@/lib/warnlist-data";
import { verifyTurnstile } from "@/lib/turnstile";
import { postClaimToAdminInbox } from "@/lib/claim-admin-notify";

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) {
    return NextResponse.json({ claims: [] });
  }

  const searchParams = req.nextUrl.searchParams;

  if (searchParams.get("mine") === "true" && auth.userId) {
    const claims = await prisma.claim.findMany({
      where: { userId: auth.userId },
      orderBy: { createdAt: "desc" },
      include: {
        post: { select: { title: true, slug: true } },
        warnlistEntry: { select: { name: true, slug: true } },
      },
    });
    return NextResponse.json({ claims });
  }

  if (auth.role === "ADMIN") {
    const claims = await prisma.claim.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        post: { select: { id: true, title: true, slug: true } },
        warnlistEntry: { select: { id: true, name: true, slug: true, amountOwed: true, amountOwedCurrency: true } },
        user: { select: { id: true, name: true, email: true } },
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            sender: { select: { name: true } },
          },
        },
      },
    });
    return NextResponse.json({ claims });
  }

  return NextResponse.json({ claims: [] });
}

export async function POST(req: NextRequest) {
  const limited = await rateLimit("claim-create", 2, 60 * 60 * 1000);
  if (limited) return limited;

  const userAgent = req.headers.get("user-agent") || "";
  if (!userAgent.trim() || /bot|crawler|spider|curl|wget|python-requests/i.test(userAgent)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = parseBody(createClaimSchema, body);
  if (!parsed.success) return parsed.error;

  const bot = await verifyTurnstile(parsed.data.turnstileToken);
  if (bot) return bot;

  const {
    postId,
    warnlistEntryId,
    warnlistSlug,
    claimantName,
    contactEmail,
    contactPhone,
    postalAddress,
    relationship,
    reason,
    paymentReference,
    website,
    formOpenedAt,
    willingToPayVictimAmount,
    requestDeletion,
  } = parsed.data;

  const spam = checkClaimSpam({ reason, claimantName, website, formOpenedAt });
  if (!spam.ok) {
    return NextResponse.json({ error: spam.error }, { status: spam.status });
  }

  const email = contactEmail.trim().toLowerCase();

  const staticEntry = warnlistSlug ? getWarnlistEntry(warnlistSlug) : undefined;

  if (warnlistSlug || warnlistEntryId) {
    const entry =
      staticEntry ??
      (warnlistEntryId
        ? await prisma.warnlistEntry.findFirst({
            where: { id: warnlistEntryId, status: "ACTIVE" },
          })
        : null);

    const amount = staticEntry?.amountOwed ?? entry?.amountOwed ?? null;
    const slug = warnlistSlug ?? staticEntry?.slug;

    if (!entry && !staticEntry) {
      return NextResponse.json({ error: "Warnlist entry not found" }, { status: 404 });
    }
    const existing = await prisma.claim.findFirst({
      where: {
        contactEmail: email,
        OR: [
          ...(warnlistEntryId ? [{ warnlistEntryId }] : []),
          ...(slug ? [{ warnlistSlug: slug }] : []),
        ],
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A claim with this email already exists for this warnlist entry." },
        { status: 409 }
      );
    }

    const intentLines: string[] = [];
    if (willingToPayVictimAmount) {
      intentLines.push(
        "[CLAIMANT INTENT] Willing to pay the documented victim/creditor amount on file."
      );
    }
    if (requestDeletion) {
      intentLines.push(
        "[CLAIMANT INTENT] Requests deletion / removal of this warnlist entry (and linked report where applicable)."
      );
    }
    const reasonWithIntent =
      intentLines.length > 0
        ? `${reason.trim()}\n\n${intentLines.join("\n")}`
        : reason.trim();

    const claim = await prisma.claim.create({
      data: {
        warnlistEntryId: warnlistEntryId ?? null,
        warnlistSlug: slug ?? null,
        claimantName: claimantName.trim(),
        contactEmail: email,
        contactPhone: contactPhone.trim(),
        postalAddress: postalAddress.trim(),
        relationship,
        reason: reasonWithIntent,
        identityConfirmed: true,
        ipAddress: null,
        paymentAmount: hasAmountOwed(amount) ? amount : null,
        paymentReference: paymentReference?.trim() || null,
        paymentStatus: willingToPayVictimAmount ? "SUBMITTED" : "UNPAID",
        fineAmount: hasAmountOwed(amount) ? amount : null,
        status: "PENDING",
      },
    });

    await logIpAction(
      null,
      "WARNLIST_CLAIM_CREATED",
      JSON.stringify({
        claimId: claim.id,
        warnlistSlug: slug,
        relationship,
        willingToPayVictimAmount: Boolean(willingToPayVictimAmount),
        requestDeletion: Boolean(requestDeletion),
      })
    );

    await postClaimToAdminInbox({
      claimId: claim.id,
      claimantName: claimantName.trim(),
      contactEmail: email,
      contactPhone: contactPhone.trim(),
      body: reasonWithIntent,
      warnlistSlug: slug,
      willingToPayVictimAmount: Boolean(willingToPayVictimAmount),
      requestDeletion: Boolean(requestDeletion),
      paymentAmount: hasAmountOwed(amount) ? amount : null,
      paymentCurrency: staticEntry?.amountOwedCurrency ?? "CHF",
    });

    return NextResponse.json(
      {
        ok: true,
        message:
          "Your claim was submitted. We will review your details and contact you by email.",
      },
      { status: 201 }
    );
  }

  if (!postId) {
    return NextResponse.json({ error: "Invalid claim target" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true, status: true },
  });
  if (!post || post.status !== "PUBLISHED") {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const existing = await prisma.claim.findFirst({
    where: { postId, contactEmail: email },
  });
  if (existing) {
    return NextResponse.json(
      { error: "A claim with this email already exists for this article." },
      { status: 409 }
    );
  }

  const claim = await prisma.claim.create({
    data: {
      postId,
      claimantName: claimantName.trim(),
      contactEmail: email,
      contactPhone: contactPhone.trim(),
      postalAddress: postalAddress.trim(),
      relationship,
      reason: reason.trim(),
      identityConfirmed: true,
      ipAddress: null,
    },
  });

  await logIpAction(
    null,
    "CLAIM_CREATED",
    JSON.stringify({ claimId: claim.id, postId, relationship })
  );

  await postClaimToAdminInbox({
    claimId: claim.id,
    claimantName: claimantName.trim(),
    contactEmail: email,
    contactPhone: contactPhone.trim(),
    body: reason.trim(),
    postId,
    willingToPayVictimAmount: Boolean(willingToPayVictimAmount),
    requestDeletion: Boolean(requestDeletion),
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        "Your claim was submitted. We will review your identity details and contact you by email.",
    },
    { status: 201 }
  );
}
