import {
  WARNLIST_ENTRIES,
  type WarnlistEntry,
  type WarnlistCase,
} from "@/data/warnlist";
import {
  formatCountryCode,
  getWarnlistPlaceLabel,
  resolveCountryIso,
} from "@/lib/warnlist-origin";
import type { WarnlistQuery } from "@/lib/warnlist-query";

export const WARNLIST_PAGE_SIZE = 6;

export { WARNLIST_ENTRIES };
export type { WarnlistEntry, WarnlistCase };

export function getWarnlistEntry(slug: string): WarnlistEntry | undefined {
  return WARNLIST_ENTRIES.find((e) => e.slug === slug);
}

function searchTokens(q: string): string[] {
  return q
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

/** All text fields used for unified warnlist search (name, place, country, type, …). */
export function buildWarnlistSearchHaystack(entry: WarnlistEntry): string {
  const iso = resolveCountryIso(entry.country, entry.location);
  const code = formatCountryCode(iso);
  const place = getWarnlistPlaceLabel(entry);
  const typeLabels =
    entry.type === "PERSON"
      ? "person persons personen"
      : "company companies firma firmen unternehmen";

  const codeAliases: string[] = [];
  if (code === "USA" || iso === "US") codeAliases.push("usa us united states");
  if (code === "UK" || iso === "GB") codeAliases.push("uk gb united kingdom");
  if (iso === "CH" || code === "CH") codeAliases.push("ch switzerland schweiz suisse");
  if (iso === "DE" || code === "DE") codeAliases.push("de germany deutschland");

  return [
    entry.name,
    entry.aliases,
    entry.principals,
    entry.websites,
    entry.summary,
    entry.location,
    entry.country,
    entry.address,
    entry.uid,
    place,
    code !== "—" ? code : "",
    iso ?? "",
    ...codeAliases,
    typeLabels,
    entry.type.toLowerCase(),
    entry.sourceLabel,
    entry.slug,
    ...entry.cases.map(
      (c) => `${c.title} ${c.description ?? ""} ${c.jurisdiction ?? ""} ${c.status ?? ""}`
    ),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function warnlistEntryMatchesSearch(entry: WarnlistEntry, q: string): boolean {
  const tokens = searchTokens(q);
  if (tokens.length === 0) return true;
  const haystack = buildWarnlistSearchHaystack(entry);
  return tokens.every((token) => haystack.includes(token));
}

export function filterWarnlistEntries(query: WarnlistQuery): WarnlistEntry[] {
  const term = query.q?.trim();
  let list = [...WARNLIST_ENTRIES];

  const type = query.type ?? "ALL";
  if (type !== "ALL") {
    list = list.filter((e) => e.type === type);
  }

  if (term) {
    list = list.filter((e) => warnlistEntryMatchesSearch(e, term));
  }

  return list.sort(
    (a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime()
  );
}

export function countWarnlistByType(type: "PERSON" | "COMPANY"): number {
  return WARNLIST_ENTRIES.filter((e) => e.type === type).length;
}

export function paginateWarnlistEntries(entries: WarnlistEntry[], page: number) {
  const total = entries.length;
  const totalPages = Math.max(1, Math.ceil(total / WARNLIST_PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * WARNLIST_PAGE_SIZE;

  return {
    items: entries.slice(start, start + WARNLIST_PAGE_SIZE),
    page: safePage,
    totalPages,
    total,
  };
}
