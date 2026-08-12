export const WARNLIST_TYPES = ["PERSON", "COMPANY"] as const;
export type WarnlistType = (typeof WARNLIST_TYPES)[number];

export const WARNLIST_STATUSES = ["ACTIVE", "REMOVED"] as const;

export function warnlistTypeLabel(type: string): string {
  return type === "PERSON" ? "Person" : "Company";
}

export function hasAmountOwed(amount: number | null | undefined): boolean {
  return typeof amount === "number" && amount > 0;
}

/** Primary article slug for “Read full report” (entry-level or first linked case). */
export function getWarnlistReportSlug(entry: {
  reportSlug?: string;
  cases: { reportSlug?: string }[];
}): string | undefined {
  if (entry.reportSlug) return entry.reportSlug;
  return entry.cases.find((c) => c.reportSlug)?.reportSlug;
}

export function slugifyWarnlistName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
