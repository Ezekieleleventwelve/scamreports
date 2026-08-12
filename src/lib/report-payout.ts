/** Manual bank details for report review fees (same pool pattern as claims). */
export function getReportPayoutInstructions() {
  return {
    accountName:
      process.env.REPORT_PAYOUT_ACCOUNT_NAME ||
      process.env.CREDITOR_PAYOUT_ACCOUNT_NAME ||
      "scamreports Editorial",
    iban:
      process.env.REPORT_PAYOUT_IBAN || process.env.CREDITOR_PAYOUT_IBAN || "",
    bic: process.env.REPORT_PAYOUT_BIC || process.env.CREDITOR_PAYOUT_BIC || "",
    bankName:
      process.env.REPORT_PAYOUT_BANK || process.env.CREDITOR_PAYOUT_BANK || "",
    referencePrefix:
      process.env.REPORT_PAYOUT_REFERENCE_PREFIX || "UT-REPORT",
    feeAmount: process.env.REPORT_REVIEW_FEE || "",
    feeCurrency: process.env.REPORT_REVIEW_FEE_CURRENCY || "CHF",
  };
}

export function isReportPayoutConfigured(): boolean {
  return Boolean(getReportPayoutInstructions().iban?.trim());
}

export function buildReportPaymentReference(
  titleSlug: string,
  contactEmail: string
): string {
  const prefix = getReportPayoutInstructions().referencePrefix;
  const tag =
    contactEmail.split("@")[0]?.slice(0, 10).replace(/[^a-zA-Z0-9]/g, "") ||
    "rpt";
  const slug = titleSlug.slice(0, 16).replace(/[^a-zA-Z0-9-]/g, "") || "report";
  return `${prefix}-${slug}-${tag}`.toUpperCase().slice(0, 35);
}
