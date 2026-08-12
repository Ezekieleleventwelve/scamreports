import type { OsintHit, RegisterCompany, RegisterJurisdiction } from "./types";

/** Public Google / DuckDuckGo query builders (no scraping — open in browser or attach results). */
export function googleSearchUrl(q: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

export function duckDuckGoSearchUrl(q: string): string {
  return `https://duckduckgo.com/?q=${encodeURIComponent(q)}`;
}

export function personOsintQueries(
  personName: string,
  companyName?: string,
  jurisdiction?: RegisterJurisdiction
): OsintHit[] {
  const base = personName.trim();
  const co = companyName?.trim();
  const j = jurisdiction ?? "";
  const queries = [
    `"${base}"${co ? ` "${co}"` : ""} scam OR fraud OR warning OR FINMA OR "Companies House"`,
    `"${base}"${co ? ` ${co}` : ""} LinkedIn OR director OR "board" OR Verwaltungsrat`,
    `"${base}"${j ? ` ${j}` : ""} lawsuit OR complaint OR arrest OR "money laundering"`,
  ];
  return queries.map((q, i) => ({
    title: `Web search ${i + 1}: ${q.slice(0, 80)}…`,
    href: googleSearchUrl(q),
    kind: "web" as const,
    snippet: q,
  }));
}

export function companyOsintQueries(company: RegisterCompany): OsintHit[] {
  const n = company.name.trim();
  const id = company.registryId || company.number || "";
  const queries = [
    `"${n}" scam OR fraud OR warning OR clone OR "advance fee"`,
    id ? `"${id}" ${n}` : `"${n}" register OR ZEFIX OR "Companies House"`,
    `"${n}" FINMA OR FCA OR BaFin OR "red notice" OR creditor`,
  ];
  return queries.map((q, i) => ({
    title: `Company web search ${i + 1}`,
    href: googleSearchUrl(q),
    kind: "web" as const,
    snippet: q,
  }));
}
