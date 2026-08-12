import { MetadataRoute } from "next";
import { WARNLIST_ENTRIES } from "@/data/warnlist";
import { WARNLIST_BASE, warnlistEntryPath, warnlistSubmitPath } from "@/lib/warnlist-paths";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const warnlistUrls = WARNLIST_ENTRIES.map((entry) => ({
    url: `${SITE_URL}${warnlistEntryPath(entry.slug)}`,
    lastModified: new Date(entry.listedAt),
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  return [
    {
      url: `${SITE_URL}${WARNLIST_BASE}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/submit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}${warnlistSubmitPath()}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...warnlistUrls,
  ];
}
