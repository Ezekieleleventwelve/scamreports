import { PrismaClient } from "@prisma/client";
import {
  EDITORIAL_FOOTER,
  EDITORIAL_VERIFICATION_LEDE,
} from "./lib/editorial-standard";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) throw new Error("No admin user found");

  const category = await prisma.category.findUnique({
    where: { slug: "business-scam" },
  });
  if (!category) throw new Error("Category 'business-scam' not found");

  const slug = "primehost-dxb-dubai-vacation-rental-invoice-scam-alert";

  const featuredImage = "/uploads/primehost-dxb/homepage-hero.jpeg";
  const image1 = "/uploads/primehost-dxb/logo.png";
  const image2 = "/uploads/primehost-dxb/business-bay.jpeg";
  const image3 = "/uploads/primehost-dxb/homepage-hero.jpeg";

  const title =
    "Prime Host DXB (primehostdxb.com) Scam Alert: Dubai Vacation Rentals, Odd Invoices & Unfit Stays — USD 3,800 Claim";

  const excerpt =
    "scamreports warning on Prime Host Vacation Homes (primehostdxb.com): consumer files allege aggressive invoicing, thin operating capital, poor guest handling, and unhealthy Dubai short-stay units. Documented claim USD 3,800. Verify before you book or pay.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
<h2>Overview</h2>
<p><strong>Prime Host Vacation Homes</strong> (domain <a href="https://primehostdxb.com/" rel="noopener noreferrer nofollow" target="_blank">primehostdxb.com</a>) markets short-stay and vacation-rental management across Dubai — including areas such as Dubai Marina, JBR, Business Bay, Palm Jumeirah, JVC and other neighbourhoods listed on its booking UI.</p>
<p>scamreports received a consumer complaint describing a pattern that, if accurate, is high-risk for guests and counterparties: <strong>opaque or aggressive invoicing</strong>, an operation that appears to <strong>lack the working capital</strong> to sustain the lifestyle and inventory it advertises, <strong>poor treatment of users</strong>, and accommodation alleged to be <strong>unhealthy / unfit</strong>. A documented claim of <strong>USD 3,800</strong> is on editorial file.</p>
<p><strong>Editorial recommendation:</strong> Do not pay deposits or “extra” invoices until you have independent proof of DTCM/holiday-home licensing, escrow or card chargeback-friendly payment rails, and a recent physical inspection of the exact unit.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/primehost-dxb/homepage-hero.jpeg" alt="Prime Host DXB Dubai vacation homes website hero" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Marketing imagery from primehostdxb.com — captured for this report. Always verify the live unit, not the brochure photo.</figcaption>
</figure>

<h2>What the site sells</h2>
<p>Public pages present Prime Host as a Dubai vacation-rentals platform with area filters (Al Furjan, Business Bay, Marina, Palm, JVC, and more), apartment/studio/villa categories, and marketing claims such as 24/7 support, “affordable” rates, “safe payment,” and free guest accounts.</p>
<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/primehost-dxb/logo.png" alt="Prime Host Vacation Homes logo" style="max-width:320px;height:auto" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Logo as published on primehostdxb.com</figcaption>
</figure>
<ul>
<li><strong>Website:</strong> <a href="https://primehostdxb.com/" rel="noopener noreferrer nofollow" target="_blank">https://primehostdxb.com/</a></li>
<li><strong>Brand style:</strong> Prime Host / Prime Host Vacation Homes / PrimeHost DXB</li>
<li><strong>Market:</strong> Dubai short-stay / holiday homes (UAE)</li>
</ul>
<p>For discovery context, compare independent search results and map listings — e.g. <a href="https://www.google.com/search?q=Prime+Host+Vacation+Homes+Dubai+primehostdxb" rel="noopener noreferrer nofollow" target="_blank">Google search: Prime Host Vacation Homes Dubai primehostdxb</a> and <a href="https://www.google.com/search?q=site%3Aprimehostdxb.com" rel="noopener noreferrer nofollow" target="_blank">Google site:primehostdxb.com</a> — then verify licences and reviews yourself before any wire or crypto transfer.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/primehost-dxb/business-bay.jpeg" alt="Prime Host DXB listing area imagery Business Bay Dubai" style="width:100%;max-width:640px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Area marketing tile (Business Bay) as used on the Prime Host site.</figcaption>
</figure>

<h2>Consumer complaint on file</h2>
<p>The complainant’s account — summarised for public interest — alleges that:</p>
<ul>
<li>The operators do <strong>not appear to have the financial means</strong> to maintain the scale of business the website projects;</li>
<li>Guest / user handling is described as <strong>erratic and adversarial</strong>;</li>
<li><strong>Strange or aggressive invoices</strong> are raised for stays in units alleged to be <strong>health-hazardous or unfit</strong>;</li>
<li>A broader Dubai short-stay pattern is acknowledged (variable quality in the market), but this file is flagged as <strong>especially off</strong>: fast to invoice, slow to settle obligations, eager to collect while shifting operational effort onto others.</li>
</ul>
<p>Documented claim amount on scamreports file: <strong>USD 3,800</strong>.</p>

<blockquote style="margin:1.5rem 0;padding:1rem 1.25rem;border-left:3px solid #ccc;background:#fafafa;color:#333">
<p style="margin:0;font-style:italic">“They are the fastest at sending invoices and the slowest at paying — shifting every burden away while chasing every dollar. Guests should treat glossy Dubai holiday-home marketing as unverified until the unit and the payment rail are proven.”</p>
<p style="margin:0.75rem 0 0;font-size:12px;color:#666">— Complainant summary on scamreports editorial file</p>
</blockquote>

<h2>Why this is a consumer red flag</h2>
<p>Dubai short-stay bookings are a known high-dispute category worldwide: brochure photos vs reality, last-minute “cleaning” or “tourism dirham” add-ons, and weak recourse after bank wires. The Prime Host file combines those market risks with specific allegations of <strong>invoice pressure</strong> and <strong>unfit accommodation</strong>.</p>
<ul>
<li>Demand a written breakdown of every line item before payment</li>
<li>Prefer cards / platforms with chargeback rights over irrevocable transfers</li>
<li>Confirm holiday-home permit / DTCM status for the exact unit</li>
<li>Do a video walkthrough of the live unit the day before arrival</li>
<li>Preserve all invoices, WhatsApp threads, and payment receipts</li>
</ul>

<h2>Red flags checklist</h2>
<ul>
<li>Pressure to pay unusual or poorly explained invoices</li>
<li>Units that smell of mould, sewage, pests, or other health hazards</li>
<li>Operators who cannot show licence papers for the marketed inventory</li>
<li>Fast collections, slow refunds / slow payment of their own obligations</li>
<li>Marketing scale that does not match verifiable operating capital or staff</li>
</ul>

<h2>What to do if you were billed or booked</h2>
<ul>
<li><strong>Stop further payments</strong> until counsel or your bank reviews the file</li>
<li><strong>Dispute</strong> card charges where eligible; for wires, notify your bank immediately</li>
<li><strong>Report</strong> to Dubai Police / relevant economic crime channels and your home-country consumer authority if you were targeted from abroad</li>
<li><strong>File a claim</strong> on our <a href="/scamreport/warnlist/claim/prime-host-dxb">warnlist claim page</a> if you are the named party seeking correction or settlement — with evidence</li>
</ul>

<p>Warnlist register entry: <a href="/scamreport/warnlist/prime-host-dxb">Prime Host Vacation Homes</a>.</p>

${EDITORIAL_FOOTER}
<p><strong>Classification:</strong> Consumer scam alert / high booking risk — Dubai vacation rental invoice and accommodation complaint on file (USD 3,800). Not a FINMA securities matter; travel and payment diligence required.</p>`;

  const keywords =
    "Prime Host DXB, primehostdxb.com, Prime Host Vacation Homes, Dubai vacation rental scam, Dubai holiday home invoice, unfit accommodation Dubai, Business Bay rental warning, JBR Marina Palm scam alert, USD 3800 claim, scamreports";

  const tags =
    "uae,dubai,vacation-rental,business-scam,consumer-alert,invoice,accommodation,primehost,warning";

  const metaTitle =
    "Prime Host DXB Scam Alert: Dubai Rental Invoices & Unfit Stays (USD 3,800)";

  const metaDescription =
    "scamreports alert on primehostdxb.com (Prime Host Vacation Homes): odd invoices, alleged unhealthy Dubai stays, thin capital. Documented claim USD 3,800. Verify before you pay.";

  const readingTime = 7;

  const post = await prisma.post.upsert({
    where: { slug },
    update: {
      title,
      content,
      excerpt,
      status: "PUBLISHED",
      categoryId: category.id,
      tags,
      keywords,
      metaTitle,
      metaDescription,
      readingTime,
      featuredImage,
      image1,
      image2,
      image3,
      publishedAt: new Date(),
      translations: "{}",
    },
    create: {
      title,
      slug,
      content,
      excerpt,
      status: "PUBLISHED",
      categoryId: category.id,
      tags,
      keywords,
      metaTitle,
      metaDescription,
      readingTime,
      featuredImage,
      image1,
      image2,
      image3,
      authorId: admin.id,
      publishedAt: new Date(),
      viewCount: 0,
      translations: "{}",
    },
  });

  console.log(`Published: /${post.slug}`);
  console.log(`Warnlist: /scamreport/warnlist/prime-host-dxb`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
