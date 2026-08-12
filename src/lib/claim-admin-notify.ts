import prisma from "@/lib/prisma";

const CLAIMS_BOT_EMAIL = "claims-bot@scamreports.internal";

/** Ensure a non-login bot user exists so claimant submissions appear in admin claim messages. */
export async function ensureClaimsBotUser() {
  return prisma.user.upsert({
    where: { email: CLAIMS_BOT_EMAIL },
    create: {
      email: CLAIMS_BOT_EMAIL,
      name: "Claimant (public form)",
      role: "USER",
    },
    update: {
      name: "Claimant (public form)",
    },
  });
}

/** Post the claim statement into the admin claim thread. */
export async function postClaimToAdminInbox(params: {
  claimId: string;
  claimantName: string;
  contactEmail: string;
  contactPhone: string;
  body: string;
  warnlistSlug?: string | null;
  postId?: string | null;
  willingToPayVictimAmount?: boolean;
  requestDeletion?: boolean;
  paymentAmount?: number | null;
  paymentCurrency?: string | null;
}) {
  const bot = await ensureClaimsBotUser();
  const lines = [
    `New claim from ${params.claimantName} <${params.contactEmail}>`,
    `Phone: ${params.contactPhone}`,
    params.warnlistSlug ? `Warnlist: ${params.warnlistSlug}` : null,
    params.postId ? `Post id: ${params.postId}` : null,
    params.willingToPayVictimAmount
      ? `Willing to pay victim amount${
          params.paymentAmount != null
            ? `: ${params.paymentAmount} ${params.paymentCurrency ?? ""}`.trim()
            : ""
        }`
      : null,
    params.requestDeletion ? "Requests deletion of listing / linked report" : null,
    "",
    params.body,
  ].filter((l) => l !== null) as string[];

  await prisma.claimMessage.create({
    data: {
      claimId: params.claimId,
      senderId: bot.id,
      content: lines.join("\n"),
    },
  });
}
