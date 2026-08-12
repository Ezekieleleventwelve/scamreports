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
    where: { slug: "investment-fraud" },
  });
  if (!category) throw new Error("Category 'investment-fraud' not found");

  const slug = "finanzliga-switzerland-credit-introduction-warning";

  const featuredImage = "/uploads/finanzliga/homepage-hero.jpg";
  const image1 = "/uploads/finanzliga/logo.png";
  const image2 = "/uploads/finanzliga/operator-voelin-couple.png";
  const image3 = "/uploads/finanzliga/operator-dj-event.png";

  const title =
    "Finanzliga Switzerland: Due-Diligence Warning on Credit Introductions, Fees, and Marketing Claims";

  const excerpt =
    "Editorial review of Finanzliga (finanzliga.com) and Finanzliga M. CH GmbH, Zug: commercial-register facts, FINMA licensing gaps, stock-photo team pages, and reader complaints about upfront fees and third-party referrals. High-risk — verify before sharing financial data.";

  const content = `<h2>Overview</h2>
<p><strong>Finanzliga</strong> markets itself at <a href="https://finanzliga.com/" rel="noopener noreferrer nofollow" target="_blank">finanzliga.com</a> as a Swiss partner for tailored “financial solutions,” startup financing, due diligence, and mentoring. The operating company behind the brand is <strong>Finanzliga M. CH GmbH</strong>, registered in <strong>Zug</strong> (UID <strong>CHE-452.421.291</strong>).</p>
<p><strong>scamreports classification:</strong> Based on public records, website transparency issues, and multiple reader complaints — <strong>high-risk engagement</strong> until the firm publishes verifiable licensing (where required), completed financings, and named investor references.</p>
${EDITORIAL_VERIFICATION_LEDE}

<figure style="margin:1.5rem 0">
  <img src="/uploads/finanzliga/homepage-hero.jpg" alt="Finanzliga website marketing imagery" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Marketing image published on finanzliga.com (June 2024 uploads).</figcaption>
</figure>

<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/finanzliga/logo.png" alt="Finanzliga logo from official website" style="max-width:320px;height:auto" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Logo as published on finanzliga.com</figcaption>
</figure>

<h2>Legal entity — what the commercial register shows</h2>
<p>According to the Swiss Official Gazette of Commerce (SHAB) and aggregator records (e.g. <a href="https://www.lixt.ch/handelsregister/finanzliga-m-ch-gmbh-1610175" rel="noopener noreferrer nofollow" target="_blank">Lixt / Zug commercial register</a>):</p>
<ul>
<li><strong>Name:</strong> Finanzliga M. CH GmbH</li>
<li><strong>UID:</strong> CHE-452.421.291 · CH-ID CH-170.4.021.267-0</li>
<li><strong>Incorporated:</strong> 25 October 2023 · <strong>Share capital:</strong> CHF 20,000</li>
<li><strong>Registered address:</strong> c/o Immobörse GmbH, Baarerstrasse 112, 6300 Zug (same building cluster hosts many other firms)</li>
<li><strong>Statutory purpose (abridged):</strong> training modules in areas including business formation, events, tokenisation, sales research, recruitment, and “funding through business angels” — plus broad ancillary powers including financing for own or third-party account and guarantees for third parties</li>
<li><strong>Signatory:</strong> <strong>Mischa Voélin</strong> — sole shareholder and managing director with individual signing authority (200 shares at CHF 100 each); residence updated from Olten to Trimbach per February 2024 mutation notice</li>
<li><strong>Audit:</strong> waiver of ordinary audit elected</li>
</ul>
<p><strong>Editorial note:</strong> A broad corporate purpose is not the same as holding a <strong>FINMA licence</strong> to act as a bank, securities dealer, or financial intermediary for client assets. Readers seeking regulated credit or investment advice should check the <a href="https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/" rel="noopener noreferrer nofollow" target="_blank">FINMA authorisation database</a> before transferring money or signing mandates.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/finanzliga/zug-switzerland.jpg" alt="Zug Switzerland business district context" style="width:100%;max-width:720px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Zug — canton of registered office (illustrative).</figcaption>
</figure>

<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/finanzliga/finma-logo.png" alt="FINMA logo" style="max-width:280px;height:auto" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Check FINMA authorisations before engaging any Swiss “financing partner.”</figcaption>
</figure>

<h2>What the website promises</h2>
<p>The German-language site describes a four-step pipeline: online application → due diligence → tailored financing offer (equity, loans, or mix) → ongoing mentoring and reporting. Public contact details include:</p>
<ul>
<li><strong>Address:</strong> Baarerstrasse 112, 6300 Zug (<a href="https://finanzliga.com/contact-us/" rel="noopener noreferrer nofollow" target="_blank">contact page</a>)</li>
<li><strong>Phone:</strong> +41 76 221 36 19 (contact page); homepage also lists +41 76 268 26 43</li>
<li><strong>Email:</strong> kontakt@finanzliga.com</li>
</ul>
<p>The <a href="https://finanzliga.com/about/" rel="noopener noreferrer nofollow" target="_blank">About</a> page names <strong>Mischa Voelin</strong> (CEO), <strong>Isaak Gayle</strong> (Co-CEO), Diana Trogrlic (Analyst), Alina Kerkof (Marketing), and Joana Fischer (HR). <strong>Only Mischa Voélin appears as the registered managing director</strong> in the commercial register at the time of our review — Co-CEO and other titles should be verified independently if you rely on them for a mandate.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/finanzliga/site-screenshot-2025.png" alt="Finanzliga website screenshot 2025" style="width:100%;max-width:480px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Screenshot asset published on finanzliga.com (July 2025 upload).</figcaption>
</figure>

<h2>Website “Our Team” vs. actual operators</h2>
<p>The public <a href="https://finanzliga.com/our-team/" rel="noopener noreferrer nofollow" target="_blank">Our Team</a> page uses <strong>generic stock photography</strong> (filenames such as <em>young-handsome-businessman-wearing-red-shirt…</em>) and headline counters showing <strong>“0+” years of experience, “0+” happy clients, and “0%” positive reviews</strong> — inconsistent with an established financier.</p>
<p>By contrast, <strong>sources and victims who contacted scamreports</strong> supplied the photographs below, identifying them as the people who actually run outreach, credit introductions, and fee collection behind the Finanzliga brand. <strong>Compare faces before any video call or in-person meeting.</strong></p>

<h3>Registered principal — Mischa Voélin</h3>
<p><strong>Mischa Voélin</strong> (also spelled Voelin on the website) is the <strong>sole registered managing director and shareholder</strong> of Finanzliga M. CH GmbH (SHAB). Sources describe him as moving between <strong>Thailand and Switzerland</strong>. The About page titles him CEO.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;margin:1.5rem 0">
  <figure>
    <img src="/uploads/finanzliga/operator-voelin-couple.png" alt="Mischa Voélin identified by sources — outdoor portrait with associate" style="width:100%;height:auto;border:1px solid #e5e5e5;border-radius:4px" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Mischa Voélin</strong> (sources) — registered signatory UID CHE-452.421.291. Couple portrait supplied to scamreports.</figcaption>
  </figure>
  <figure>
    <img src="/uploads/finanzliga/operator-portrait-bw.png" alt="Finanzliga operator — black and white portrait supplied by sources" style="width:100%;height:auto;border:1px solid #e5e5e5;border-radius:4px" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Operator in Finanzliga circle</strong> (sources) — B&amp;W portrait; not shown on stock Team page. Readers link this face to acquisition calls and Zurich-north meetings.</figcaption>
  </figure>
</div>

<h3>Co-CEO — Isaak Gayle (also cited as “David Gayle”)</h3>
<p>The <a href="https://finanzliga.com/about/" rel="noopener noreferrer nofollow" target="_blank">About</a> page lists <strong>Isaak Gayle</strong> as <strong>Co-CEO</strong>. He does <strong>not</strong> appear in the Zug commercial-register excerpt as a signatory. Multiple reader files use the spelling <strong>“David Gayle”</strong> — treat as the same principal until disproven. Sources allege customer acquisition for projects such as an energy-drink brand and commission-driven credit introductions via third parties; <strong>these conduct claims are not court-proven here.</strong></p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;margin:1.5rem 0">
  <figure>
    <img src="/uploads/finanzliga/operator-gold-cloak.png" alt="Isaak Gayle identified by sources — portrait with gold fabric" style="width:100%;height:auto;border:1px solid #e5e5e5;border-radius:4px" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Isaak / David Gayle</strong> (sources) — Co-CEO per finanzliga.com.</figcaption>
  </figure>
  <figure>
    <img src="/uploads/finanzliga/operator-dj-event.png" alt="Finanzliga operator at DJ event — AMIRI shirt, sources identify Gayle circle" style="width:100%;height:auto;border:1px solid #e5e5e5;border-radius:4px" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Same operator network</strong> (sources) — public event appearance (DJ setup). Supplied for identification, not as evidence of licensing.</figcaption>
  </figure>
</div>

<h3>What the official site still shows (stock imagery)</h3>
<p>For due diligence, keep the website’s fictional team gallery beside the real faces above:</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin:1rem 0;opacity:0.85">
  <figure>
    <img src="/uploads/finanzliga/team-page-1.jpg" alt="Stock photo on Finanzliga team page" style="width:100%;height:auto;border:1px solid #ddd" loading="lazy" />
    <figcaption style="font-size:11px;color:#888">Stock — finanzliga.com/our-team/</figcaption>
  </figure>
  <figure>
    <img src="/uploads/finanzliga/team-page-2.jpg" alt="Stock photo on Finanzliga team page" style="width:100%;height:auto;border:1px solid #ddd" loading="lazy" />
    <figcaption style="font-size:11px;color:#888">Stock — finanzliga.com/our-team/</figcaption>
  </figure>
  <figure>
    <img src="/uploads/finanzliga/team-startup.jpg" alt="Stock startup meeting photo on Finanzliga site" style="width:100%;height:auto;border:1px solid #ddd" loading="lazy" />
    <figcaption style="font-size:11px;color:#888">Stock — “startup teamwork”</figcaption>
  </figure>
</div>
<p>Testimonials on the site reference “Hocud PLC” and “DEF Technologies” without Swiss tombstones in public registers. <strong>Our editorial review found no completed financings</strong> attributable solely to Finanzliga in open registry or press sources.</p>
<p>Readers also named referral targets (<strong>Harald Hojer, Christian Gayek, Alois Anichhofer, Lars Karsten</strong>) after paying fees — those names do not appear on the About/Team pages; linkage requires signed contracts. See <a href="#reader-complaints">reader complaints</a> below.</p>

<h2 id="reader-complaints">Documented complaints — editorial review</h2>
<p>The following pattern is documented in <strong>complaint files cleared by our legal–journalism consortium</strong>:</p>
<ul>
<li>Approach promising access to credit lines, business angels, or “Swisscom-linked” networks;</li>
<li>Requests for company documents and personal financial data early in the process;</li>
<li>Upfront or intermediary <strong>fees</strong> before any binding term sheet from a named, regulated lender;</li>
<li>Alleged <strong>referral onward to third parties</strong> after data collection, with complainants stating they never received the financing described in marketing calls.</li>
</ul>
<p>If you experienced similar conduct, <strong>preserve contracts, invoices, chat logs, and bank transfers</strong> and consider reporting to your cantonal police economic-crime unit. Principals may respond via our <a href="/claim/">claim process</a> with documentary evidence.</p>

<h2>Names readers asked us about — what we could verify</h2>
<p>Readers named additional individuals (including references to telecom employers and other entrepreneurs). <strong>Those names do not appear on Finanzliga’s public About/Team pages or in the Zug commercial-register excerpt for Finanzliga M. CH GmbH.</strong> Without official filings or contracts linking them to this entity, scamreports does not publish character allegations or criminal labels. If you have signed agreements listing other parties, submit redacted copies through the claim channel.</p>

<h2>Red-flag checklist for SMEs and founders</h2>
<ul>
<li>Financing promised before basic KYC/AML identity of the actual lender is disclosed</li>
<li>Large upfront “processing,” “introduction,” or “due diligence” fees</li>
<li>Pressure to sign before your counsel reviews the fee schedule and data-processing terms</li>
<li>Team pages with stock photography and placeholder “0+” metrics</li>
<li>No FINMA (or home-country) authorisation where regulated activity is implied</li>
<li>Registered address is a domicile/c/o mailbox used by dozens of other shell-like entities</li>
<li>Refusal to name the bank or investor who allegedly approved your file</li>
</ul>

<h2>Practical steps if you are in contact</h2>
<ul>
<li><strong>Stop new payments</strong> until you receive a written term sheet from the regulated funding party (not only the introducer)</li>
<li>Run UID and signatory checks on <a href="https://www.zefix.ch" rel="noopener noreferrer nofollow" target="_blank">Zefix</a> and order a current commercial-register extract</li>
<li>Search FINMA’s institution list for every party that will hold or move your money</li>
<li>Ask for tombstones: company name, amount, date, and contactable reference — verify independently</li>
</ul>

${EDITORIAL_FOOTER}
<p><strong>Consumer guidance:</strong> Treat unsolicited credit introductions from this brand as <strong>high-risk</strong> until a named, regulated lender issues a binding term sheet in writing.</p>`;

  const keywords =
    "Finanzliga, Finanzliga M CH GmbH, Mischa Voelin, Isaak Gayle, Zug credit scam, startup financing Switzerland, advance fee warning, Baarerstrasse 112, CHE-452.421.291, business angel introduction";

  const tags =
    "switzerland,zug,investment-fraud,business-scam,startup,credit-warning,due-diligence";

  const metaTitle =
    "Finanzliga Warning: Zug Credit Introduction & Fee Red Flags | scamreports";

  const metaDescription =
    "Due-diligence report on Finanzliga: Mischa Voélin, Isaak Gayle, real operator photos vs stock team page, FINMA check, fee and referral complaints.";

  const readingTime = 12;

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
