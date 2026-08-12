import type { RegisterCompany, RegisterPerson } from "../types";

const CH_API =
  process.env.COMPANIES_HOUSE_API_KEY?.trim() ||
  process.env.UK_COMPANIES_HOUSE_API_KEY?.trim() ||
  "";

const BASE = "https://api.company-information.service.gov.uk";

function authHeader(): HeadersInit {
  if (!CH_API) return {};
  const token = Buffer.from(`${CH_API}:`).toString("base64");
  return { Authorization: `Basic ${token}` };
}

export function companiesHouseCompanyUrl(number: string): string {
  return `https://find-and-update.company-information.service.gov.uk/company/${encodeURIComponent(number)}`;
}

export function companiesHouseSearchUrl(q: string): string {
  return `https://find-and-update.company-information.service.gov.uk/search?q=${encodeURIComponent(q)}`;
}

/**
 * UK Companies House — public register.
 * With API key: live search + officers.
 * Without key: returns deep-link stubs for manual follow-up.
 */
export async function searchUkCompanies(query: string, limit = 5): Promise<RegisterCompany[]> {
  const q = query.trim();
  if (!q) return [];

  if (!CH_API) {
    return [
      {
        jurisdiction: "UK",
        name: q,
        source: "Companies House (link only — set COMPANIES_HOUSE_API_KEY for live data)",
        sourceUrl: companiesHouseSearchUrl(q),
        persons: [],
      },
    ];
  }

  const res = await fetch(
    `${BASE}/search/companies?q=${encodeURIComponent(q)}&items_per_page=${limit}`,
    { headers: { ...authHeader(), Accept: "application/json" } }
  );
  if (!res.ok) {
    throw new Error(`Companies House search failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as {
    items?: {
      company_number?: string;
      title?: string;
      company_status?: string;
      address_snippet?: string;
      date_of_creation?: string;
    }[];
  };

  const out: RegisterCompany[] = [];
  for (const item of data.items ?? []) {
    const number = item.company_number;
    if (!number) continue;
    const persons = await fetchUkOfficers(number);
    out.push({
      jurisdiction: "UK",
      name: item.title || q,
      number,
      registryId: number,
      status: item.company_status,
      address: item.address_snippet,
      incorporatedOn: item.date_of_creation,
      source: "UK Companies House API",
      sourceUrl: companiesHouseCompanyUrl(number),
      persons,
      raw: item,
    });
  }
  return out;
}

async function fetchUkOfficers(companyNumber: string): Promise<RegisterPerson[]> {
  const res = await fetch(`${BASE}/company/${companyNumber}/officers`, {
    headers: { ...authHeader(), Accept: "application/json" },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    items?: {
      name?: string;
      officer_role?: string;
      appointed_on?: string;
      nationality?: string;
      address?: { address_line_1?: string; locality?: string; postal_code?: string; country?: string };
    }[];
  };
  return (data.items ?? []).slice(0, 40).map((o) => {
    const addr = o.address
      ? [o.address.address_line_1, o.address.locality, o.address.postal_code, o.address.country]
          .filter(Boolean)
          .join(", ")
      : undefined;
    return {
      name: (o.name || "").replace(/,/g, " ").replace(/\s+/g, " ").trim(),
      role: o.officer_role,
      appointedOn: o.appointed_on,
      nationality: o.nationality,
      address: addr,
      links: [
        {
          label: "Companies House company",
          href: companiesHouseCompanyUrl(companyNumber),
        },
      ],
    };
  });
}
