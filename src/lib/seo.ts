import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "scamreports";

export function generatePostMetadata(post: {
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  excerpt?: string | null;
  keywords?: string | null;
  slug: string;
  featuredImage?: string | null;
  publishedAt?: Date | null;
  author?: { name?: string | null } | null;
}): Metadata {
  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.excerpt || `Read about: ${post.title}`;
  const keywords = post.keywords
    ? post.keywords.split(",").map((k) => k.trim())
    : [];
  const url = `${SITE_URL}/${post.slug}`;
  const image = post.featuredImage || `${SITE_URL}/images/default-og.jpg`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function generateSiteMetadata(
  pageTitle?: string,
  pageDescription?: string
): Metadata {
  const title = pageTitle
    ? `${pageTitle} | ${SITE_NAME}`
    : `${SITE_NAME} — Warnlist`;
  const description =
    pageDescription ||
    "Public warning register of persons and companies — Interpol-style profiles for banks, compliance, and the public. Searchable and indexed worldwide.";

  return {
    title,
    description,
    keywords: [
      "warnlist",
      "warning register",
      "fraud warning",
      "person profile",
      "company warning",
      "bank compliance",
      "scam register",
      "scamreports",
    ],
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: `${SITE_URL}/scamreport/warnlist` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/scamreport/warnlist`,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/default-og.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
      },
    },
  };
}

export function generateArticleJsonLd(post: {
  title: string;
  excerpt?: string | null;
  content: string;
  slug: string;
  featuredImage?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date;
  keywords?: string | null;
  author?: { name?: string | null } | null;
}) {
  const url = `${SITE_URL}/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    image: post.featuredImage || `${SITE_URL}/images/default-og.jpg`,
    url,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    keywords: post.keywords || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Public Interpol-style warning register of persons and companies for banks, compliance, and the public.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/scamreport/warnlist?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
