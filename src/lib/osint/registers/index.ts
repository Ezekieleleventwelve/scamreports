import { searchSwissCompanies } from "./ch-zefix";
import { OPEN_CORPORATES_JURISDICTIONS, searchOpenCorporates } from "./opencorporates";
import { searchUkCompanies } from "./uk-companies-house";
import type { OsintScanResult, RegisterCompany, RegisterJurisdiction } from "../types";
import { companyOsintQueries, personOsintQueries } from "../search-queries";

export type ScanScope = "CH" | "UK" | "ALL" | RegisterJurisdiction;

function dedupeCompanies(list: RegisterCompany[]): RegisterCompany[] {
  const seen = new Set<string>();
  const out: RegisterCompany[] = [];
  for (const c of list) {
    const key = `${c.jurisdiction}|${(c.registryId || c.number || c.name).toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}

/**
 * Multi-register OSINT scan → companies + officer Google-query packs.
 * Does not auto-publish. Draft generation is separate.
 */
export async function runRegisterOsintScan(
  query: string,
  scope: ScanScope = "ALL"
): Promise<OsintScanResult> {
  const notes: string[] = [];
  const companies: RegisterCompany[] = [];
  const q = query.trim();

  if (scope === "CH" || scope === "ALL") {
    try {
      companies.push(...(await searchSwissCompanies(q)));
    } catch (e) {
      notes.push(`CH/ZEFIX: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  if (scope === "UK" || scope === "ALL") {
    try {
      companies.push(...(await searchUkCompanies(q)));
    } catch (e) {
      notes.push(`UK Companies House: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  if (scope === "ALL" || !["CH", "UK"].includes(scope)) {
    try {
      const jc =
        scope !== "ALL" && scope !== "CH" && scope !== "UK"
          ? OPEN_CORPORATES_JURISDICTIONS.find((j) =>
              j.code.startsWith(String(scope).toLowerCase().slice(0, 2))
            )?.code
          : undefined;
      companies.push(...(await searchOpenCorporates(q, { jurisdictionCode: jc, limit: 8 })));
    } catch (e) {
      notes.push(`OpenCorporates: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  const deduped = dedupeCompanies(companies);
  const personHits: OsintScanResult["personHits"] = [];

  for (const co of deduped) {
    for (const person of co.persons) {
      if (!person.name) continue;
      personHits.push({
        person,
        companyName: co.name,
        searches: personOsintQueries(person.name, co.name, co.jurisdiction),
      });
    }
    // Always attach company-level web queries
    for (const hit of companyOsintQueries(co)) {
      personHits.push({
        person: { name: co.name, role: "COMPANY" },
        companyName: co.name,
        searches: [hit],
      });
    }
  }

  if (!process.env.COMPANIES_HOUSE_API_KEY && !process.env.UK_COMPANIES_HOUSE_API_KEY) {
    notes.push(
      "Set COMPANIES_HOUSE_API_KEY for live UK officer extraction (free at developer.company-information.service.gov.uk)."
    );
  }
  if (!process.env.OPENCORPORATES_API_KEY) {
    notes.push(
      "OPENCORPORATES_API_KEY optional — raises rate limits for multi-jurisdiction search."
    );
  }

  return {
    query: q,
    scannedAt: new Date().toISOString(),
    companies: deduped,
    personHits,
    notes,
  };
}

export { PUBLIC_REGISTER_CATALOG } from "./catalog";
export { OPEN_CORPORATES_JURISDICTIONS } from "./opencorporates";
