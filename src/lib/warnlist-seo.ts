import type { Metadata } from "next";
import type { WarnlistEntry } from "@/data/warnlist";
import { getWarnlistOriginDisplay } from "@/lib/warnlist-origin";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { WARNLIST_BASE, warnlistEntryPath } from "@/lib/warnlist-paths";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "scamreports";

export function warnlistEntryUrl(slug: string): string {
  return `${SITE_URL}${warnlistEntryPath(slug)}`;
}

export function warnlistIndexUrl(): string {
  return `${SITE_URL}${WARNLIST_BASE}`;
}

export function buildWarnlistEntryDescription(entry: WarnlistEntry): string {
  const origin = getWarnlistOriginDisplay(entry);
  const place = [origin.place, entry.country].filter(Boolean).join(", ");
  const parts: string[] = [entry.summary];
  if (entry.type === "COMPANY" && entry.principals) {
    parts.push(`Principals on file: ${entry.principals}`);
  }
  if (entry.aliases) parts.push(`Also known as: ${entry.aliases}`);
  if (place) parts.push(`Location: ${place}`);
  if (entry.cases.length > 0) {
    parts.push(`Cases: ${entry.cases.map((c) => c.title).join("; ")}`);
  }
  return parts.join(" ").replace(/\s+/g, " ").trim().slice(0, 320);
}

export function buildWarnlistEntryKeywords(entry: WarnlistEntry): string[] {
  const tokens = new Set<string>([
    entry.name,
    entry.slug.replace(/-/g, " "),
    entry.type === "PERSON" ? "person" : "company",
    "warnlist international",
    "warning list",
    "ZEFIX",
    "Verwaltungsrat",
    "scamreports",
    "bank compliance",
    "Switzerland",
  ]);
  for (const chunk of [entry.aliases, entry.principals, entry.location, entry.country, entry.websites]) {
    if (!chunk) continue;
    for (const part of chunk.split(/[,;]+/)) {
      const t = part.trim();
      if (t.length > 1) tokens.add(t);
    }
  }
  for (const c of entry.cases) {
    if (c.jurisdiction) tokens.add(c.jurisdiction);
    if (c.title) tokens.add(c.title);
  }
  return [...tokens];
}

export function generateWarnlistEntryMetadata(entry: WarnlistEntry): Metadata {
  const url = warnlistEntryUrl(entry.slug);
  const description = buildWarnlistEntryDescription(entry);
  const keywords = buildWarnlistEntryKeywords(entry);
  const title =
    entry.type === "COMPANY" && entry.principals
      ? `${entry.name} (${entry.principals.split(";")[0]?.trim() ?? "company"}) — Warning register`
      : `${entry.name} — Warning register | Person profile`;

  const image = entry.imageUrl
    ? entry.imageUrl.startsWith("http")
      ? entry.imageUrl
      : `${SITE_URL}${entry.imageUrl}`
    : `${SITE_URL}/images/default-og.jpg`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${entry.name} | ${SITE_NAME} Warnlist international`,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: entry.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.name,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  };
}

export const WARNLIST_INDEX_DESCRIPTION =
  "Warnlist international — register for banks and compliance: persons and companies from scamreports investigations, regulatory warnings, and creditor files — with principals, locations, and case references.";

export function generateWarnlistIndexMetadata(): Metadata {
  const url = warnlistIndexUrl();
  const description = WARNLIST_INDEX_DESCRIPTION;

  return {
    title: `Warnlist international | ${SITE_NAME}`,
    description,
    keywords: [
      "warnlist international",
      "warning list",
      "red notice style register",
      "bank compliance",
      "Switzerland fraud",
      "investment fraud register",
      "FINMA warnings",
      "person search",
      "company register",
      "scamreports",
      "scamreport",
      "Google",
      "Bing",
      "Yandex",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `Warnlist international | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function generateWarnlistEntryJsonLd(entry: WarnlistEntry) {
  const url = warnlistEntryUrl(entry.slug);
  const description = buildWarnlistEntryDescription(entry);
  const origin = getWarnlistOriginDisplay(entry);

  const base = {
    "@context": "https://schema.org",
    name: entry.name,
    description,
    url,
    identifier: entry.slug,
    ...(entry.imageUrl && {
      image: entry.imageUrl.startsWith("http")
        ? entry.imageUrl
        : `${SITE_URL}${entry.imageUrl}`,
    }),
    ...(entry.country && {
      address: {
        "@type": "PostalAddress",
        addressLocality: origin.place || undefined,
        addressCountry: entry.country,
      },
    }),
  };

  if (entry.type === "PERSON") {
    return {
      ...base,
      "@type": "Person",
      alternateName: entry.aliases?.split(/[,;]+/).map((s) => s.trim()),
      jobTitle: entry.principals,
      knowsAbout: entry.cases.map((c) => c.title),
    };
  }

  return {
    ...base,
    "@type": "Organization",
    alternateName: entry.aliases?.split(/[,;]+/).map((s) => s.trim()),
    founder: entry.principals,
    knowsAbout: entry.cases.map((c) => c.title),
  };
}

export function generateWarnlistEntryBreadcrumbJsonLd(entry: WarnlistEntry) {
  return generateBreadcrumbJsonLd([
    { name: SITE_NAME, url: SITE_URL },
    { name: "Warnlist international", url: warnlistIndexUrl() },
    { name: entry.name, url: warnlistEntryUrl(entry.slug) },
  ]);
}

export function generateWarnlistIndexJsonLd(entries: WarnlistEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} — Warnlist international`,
    description: WARNLIST_INDEX_DESCRIPTION,
    url: warnlistIndexUrl(),
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: warnlistEntryUrl(entry.slug),
      description: buildWarnlistEntryDescription(entry).slice(0, 200),
    })),
  };
}
