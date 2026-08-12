/** Bank details shown on warnlist claims — payout to documented creditors. */
export function getCreditorPayoutInstructions() {
  return {
    accountName: process.env.CREDITOR_PAYOUT_ACCOUNT_NAME || "scamreports Creditor Pool",
    iban: process.env.CREDITOR_PAYOUT_IBAN || "",
    bic: process.env.CREDITOR_PAYOUT_BIC || "",
    bankName: process.env.CREDITOR_PAYOUT_BANK || "",
    referencePrefix: process.env.CREDITOR_PAYOUT_REFERENCE_PREFIX || "SR-CLAIM",
  };
}

export function isCreditorPayoutConfigured(): boolean {
  const { iban } = getCreditorPayoutInstructions();
  return Boolean(iban?.trim());
}

export function buildPaymentReference(entrySlug: string, claimantEmail: string): string {
  const prefix = getCreditorPayoutInstructions().referencePrefix;
  const tag = claimantEmail.split("@")[0]?.slice(0, 12).replace(/[^a-zA-Z0-9]/g, "") || "claim";
  return `${prefix}-${entrySlug}-${tag}`.toUpperCase().slice(0, 35);
}
