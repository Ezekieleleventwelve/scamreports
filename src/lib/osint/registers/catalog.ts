import type { RegisterJurisdiction } from "../types";

/** Catalogue of major public / semi-public company registers (URL builders + notes). */
export type PublicRegisterCatalogEntry = {
  id: string;
  jurisdiction: RegisterJurisdiction | "MULTI";
  name: string;
  homeUrl: string;
  searchUrl?: (q: string) => string;
  notes: string;
  liveAdapter?: "uk-companies-house" | "ch-zefix" | "opencorporates";
};

export const PUBLIC_REGISTER_CATALOG: PublicRegisterCatalogEntry[] = [
  {
    id: "ch-zefix",
    jurisdiction: "CH",
    name: "ZEFIX (Switzerland)",
    homeUrl: "https://www.zefix.ch/",
    searchUrl: (q) =>
      `https://www.zefix.ch/en/search/entity/list?name=${encodeURIComponent(q)}`,
    notes: "Central Swiss company index — VR, signatories, UID. Live deep-links; REST needs credentials.",
    liveAdapter: "ch-zefix",
  },
  {
    id: "ch-shab",
    jurisdiction: "CH",
    name: "SHAB",
    homeUrl: "https://www.shab.ch/",
    searchUrl: (q) =>
      `https://www.shab.ch/shabforms/servlet/Search?search=${encodeURIComponent(q)}`,
    notes: "Official gazette mutations.",
  },
  {
    id: "uk-ch",
    jurisdiction: "UK",
    name: "Companies House (UK)",
    homeUrl: "https://find-and-update.company-information.service.gov.uk/",
    searchUrl: (q) =>
      `https://find-and-update.company-information.service.gov.uk/search?q=${encodeURIComponent(q)}`,
    notes: "Full officers API with free API key.",
    liveAdapter: "uk-companies-house",
  },
  {
    id: "opencorporates",
    jurisdiction: "MULTI",
    name: "OpenCorporates",
    homeUrl: "https://opencorporates.com/",
    searchUrl: (q) => `https://opencorporates.com/companies?q=${encodeURIComponent(q)}`,
    notes: "Aggregator across many public registers worldwide.",
    liveAdapter: "opencorporates",
  },
  {
    id: "de-handelsregister",
    jurisdiction: "DE",
    name: "Unternehmensregister / Handelsregister (DE)",
    homeUrl: "https://www.unternehmensregister.de/",
    notes: "German filings — often paid documents; search UI public.",
  },
  {
    id: "fr-inpi",
    jurisdiction: "FR",
    name: "INPI / data.inpi.fr (FR)",
    homeUrl: "https://data.inpi.fr/",
    notes: "French company data — public search.",
  },
  {
    id: "at-firmenbuch",
    jurisdiction: "AT",
    name: "Firmenbuch (AT)",
    homeUrl: "https://www.firmenbuch.at/",
    notes: "Austrian register — portal access / fees for full extracts.",
  },
  {
    id: "nl-kvk",
    jurisdiction: "NL",
    name: "KVK (Netherlands)",
    homeUrl: "https://www.kvk.nl/",
    notes: "Dutch Chamber of Commerce search.",
  },
  {
    id: "ie-cro",
    jurisdiction: "IE",
    name: "CRO Ireland",
    homeUrl: "https://www.cro.ie/",
    notes: "Irish Companies Registration Office.",
  },
  {
    id: "au-abr",
    jurisdiction: "AU",
    name: "ABN Lookup / ASIC (AU)",
    homeUrl: "https://abr.business.gov.au/",
    notes: "Australian Business Register + ASIC company search.",
  },
  {
    id: "ca-nuans",
    jurisdiction: "CA",
    name: "Corporations Canada / provincial",
    homeUrl: "https://ised-isde.canada.ca/cc/",
    notes: "Federal + provincial registries (coverage split).",
  },
  {
    id: "sg-acra",
    jurisdiction: "SG",
    name: "ACRA (Singapore)",
    homeUrl: "https://www.acra.gov.sg/",
    notes: "BizFile+ — public search with account for some extracts.",
  },
  {
    id: "us-sec",
    jurisdiction: "US",
    name: "SEC EDGAR (US public companies)",
    homeUrl: "https://www.sec.gov/edgar/search/",
    notes: "US issuers — not a full state LLC register. Use OpenCorporates for state filings.",
  },
];
