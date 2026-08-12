import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

/** Allow major crawlers; block private surfaces. */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin/", "/api/", "/profile", "/claim/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Googlebot-Image", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
      { userAgent: "Slurp", allow: "/", disallow }, // Yahoo
      { userAgent: "DuckDuckBot", allow: "/", disallow },
      { userAgent: "Yandex", allow: "/", disallow },
      { userAgent: "YandexBot", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
