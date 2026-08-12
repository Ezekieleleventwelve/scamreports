/** Public URL base for the Interpol-style register. */
export const WARNLIST_BASE = "/scamreport/warnlist";

export function warnlistIndexPath(queryString?: string): string {
  return queryString ? `${WARNLIST_BASE}?${queryString}` : WARNLIST_BASE;
}

export function warnlistEntryPath(slug: string): string {
  return `${WARNLIST_BASE}/${slug}`;
}

export function warnlistSubmitPath(): string {
  return `${WARNLIST_BASE}/submit`;
}

export function warnlistClaimHubPath(queryString?: string): string {
  return queryString
    ? `${WARNLIST_BASE}/claim?${queryString}`
    : `${WARNLIST_BASE}/claim`;
}

export function warnlistClaimPath(slug: string): string {
  return `${WARNLIST_BASE}/claim/${slug}`;
}
