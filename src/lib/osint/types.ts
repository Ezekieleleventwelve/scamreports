/** Multi-jurisdiction company-register OSINT types (draft pipeline — not auto-publish). */

export type RegisterJurisdiction =
  | "CH"
  | "UK"
  | "US"
  | "DE"
  | "FR"
  | "AT"
  | "NL"
  | "IE"
  | "AU"
  | "CA"
  | "SG"
  | "OTHER";

export type RegisterPerson = {
  name: string;
  role?: string;
  appointedOn?: string;
  nationality?: string;
  address?: string;
  /** Deep links for manual verification */
  links?: { label: string; href: string }[];
};

export type RegisterCompany = {
  jurisdiction: RegisterJurisdiction;
  name: string;
  number?: string;
  /** CHE-xxx / company number / EIN etc. */
  registryId?: string;
  status?: string;
  address?: string;
  incorporatedOn?: string;
  source: string;
  sourceUrl?: string;
  persons: RegisterPerson[];
  raw?: unknown;
};

export type OsintHit = {
  title: string;
  href: string;
  snippet?: string;
  kind: "register" | "news" | "warning" | "web" | "social";
};

export type OsintScanResult = {
  query: string;
  scannedAt: string;
  companies: RegisterCompany[];
  personHits: { person: RegisterPerson; companyName: string; searches: OsintHit[] }[];
  notes: string[];
};
