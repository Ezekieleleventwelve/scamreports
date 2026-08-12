/** Map country names to ISO-style codes for the warnlist index. */
const COUNTRY_ISO: Record<string, string> = {
  switzerland: "CH",
  schweiz: "CH",
  suisse: "CH",
  svizzera: "CH",
  germany: "DE",
  deutschland: "DE",
  bulgaria: "BG",
  bulgarien: "BG",
  "south africa": "ZA",
  "südafrika": "ZA",
  "united states": "US",
  usa: "US",
  austria: "AT",
  österreich: "AT",
  italy: "IT",
  italien: "IT",
  france: "FR",
  frankreich: "FR",
  "united kingdom": "GB",
  uk: "GB",
  netherlands: "NL",
  spain: "ES",
  portugal: "PT",
  russia: "RU",
  uae: "AE",
  "united arab emirates": "AE",
};

const DISPLAY_CODE: Record<string, string> = {
  US: "USA",
  GB: "UK",
};

const LOCATION_HINTS: { pattern: RegExp; iso: string }[] = [
  {
    pattern:
      /\bzürich|zurich|zug|genf|geneva|genève|basel|bern|berne|lugano|locarno|bellinzona|ticino|stäfa|stafa|wipkingen|seefeld|limmat|enge|ochsen/i,
    iso: "CH",
  },
  { pattern: /\bbamberg|münchen|munich|berlin|frankfurt|hamburg|deutschland|germany\b/i, iso: "DE" },
  { pattern: /\bbrooklyn|new york|manhattan|usa|united states\b/i, iso: "US" },
  { pattern: /\bcape town|south africa|johannesburg\b/i, iso: "ZA" },
  { pattern: /\bbulgaria|sofia\b/i, iso: "BG" },
  { pattern: /\bhörsching|austria|wien|vienna\b/i, iso: "AT" },
  { pattern: /\blondon|england|uk\b/i, iso: "GB" },
];

export function resolveCountryIso(country?: string, location?: string): string | null {
  if (country?.trim()) {
    const key = country.trim().toLowerCase();
    if (COUNTRY_ISO[key]) return COUNTRY_ISO[key];
  }
  const haystack = `${location ?? ""} ${country ?? ""}`;
  for (const { pattern, iso } of LOCATION_HINTS) {
    if (pattern.test(haystack)) return iso;
  }
  return null;
}

export function formatCountryCode(iso: string | null): string {
  if (!iso) return "—";
  return DISPLAY_CODE[iso] ?? iso;
}

/** Short place label for index column (city / region). */
export function getWarnlistPlaceLabel(entry: {
  country?: string;
  location?: string;
  address?: string;
}): string {
  if (entry.location?.trim()) {
    const loc = entry.location.trim();
    const comma = loc.indexOf(",");
    return comma > 0 ? loc.slice(0, comma).trim() : loc;
  }
  if (entry.address?.trim()) {
    const parts = entry.address.split(",").map((p) => p.trim());
    return parts[parts.length - 1] || parts[0] || "";
  }
  if (entry.country?.trim()) return entry.country.trim();
  return "";
}

export function getWarnlistOriginDisplay(entry: {
  country?: string;
  location?: string;
  address?: string;
}): { countryCode: string; place: string } {
  const iso = resolveCountryIso(entry.country, entry.location);
  return {
    countryCode: formatCountryCode(iso),
    place: getWarnlistPlaceLabel(entry),
  };
}

/** URL slug for place filter (lowercase, ascii). */
export function placeToFilterSlug(place: string): string {
  return place
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function placeMatchesFilter(
  entry: { country?: string; location?: string; address?: string },
  placeSlug: string
): boolean {
  if (!placeSlug) return true;
  const label = getWarnlistPlaceLabel(entry).toLowerCase();
  const slug = placeToFilterSlug(label);
  const haystack = `${label} ${entry.location ?? ""} ${entry.address ?? ""}`.toLowerCase();
  return slug === placeSlug || haystack.includes(placeSlug.replace(/-/g, " "));
}
