/** Shared column grid for warnlist index header + rows (fixed alignment). */
export const WARNLIST_INDEX_GRID =
  "grid grid-cols-[36px_42px_minmax(0,1fr)_minmax(0,1.6fr)_40px_72px_20px] gap-x-2 sm:gap-x-3 items-center min-h-[44px]";

export function warnlistTypeShort(type: "PERSON" | "COMPANY"): string {
  return type === "PERSON" ? "P" : "C";
}
