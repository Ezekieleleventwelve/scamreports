import type { RegisterCompany, RegisterJurisdiction, RegisterPerson } from "../types";

const OC_KEY = process.env.OPENCORPORATES_API_KEY?.trim() || "";
const BASE = "https://api.opencorporates.com/v0.4";

/** Map OpenCorporates jurisdiction codes → our enum. */
function mapJurisdiction(code?: string): RegisterJurisdiction {
  const c = (code || "").toLowerCase();
  if (c === "ch" || c.startsWith("ch_")) return "CH";
  if (c === "gb" || c.startsWith("gb_")) return "UK";
  if (c === "us" || c.startsWith("us_")) return "US";
  if (c === "de" || c.startsWith("de_")) return "DE";
  if (c === "fr") return "FR";
  if (c === "at") return "AT";
  if (c === "nl") return "NL";
  if (c === "ie") return "IE";
  if (c === "au" || c.startsWith("au_")) return "AU";
  if (c === "ca" || c.startsWith("ca_")) return "CA";
  if (c === "sg") return "SG";
  return "OTHER";
}

/**
 * OpenCorporates aggregates many public company registers worldwide.
 * Free tier works with rate limits; API key raises limits.
 * Docs: https://api.opencorporates.com/documentation/API-Reference
 */
export async function searchOpenCorporates(
  query: string,
  opts?: { jurisdictionCode?: string; limit?: number }
): Promise<RegisterCompany[]> {
  const q = query.trim();
  if (!q) return [];

  const params = new URLSearchParams({
    q,
    per_page: String(opts?.limit ?? 5),
  });
  if (opts?.jurisdictionCode) params.set("jurisdiction_code", opts.jurisdictionCode);
  if (OC_KEY) params.set("api_token", OC_KEY);

  const res = await fetch(`${BASE}/companies/search?${params}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`OpenCorporates search failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as {
    results?: {
      companies?: {
        company?: {
          name?: string;
          company_number?: string;
          jurisdiction_code?: string;
          current_status?: string;
          registered_address_in_full?: string;
          incorporation_date?: string;
          opencorporates_url?: string;
          officers?: { name?: string; position?: string; start_date?: string }[];
        };
      }[];
    };
  };

  const rows = data.results?.companies ?? [];
  const out: RegisterCompany[] = [];

  for (const row of rows) {
    const c = row.company;
    if (!c?.name) continue;
    const jurisdiction = mapJurisdiction(c.jurisdiction_code);
    let persons: RegisterPerson[] = (c.officers ?? []).map((o) => ({
      name: o.name || "",
      role: o.position,
      appointedOn: o.start_date,
    }));

    // Enrich with officers endpoint when key present and list empty
    if (OC_KEY && persons.length === 0 && c.jurisdiction_code && c.company_number) {
      persons = await fetchOcOfficers(c.jurisdiction_code, c.company_number);
    }

    out.push({
      jurisdiction,
      name: c.name,
      number: c.company_number,
      registryId: c.company_number,
      status: c.current_status,
      address: c.registered_address_in_full,
      incorporatedOn: c.incorporation_date,
      source: "OpenCorporates",
      sourceUrl: c.opencorporates_url,
      persons: persons.filter((p) => p.name),
      raw: c,
    });
  }
  return out;
}

async function fetchOcOfficers(
  jurisdictionCode: string,
  companyNumber: string
): Promise<RegisterPerson[]> {
  const params = new URLSearchParams();
  if (OC_KEY) params.set("api_token", OC_KEY);
  const url = `${BASE}/companies/${jurisdictionCode}/${encodeURIComponent(companyNumber)}/officers?${params}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    results?: {
      officers?: {
        officer?: { name?: string; position?: string; start_date?: string };
      }[];
    };
  };
  return (data.results?.officers ?? [])
    .map((o) => o.officer)
    .filter(Boolean)
    .map((o) => ({
      name: o!.name || "",
      role: o!.position,
      appointedOn: o!.start_date,
    }));
}

/** Jurisdiction codes useful for OpenCorporates filtering. */
export const OPEN_CORPORATES_JURISDICTIONS = [
  { code: "ch", label: "Switzerland" },
  { code: "gb", label: "United Kingdom" },
  { code: "de", label: "Germany" },
  { code: "fr", label: "France" },
  { code: "at", label: "Austria" },
  { code: "nl", label: "Netherlands" },
  { code: "ie", label: "Ireland" },
  { code: "us_de", label: "USA — Delaware" },
  { code: "us_ca", label: "USA — California" },
  { code: "au", label: "Australia" },
  { code: "ca", label: "Canada (federal aliases vary)" },
  { code: "sg", label: "Singapore" },
  { code: "hk", label: "Hong Kong" },
  { code: "ae", label: "UAE (coverage varies)" },
] as const;
