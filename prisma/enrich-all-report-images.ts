import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type GalleryImage = { src: string; alt: string; caption: string };

type ReportConfig = {
  featuredImage: string;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  gallery: GalleryImage[];
};

const REPORT_IMAGES: Record<string, ReportConfig> = {
  "swiss-capital-club-investment-network-scam-warning": {
    featuredImage: "/uploads/swiss-capital-club/homepage-hero.jpg",
    image1: "/uploads/swiss-capital-club/logo.png",
    image2: "/uploads/swiss-capital-club/oliwia-kraft.jpg",
    image3: "/uploads/swiss-capital-club/alexander-kraft.jpg",
    gallery: [
      {
        src: "/uploads/swiss-capital-club/homepage-hero.jpg",
        alt: "Swiss Capital Club website",
        caption: "Swiss Capital Club homepage (swiss-capital-club.com)",
      },
      {
        src: "/uploads/swiss-capital-club/oliwia-kraft.jpg",
        alt: "Oliwia Kraft profile",
        caption: "Oliwia Kraft — profile image from the official website",
      },
      {
        src: "/uploads/swiss-capital-club/alexander-kraft.jpg",
        alt: "Alexander Kraft profile",
        caption: "Alexander Maximilian Kraft — profile image from the official website",
      },
      {
        src: "/uploads/swiss-capital-club/website-promo.png",
        alt: "Swiss Capital Club promotional graphic",
        caption: "Promotional graphic published on swiss-capital-club.com",
      },
    ],
  },
  "swisscapital-fx-fake-forex-trading-platform-steals-chf-2-3-million": {
    featuredImage: "/uploads/swisscapital-fx/forex-chart.jpg",
    image1: "/uploads/swisscapital-fx/finma-logo.png",
    image2: "/uploads/swisscapital-fx/trading-desk.jpg",
    image3: "/uploads/swisscapital-fx/finma-logo.png",
    gallery: [
      {
        src: "/uploads/swisscapital-fx/finma-logo.png",
        alt: "FINMA logo",
        caption: "FINMA — Swiss regulator that warns against unauthorised forex brokers including SwissCapital-style schemes",
      },
      {
        src: "/uploads/swisscapital-fx/forex-chart.jpg",
        alt: "Forex trading charts",
        caption: "Illustrative forex dashboard — victims reported fabricated profit charts on rigged platforms",
      },
      {
        src: "/uploads/swisscapital-fx/trading-desk.jpg",
        alt: "Trading desk",
        caption: "High-pressure “account manager” tactics often accompany fake trading portals",
      },
    ],
  },
  "phishnet-pro-massive-email-phishing-campaign-targets-european-banks": {
    featuredImage: "/uploads/phishnet-pro/phishing-email.jpg",
    image1: "/uploads/phishnet-pro/finma-warning.png",
    image2: "/uploads/phishnet-pro/laptop-security.jpg",
    image3: null,
    gallery: [
      {
        src: "/uploads/phishnet-pro/phishing-email.jpg",
        alt: "Phishing email concept",
        caption: "Phishing campaigns spoof bank security alerts to harvest credentials",
      },
      {
        src: "/uploads/phishnet-pro/laptop-security.jpg",
        alt: "Cybersecurity",
        caption: "Real-time credential replay attacks target UBS, Credit Suisse, Deutsche Bank, and Raiffeisen customers",
      },
      {
        src: "/uploads/phishnet-pro/finma-warning.png",
        alt: "FINMA",
        caption: "Swiss banking customers should verify alerts directly with their bank — never via email links",
      },
    ],
  },
  "cryptovault-ag-ponzi-scheme-disguised-as-defi-yield-platform": {
    featuredImage: "/uploads/cryptovault-ag/crypto-coins.jpg",
    image1: "/uploads/cryptovault-ag/zug-lake.jpg",
    image2: "/uploads/cryptovault-ag/crypto-coins.jpg",
    image3: null,
    gallery: [
      {
        src: "/uploads/cryptovault-ag/zug-lake.jpg",
        alt: "Switzerland Zug region",
        caption: "Zug “Crypto Valley” — where CryptoVault AG claimed to be registered",
      },
      {
        src: "/uploads/cryptovault-ag/crypto-coins.jpg",
        alt: "Cryptocurrency",
        caption: "DeFi yield promises of 8% monthly returns were used to attract victims",
      },
    ],
  },
  "municipal-procurement-fraud-city-official-diverts-chf-800k-to-shell-companies": {
    featuredImage: "/uploads/municipal-procurement-fraud/switzerland.jpg",
    image1: "/uploads/municipal-procurement-fraud/documents.jpg",
    image2: "/uploads/municipal-procurement-fraud/switzerland.jpg",
    image3: null,
    gallery: [
      {
        src: "/uploads/municipal-procurement-fraud/documents.jpg",
        alt: "Procurement documents",
        caption: "Split contracts and inflated IT invoices masked diversion to shell companies",
      },
      {
        src: "/uploads/municipal-procurement-fraud/switzerland.jpg",
        alt: "Switzerland",
        caption: "Swiss municipal procurement — CHF 800,000 diverted over four years",
      },
    ],
  },
  "loveconnect-international-romance-scam-ring-operating-from-west-africa": {
    featuredImage: "/uploads/loveconnect-international/online-chat.jpg",
    image1: "/uploads/loveconnect-international/romance-fraud.jpg",
    image2: "/uploads/loveconnect-international/online-chat.jpg",
    image3: null,
    gallery: [
      {
        src: "/uploads/loveconnect-international/online-chat.jpg",
        alt: "Online messaging",
        caption: "Romance scammers build trust on Tinder, Bumble, Parship, and social media",
      },
      {
        src: "/uploads/loveconnect-international/romance-fraud.jpg",
        alt: "Online relationship fraud",
        caption: "Coordinated ring “LoveConnect International” — estimated CHF 2M+ losses in Switzerland",
      },
    ],
  },
  "fakejob-ch-employment-scam-targets-swiss-job-seekers-advance-fee-fraud": {
    featuredImage: "/uploads/fakejob-ch/job-interview.jpg",
    image1: "/uploads/fakejob-ch/jobs-ch-logo.png",
    image2: "/uploads/fakejob-ch/resume.jpg",
    image3: "/uploads/fakejob-ch/office-laptop.jpg",
    gallery: [
      {
        src: "/uploads/fakejob-ch/job-interview.jpg",
        alt: "Job interview scam",
        caption: "Fake interviews via WhatsApp/Telegram — impersonating Nestlé, Novartis, ABB, Swiss Post",
      },
      {
        src: "/uploads/fakejob-ch/resume.jpg",
        alt: "Job application documents",
        caption: "Victims asked to pay for background checks, work permits, and “training laptops”",
      },
      {
        src: "/uploads/fakejob-ch/novartis-logo.svg",
        alt: "Novartis logo",
        caption: "Major Swiss employers are impersonated — always verify on official careers pages",
      },
    ],
  },
};

function buildGalleryHtml(images: GalleryImage[]): string {
  const figures = images
    .map(
      (img) => `
<figure style="margin:0 0 1rem 0">
  <img src="${img.src}" alt="${img.alt.replace(/"/g, "&quot;")}" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.35rem">${img.caption}</figcaption>
</figure>`
    )
    .join("");

  return `
<div class="report-visuals" data-report-gallery="true" style="margin:1.75rem 0;padding:1rem;border:1px solid #e5e5e5;background:#fafafa">
  <h3 style="font-size:14px;font-weight:700;margin:0 0 1rem 0;text-transform:uppercase;letter-spacing:0.05em">Reference images</h3>
  <div style="display:grid;grid-template-columns:1fr;gap:1rem">
    ${figures}
  </div>
</div>`;
}

function injectGallery(content: string, galleryHtml: string): string {
  if (content.includes('data-report-gallery="true"')) {
    return content.replace(
      /<div class="report-visuals"[\s\S]*?<\/div>\s*<\/div>/,
      galleryHtml.trim()
    );
  }

  const overviewMatch = content.match(/<h2>Overview<\/h2>\s*<p>[\s\S]*?<\/p>/i);
  if (overviewMatch) {
    const insertAt = content.indexOf(overviewMatch[0]) + overviewMatch[0].length;
    return content.slice(0, insertAt) + galleryHtml + content.slice(insertAt);
  }

  const firstH2 = content.match(/<h2>[\s\S]*?<\/h2>\s*<p>[\s\S]*?<\/p>/);
  if (firstH2) {
    const insertAt = content.indexOf(firstH2[0]) + firstH2[0].length;
    return content.slice(0, insertAt) + galleryHtml + content.slice(insertAt);
  }

  return galleryHtml + content;
}

async function main() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { id: true, slug: true, content: true },
  });

  for (const post of posts) {
    const config = REPORT_IMAGES[post.slug];
    if (!config) {
      console.warn(`No image config for: ${post.slug}`);
      continue;
    }

    const hasInlineGallery =
      (post.content.match(/\/uploads\/swiss-capital-club\//g) || []).length >= 2;
    const galleryHtml = buildGalleryHtml(config.gallery);
    const content =
      hasInlineGallery && config.gallery.length > 0
        ? post.content
        : injectGallery(post.content, galleryHtml);

    await prisma.post.update({
      where: { id: post.id },
      data: {
        content,
        featuredImage: config.featuredImage,
        image1: config.image1,
        image2: config.image2,
        image3: config.image3,
      },
    });

    console.log(`Updated: ${post.slug} (${config.gallery.length} gallery images)`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
