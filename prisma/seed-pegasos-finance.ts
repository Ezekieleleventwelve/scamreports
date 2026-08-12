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

  const slug = "pegasos-finance-dietikon-swiss-life-insurance-warning";

  const featuredImage = "/uploads/pegasos-finance/homepage-about.jpg";
  const image1 = "/uploads/pegasos-finance/logo.png";
  const image2 = "/uploads/pegasos-finance/contact.jpg";
  const image3 = "/uploads/pegasos-finance/partner-zurich.png";

  const title =
    "Pegasos Finance: Swiss Life Policy Cancellations and Linked Contracts — Client Alert";

  const excerpt =
    "Reader reports and source files on Pegasos Finance GmbH (Geroldswil/Dietikon): widespread Swiss Life cancellations and damage to related insurance contracts. Management under Sebastian Marjakaj is described as serious; focus is on sub-broker conduct, not ethnic targeting.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
<h2>Overview</h2>
<p><strong>Pegasos Finance GmbH</strong> (<a href="https://pegasosfinance.com/de/" rel="noopener noreferrer nofollow" target="_blank">pegasosfinance.com</a>) offers finance and insurance advice from <strong>Geroldswil</strong> (UID <strong>CHE-452.507.509</strong>), with marketing also referencing <strong>Dietikon</strong> (Moosmattstrasse 24, 8953).</p>
<p><strong>Focus of this report:</strong> complaints reaching scamreports about <strong>Swiss Life policies cancelled</strong> and the <strong>linked insurance contracts</strong> affected (replacement products, riders, pension bridges, and commission-driven switches). We do <strong>not</strong> broaden this into unrelated topics.</p>
<p><strong>Management context:</strong> Sources familiar with the firm describe <strong>Sebastian Marjakaj</strong> (registered managing director) as a <strong>serious, reputable principal</strong> who tries to keep oversight over a difficult field of attached brokers. The problems reported to us concentrate on <strong>Swiss Life cancellations and sloppy downstream broker work</strong>, not on the character of the top manager.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/pegasos-finance/homepage-about.jpg" alt="Pegasos Finance website imagery" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Imagery from pegasosfinance.com.</figcaption>
</figure>

<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/pegasos-finance/logo.png" alt="Pegasos Finance logo" style="max-width:120px;height:auto" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Logo — pegasosfinance.com</figcaption>
</figure>

<h2>Company facts (public register)</h2>
<ul>
<li><strong>Legal name:</strong> Pegasos Finance GmbH · UID <strong>CHE-452.507.509</strong></li>
<li><strong>Incorporated:</strong> 3 April 2017 · capital CHF 20,000 · seat <strong>Geroldswil</strong> (Handelsregister ZH)</li>
<li><strong>Registered address:</strong> Steinhaldenring 8, 8954 Geroldswil</li>
<li><strong>Statutory purpose:</strong> advice, distribution and servicing of clients in financial-services products (SHAB summary via Moneyhouse)</li>
<li><strong>Management (SHAB Dec 2024):</strong> <strong>Sebastian Marjakaj</strong> — shareholder &amp; managing director, sole signature; <strong>Adrian Marjakaj</strong> — signatory (both from Obersiggenthal)</li>
<li><strong>Revision:</strong> Meng und Partner Revisions AG, Baden (ordinary audit since 2020)</li>
<li><strong>Contact (website):</strong> support@pegasosfinance.com · +41 44 747 51 53</li>
</ul>

<h2>Dietikon presence</h2>
<p>Although the commercial domicile is Geroldswil, Pegasos advertises insurance consulting for the Dietikon area, e.g. <strong>Moosmattstrasse 24, 8953 Dietikon</strong> on its Basel/Dietikon service pages. Consumers searching “Pegasos Finance Dietikon” will land on this brand — verify which legal entity signs your <strong>Vermittler-/Maklervertrag</strong>.</p>

<h2>Management (commercial register)</h2>
<p><strong>Sebastian Marjakaj</strong> — shareholder and managing director with individual signing authority. <strong>Adrian Marjakaj</strong> — signatory (SHAB, Dec 2024). Both are registered in Obersiggenthal.</p>

<h2>Partner insurers shown online</h2>
<p>The homepage displays logos such as AXA, Basler, Generali, Helvetia, PAX, and Zurich. <strong>Swiss Life does not appear</strong> in the partner graphic we captured, yet <strong>Swiss Life cancellations</strong> are the core of the complaints described below.</p>

<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/pegasos-finance/partner-zurich.png" alt="Partner insurer logos on Pegasos Finance website" style="max-width:200px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Example partner logo block — pegasosfinance.com (Zurich Insurance shown; check your policy documents for actual insurer).</figcaption>
</figure>

<h2>Swiss Life cancellations — what sources report</h2>
<p>Multiple clients and industry contacts told scamreports that, in connection with Pegasos Finance or brokers operating under its umbrella:</p>
<ul>
<li><strong>Swiss Life contracts were terminated</strong> — in some cases entire portfolios, not single policies;</li>
<li><strong>Linked agreements were affected</strong> — attached riders, pension wrappers, premium-holiday arrangements, or replacement policies tied to the cancelled Swiss Life cover;</li>
<li><strong>Advice quality was insufficient</strong> (<em>unsorgfältige Arbeit</em>) — surrender costs, gaps in cover, and tax/pension consequences were allegedly not explained before signature;</li>
<li><strong>Sub-brokers</strong> in the sales chain are blamed for aggressive switching; senior management is described as attempting to impose order on a <strong>“stall of chaotic brokers”</strong> rather than orchestrating the harm.</li>
</ul>
<p>This is <strong>source testimony</strong>, not a FINMA or court finding. If your Swiss Life policy was cancelled, immediately request:</p>
<ol>
<li>The <strong>written Kündigung</strong> with date and authorising intermediary;</li>
<li>The <strong>full contract chain</strong> (main policy + linked products);</li>
<li>Whether a <strong>new insurer/product</strong> replaced Swiss Life and who earned commission.</li>
</ol>

<h2>Why Swiss Life cancellations hurt clients</h2>
<p>Cancelling life, pension, or risk policies can trigger:</p>
<ul>
<li><strong>Surrender charges</strong> and loss of guaranteed benefits;</li>
<li><strong>Medical re-underwriting</strong> if you try to reapply later;</li>
<li><strong>Tax and pension-gap consequences</strong> (pillar 3a/b locks, LPP bridges);</li>
<li><strong>Commission flows to a new broker</strong> while the client bears the cost.</li>
</ul>
<p>Before accepting any replacement product after a Swiss Life exit, obtain a <strong>written comparison</strong> of benefits lost and costs incurred.</p>

<h2>Practical checklist (Swiss Life focus)</h2>
<ul>
<li>Confirm <strong>which legal entity</strong> (UID <strong>CHE-452.507.509</strong> or a sub-broker) appears on the cancellation letter</li>
<li>Ask Swiss Life client services whether cancellation followed a <strong>broker-initiated mandate change</strong></li>
<li>Preserve all correspondence on <strong>linked contracts</strong> terminated or rewritten at the same time</li>
<li>Seek independent advice if a Swiss Life life/pension policy was replaced within months of a sales meeting</li>
</ul>

<h2>Internet review scan</h2>
<p>Third-party directories (e.g. wirtschaftsregister.ch) list a handful of web reviews; we found <strong>no detailed public thread</strong> documenting Swiss Life mass cancellations. Absence of Google reviews does <strong>not</strong> disprove source testimony — insurance disputes often stay private until FINMA or civil court.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/pegasos-finance/contact.jpg" alt="Pegasos Finance contact page imagery" style="width:100%;max-width:640px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Contact/marketing visual — pegasosfinance.com.</figcaption>
</figure>

<h2>What to do if your Swiss Life policy was cancelled</h2>
<ul>
<li><strong>Swiss Life:</strong> request reinstatement options and the intermediary file</li>
<li><strong>Pegasos Finance:</strong> ask for the internal broker name who submitted the change and written suitability documentation</li>
<li><strong>FINMA / ombudsman:</strong> if you believe the cancellation breached duty of care</li>
<li>Corrections welcome via our <a href="/claim/">claim process</a></li>
</ul>

${EDITORIAL_FOOTER}`;

  const keywords =
    "Pegasos Finance, Dietikon, Geroldswil, Sebastian Marjakaj, Swiss Life Kündigung, linked insurance contracts, CHE-452.507.509, Versicherungsbroker";

  const tags =
    "switzerland,dietikon,insurance,swiss-life,pegasos-finance,warning";

  const metaTitle =
    "Pegasos Finance: Swiss Life Cancellations & Linked Contracts | scamreports";

  const metaDescription =
    "Client alert: reports of Swiss Life policy cancellations and related contract harm tied to Pegasos Finance GmbH (Dietikon/Geroldswil). Focused report; Marjakaj described as serious management.";

  const readingTime = 10;

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
