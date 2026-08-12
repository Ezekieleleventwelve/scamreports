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

  const slug = "swiss-capital-club-investment-network-scam-warning";

  const featuredImage = "/uploads/swiss-capital-club/homepage-hero.jpg";
  const image1 = "/uploads/swiss-capital-club/logo.png";
  const image2 = "/uploads/swiss-capital-club/oliwia-kraft.jpg";
  const image3 = "/uploads/swiss-capital-club/alexander-kraft.jpg";

  const title =
    "Swiss Capital Club Warning: CHF 48,000 “Investor Introduction” Fee and False Elite Network Claims";

  const excerpt =
    "Investigation into Swiss Capital Club (Zurich): alleged CHF 48,000 upfront fees, false exclusive-investor promises, questionable NDA timing, and founder profiles that multiple sources link to AI-generated imagery. Strong advice to avoid engagement.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
<h2>Overview</h2>
<p><strong>Swiss Capital Club</strong> (swiss-capital-club.com) presents itself as a private, invitation-only investor network in Zurich, connecting entrepreneurs with “vetted” capital. Multiple reports received by <strong>scamreports</strong>, together with our own review of the organisation’s public materials, indicate a <strong>classic high-touch capital-introduction scam pattern</strong>: glossy marketing, unverifiable scale claims, upfront fees, and no demonstrable successful placements.</p>

<p><strong>Editorial recommendation:</strong> Avoid any invitation or outreach from this firm until independent proof of regulated authorisation, completed transactions, and named investor references is provided in writing.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/swiss-capital-club/homepage-hero.jpg" alt="Swiss Capital Club website homepage hero section" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Screenshot source: Swiss Capital Club homepage (swiss-capital-club.com), captured for this report.</figcaption>
</figure>

<h2>What they claim publicly</h2>
<p>According to its website and <a href="https://www.swiss-capital-club.com/impressum" rel="noopener noreferrer nofollow" target="_blank">legal notice</a>, the entity operates as:</p>
<ul>
<li><strong>Swiss Capital Club</strong> — association under Swiss Code of Obligations (Art. 60 ff.), Bahnhofquai 11, 8001 Zurich</li>
<li><strong>Oliwia Kraft</strong> — president; described as founder leading “project qualification”</li>
<li><strong>Alexander Maximilian Kraft</strong> — vice-president; described as co-founder leading “structuring &amp; transaction process”</li>
<li>Marketing claims include <strong>“2,500+ trustworthy investors”</strong>, <strong>“CHF 250M aggregated capital volume”</strong>, and a <strong>90% referral rate</strong> — none of which could be independently verified by our desk</li>
</ul>

<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/swiss-capital-club/logo.png" alt="Swiss Capital Club logo from official website" style="max-width:280px;height:auto" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Logo as published on swiss-capital-club.com</figcaption>
</figure>

<h2>The CHF 48,000 fee allegation</h2>
<p><strong>Documented complaints</strong> allege that Swiss Capital Club demands <strong>CHF 48,000.00</strong> for an alleged <strong>“investor introduction”</strong>, after requesting a full corporate dossier and company brochure under the pretence of checking “fit” with their network.</p>
<p>Victims report the typical sequence:</p>
<ol>
<li>Request for sensitive company documents and financial data <strong>without a prior NDA</strong>;</li>
<li>A friendly <strong>introductory call</strong> to build trust;</li>
<li>Only afterwards mention of confidentiality agreements — whereas legitimate deal advisers normally execute an <strong>NDA before receiving board packs or cap tables</strong>;</li>
<li>Then presentation of a <strong>large upfront mandate or placement fee</strong> (CHF 48,000 in reported cases).</li>
</ol>
<p><strong>scamreports finding:</strong> Despite repeated requests across several victim files, <strong>no successful capital raise</strong> attributable to Swiss Capital Club was documented. <strong>No exclusive investor</strong> interviewed by scamreports confirmed a completed, arms-length transaction introduced solely through this club.</p>

<h2>Founders: expertise and imagery concerns</h2>
<p>Complainants and visual analysts who reviewed the firm’s <strong>website and LinkedIn presence</strong> (linkedin.com/company/swiss-capital-club) state that:</p>
<ul>
<li>Neither <strong>Oliwia Kraft</strong> nor <strong>Alexander Kraft</strong> show a verifiable track record in regulated private equity, venture capital, or Swiss FINMA-supervised placement activity;</li>
<li>Profile photographs exhibit characteristics consistent with <strong>AI-generated or stock-composite portraits</strong> (uniform lighting, synthetic skin texture, inconsistent earring/jewellery details between crops);</li>
<li>The site path <code>/our-attorneys/</code> is used for founder biographies despite <strong>no evidence they are licensed attorneys</strong> in Switzerland — a potential misrepresentation of professional status.</li>
</ul>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.5rem 0">
  <figure>
    <img src="/uploads/swiss-capital-club/oliwia-kraft.jpg" alt="Oliwia Kraft profile image from Swiss Capital Club website" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Oliwia Kraft — image as published on swiss-capital-club.com</figcaption>
  </figure>
  <figure>
    <img src="/uploads/swiss-capital-club/alexander-kraft.jpg" alt="Alexander Maximilian Kraft profile image from Swiss Capital Club website" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Alexander Maximilian Kraft — image as published on swiss-capital-club.com</figcaption>
  </figure>
</div>

<p>Readers should compare these portraits with reverse-image search tools and LinkedIn metadata. <strong>Do not rely on AI-polished headshots as proof of identity or competence.</strong></p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/swiss-capital-club/website-promo.png" alt="Swiss Capital Club promotional graphic from website" style="width:100%;max-width:640px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Additional promotional visual from the Swiss Capital Club website.</figcaption>
</figure>

<h2>“Experts on board”? No verifiable bench</h2>
<p>Unlike established placement agents or regulated financial intermediaries, Swiss Capital Club does not publish:</p>
<ul>
<li>Named lead investors who completed deals;</li>
<li>FINMA registration or applicable licensing (where required);</li>
<li>Audited track record, ISINs, or transaction tombstones;</li>
<li>Independent board or compliance officer contacts.</li>
</ul>
<p>Our assessment: <strong>expert bench — absent.</strong> What exists is marketing copy and Framer-hosted stock photography.</p>

<h2>Reported contact details — verify before calling back</h2>
<p>Victims report outreach via:</p>
<ul>
<li><strong>Phone:</strong> +41 43 430 96 62 (reported to scamreports)</li>
<li><strong>Website-listed numbers:</strong> +41 79 821 78 74 and +41 79 615 11 05 (as published on swiss-capital-club.com at time of review)</li>
<li><strong>Email:</strong> support@swiss-capital-club.com</li>
</ul>
<p>If you receive an unsolicited “exclusive investor” invitation, <strong>do not send cap tables, bank statements, or shareholder registers</strong> until counsel reviews the NDA and fee schedule.</p>

<h2>Why this fits a “template” scam playbook</h2>
<p>Several elements match recurring <strong>advance-fee / fake capital introducer</strong> schemes observed in the Swiss market:</p>
<ul>
<li>Unverifiable network size statistics (thousands of investors, hundreds of millions in capital);</li>
<li>Pressure to pay large fees <em>before</em> proof of investor term sheets or signed LOIs;</li>
<li>NDA introduced <em>after</em> data collection instead of before;</li>
<li>Funds allegedly financing a <strong>luxury lifestyle</strong> rather than delivering introductions;</li>
<li>Operators with no traceable deals in Swiss or EU registries.</li>
</ul>
<p>Switzerland continues to see inbound advisory boutiques with limited local track record targeting SMEs, family businesses, and diaspora entrepreneurs. Due diligence on <strong>who holds your data</strong> is essential.</p>

<h2>Red flags checklist</h2>
<ul>
<li>Upfront CHF 48k (or similar) “introduction” or “qualification” fee</li>
<li>Refusal to name specific investors before payment</li>
<li>Dossier requested before NDA</li>
<li>“Attorney” titles without bar registration</li>
<li>AI-smooth portraits on website/LinkedIn</li>
<li>No third-party confirmation of closed deals</li>
</ul>

<h2>What to do if you were contacted</h2>
<ul>
<li><strong>Stop payments</strong> and preserve all emails, WhatsApp logs, invoices, and bank transfers</li>
<li><strong>Report</strong> to your cantonal police economic crime unit and MELANI (cyber/economic tips)</li>
<li><strong>Notify your bank</strong> if a transfer was recently made (recall windows may be limited)</li>
<li><strong>File a formal correction or rebuttal</strong> via our <a href="/claim/">claim process</a> if you represent the club and dispute facts — with evidence</li>
</ul>

${EDITORIAL_FOOTER}
<p><strong>Classification:</strong> High scam risk — avoid engagement until regulated authorisation and named investor references are provided in writing.</p>`;

  const keywords =
    "Swiss Capital Club, investment fraud Switzerland, advance fee scam, Oliwia Kraft, Alexander Kraft, Zurich investor network, CHF 48000, fake investors, AI profile photos, capital introduction scam";

  const tags =
    "switzerland,zurich,investment-fraud,advance-fee,business-scam,warning,ai-images";

  const metaTitle =
    "Swiss Capital Club Scam Warning: CHF 48k Fee & Fake Investor Network";

  const metaDescription =
    "scamreports investigation: Swiss Capital Club CHF 48,000 upfront fees, false 2,500-investor claims, NDA-after-data red flags, AI-style founder photos — editorial review. Avoid."

  const readingTime = 9;

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
