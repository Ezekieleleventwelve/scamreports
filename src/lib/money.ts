export function formatMoney(
  amount: number,
  currency: string,
  locale: string = "de-CH"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || "CHF",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString(locale)} ${currency}`;
  }
}
