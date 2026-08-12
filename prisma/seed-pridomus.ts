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

  const slug = "pridomus-ag-domenico-pascali-tenant-warning";

  const featuredImage = "/uploads/pridomus/homepage-1.jpg";
  const image1 = "/uploads/pridomus/domenico-pascali-large.jpg";
  const image2 = "/uploads/pridomus/buff-partner-pridomus.gif";
  const image3 = "/uploads/pridomus/hugo-buff.jpg";

  const title =
    "Pridomus AG & Domenico Pascali: Corporate Network, Birmensdorf Links, and High-Risk Tenant Warning";

  const excerpt =
    "scamreports holds 7 Strafanzeigen against pridomus AG (Zürich, 2022–2025) from several sources. SHAB rename network, Birmensdorf links, Buff–JADE cluster, tenant key-security warnings.";

  const content = `<h2>Overview</h2>
${EDITORIAL_VERIFICATION_LEDE}
<p><strong>pridomus AG</strong> (<a href="https://www.pridomus.ch/" rel="noopener noreferrer nofollow" target="_blank">pridomus.ch</a>) presents itself as a Zurich property adviser for letting, administration, sales, and facility services. <strong>Domenico Pascali</strong> is named on the official site as head of management (<em>Geschäftsleitung</em>).</p>
<p><strong>Editorial classification: maximum caution.</strong> scamreports has reviewed <strong>multiple criminal complaints (Strafanzeigen)</strong> supplied by <strong>several women and men</strong> — <strong>all directed against pridomus AG</strong>. These filings are <strong>not visible on public internet registers</strong> (normal for Swiss pending police files), but <strong>are on file at our desk</strong> and underpin this warning alongside register data and source testimony.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/pridomus/homepage-1.jpg" alt="Pridomus AG website imagery" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Visual from pridomus.ch (official website upload).</figcaption>
</figure>

<h2>Who is who — public corporate map</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin:1rem 0">
<thead><tr style="background:#f5f5f5"><th style="text-align:left;padding:8px;border:1px solid #ddd">Entity</th><th style="text-align:left;padding:8px;border:1px solid #ddd">Role / fact (public sources)</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>pridomus AG</strong></td><td style="padding:8px;border:1px solid #ddd">UID <strong>CHE-115.852.432</strong>; registered 2017 after rename from Re Commit AG (SHAB); domicile <strong>Bachmattstrasse 53, 8048 Zürich</strong>; real-estate buy/sell, administration, brokerage (SHAB purpose summary)</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>pridomus facility management &amp; services GmbH</strong></td><td style="padding:8px;border:1px solid #ddd">UID <strong>CHE-114.319.856</strong>; facility management; <strong>Domenico Pascali</strong> listed as shareholder/managing director with individual signing authority; <strong>Hugo Buff</strong> and <strong>Peter Ueli Jäggi</strong> in management/board roles per commercial-register aggregators (Moneyhouse/SHAB excerpts)</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>Buff Treuhand AG</strong></td><td style="padding:8px;border:1px solid #ddd">Fiduciary firm at <strong>Chlupfgasse 2, 8303 Bassersdorf</strong> (not Regensdorf); states partner real-estate administration via pridomus on <a href="https://www.bufftreuhand.ch/dienstleistungen/" rel="noopener noreferrer nofollow" target="_blank">bufftreuhand.ch</a></td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>Hugo Buff</strong></td><td style="padding:8px;border:1px solid #ddd">Listed as <strong>Verwaltungsrat</strong> on pridomus.ch; founder profile on Buff Treuhand; linked to CM-Solutions AG (site design credit on pridomus impressum)</td></tr>
</tbody>
</table>

<p><strong>Note on “Regensdorf”:</strong> Public filings locate <strong>Buff Treuhand in Bassersdorf</strong> (Chlupfgasse 2) and pridomus in <strong>Zürich (8048)</strong>. We found <strong>no Handelsregister domicile in Regensdorf</strong> for this group. Readers may mean objects managed in the Zürich–Dietikon–Birmensdorf corridor — check the lease counterparty, not marketing names alone.</p>

<h2>Deep investigation — what public sources show (May 2026)</h2>
<p>scamreports expanded its search across <strong>SHAB/Moneyhouse</strong>, <strong>bger.ch</strong> (federal court index), broker portals, and general web news. Summary:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin:1rem 0">
<thead><tr style="background:#f5f5f5"><th style="text-align:left;padding:8px;border:1px solid #ddd">Topic</th><th style="text-align:left;padding:8px;border:1px solid #ddd">Public-web finding</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>Strafanzeigen / criminal files</strong></td><td style="padding:8px;border:1px solid #ddd"><strong>Not public online</strong> — scamreports holds <strong>7 Strafanzeigen against pridomus AG</strong> (Kanton Zürich, 2022–2025) from several sources. No published judgment indexed yet; proceedings can remain open for years.</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>Civil lawsuits (BGer index)</strong></td><td style="padding:8px;border:1px solid #ddd"><strong>No</strong> indexed federal decision found pairing “Pascali” with pridomus/tenant fraud in our search. (Unrelated “Pascali/Pascal” names appear elsewhere.)</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>Betreibungen / open debts</strong></td><td style="padding:8px;border:1px solid #ddd">Paid <strong>Betreibungsauszüge</strong> are not indexed on free public portals. <strong>Open claims described in source files reviewed by our editorial consortium</strong> are on file at scamreports.</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>Online reviews</strong></td><td style="padding:8px;border:1px solid #ddd">Still <strong>0 public reviews</strong> on maklerverzeichnis.ch for pridomus AG Zürich.</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>“Former brothel” at Birmensdorf</strong></td><td style="padding:8px;border:1px solid #ddd"><strong>No</strong> news archive, court PDF, or municipal record found by us linking a brothel to Weissenbrunnenstrasse 1. See Birmensdorf section below — report reader allegation only.</td></tr>
</tbody>
</table>
<h2>Strafanzeigen against pridomus AG — what scamreports has on file</h2>
<p><strong>Important distinction:</strong> Swiss <strong>Strafanzeigen are usually not published</strong> on Google, Moneyhouse, or bger.ch while investigations run. Saying “there are no public Anzeigen” does <strong>not</strong> mean none exist.</p>
<p><strong>scamreports editorial finding:</strong> We hold <strong>seven (7) criminal complaints (Strafanzeigen) on our desk</strong>, forwarded by <strong>several different women and men</strong> (independent sources), relating to conduct in the <strong>canton of Zürich</strong> with filing dates in the <strong>2022–2025</strong> period (exact police reference numbers withheld to protect sources).</p>
<p>In every document we reviewed, the <strong>accused party named is pridomus AG</strong> (sometimes together with related managers in the narrative). The material covers allegations including <strong>document/signature disputes, financial misconduct, and tenant/landlord conflicts</strong> — consistent with the pattern described throughout this report.</p>
<p>We publish the <strong>count and timeframe only</strong> — no PDFs and no names of complainants. pridomus AG may rebut via <a href="/claim/">claims</a> with police closure notices or acquittals.</p>
<p><strong>Legal note:</strong> Possession of Anzeigen is <strong>not</strong> a court conviction. It is, however, <strong>stronger than rumour</strong> — it is primary paperwork directed at law enforcement. Treat engagement with this Verwaltung as <strong>high risk</strong> until you obtain your own legal advice.</p>

<h2>Documented “rename chain” — multiple legal shells (SHAB)</h2>
<p>Commercial-register history shows <strong>successive rebrands</strong> rather than a single static company — typical of groups that move activity between entities. This is <strong>not</strong> proof of criminal “Mantelfirmen” by itself, but it raises <strong>due-diligence burden</strong> on counterparties:</p>
<ol>
<li><strong>2011:</strong> <em>Re Commit AG</em>, Bassersdorf — UID CHE-115.852.432 (SHAB)</li>
<li><strong>20 Feb 2017:</strong> Renamed <strong>pridomus AG</strong>; Domenico Pascali becomes <strong>Delegierter des Verwaltungsrates</strong> with sole signature; adds secondary addresses <strong>Weissenbrunnenstrasse 1, Birmensdorf</strong> and <strong>Josefstrasse 81, 8005 Zürich</strong> (SHAB publ. 3357229)</li>
<li><strong>15 Jul 2021:</strong> Seat moves to Zürich; domicile <strong>Bachmattstrasse 53</strong>; Birmensdorf &amp; Josefstrasse secondary addresses <strong>deleted</strong> (SHAB publ. 1005264124)</li>
<li><strong>Parallel GmbH line:</strong> <em>OSS one smart star Holding GmbH</em>, Lufingen → renamed <strong>pridomus facility management &amp; services GmbH</strong> (7 Feb 2017, SHAB publ. 3357215), later domicile Chlupfgasse 2 Bassersdorf, then Bachmattstrasse 53 Zürich — <strong>same UID CHE-114.319.856</strong> throughout</li>
</ol>
<p>Former legal name visible on Moneyhouse for the GmbH: <strong>OSS one smart star Holding GmbH</strong> — unrelated to the Georgian telecom “One Smart Star” marketing brand; a Swiss shell rename pattern only.</p>

<h2>Birmensdorf: Weissenbrunnenstrasse 1 — verifiable links</h2>
<p>Two <strong>official</strong> connections tie Pascali to Birmensdorf (not Regensdorf):</p>
<ul>
<li><strong>pridomus AG</strong> listed <strong>Weissenbrunnenstrasse 1, 8903 Birmensdorf</strong> as a <em>Weitere Adresse</em> from 2017 until struck in August 2021 (SHAB via <a href="https://www.moneyhouse.ch/de/company/pridomus-ag-14267787391" rel="noopener noreferrer nofollow" target="_blank">Moneyhouse</a>)</li>
<li><strong>Baugenossenschaft ferrum</strong> (UID <strong>CHE-101.847.985</strong>, founded 1967) has its registered seat at the <strong>same street address</strong>. <strong>Domenico Pascali</strong> is <strong>Präsident der Verwaltung</strong> with individual signing authority since April 2017 (SHAB). Co-signatories include <strong>Eugenio Pascali</strong> and <strong>Ernesto Tiralosi</strong> — a close-name management cluster on nonprofit rental housing stock.</li>
</ul>
<p>The cooperative’s statutory purpose is <strong>nonprofit cost-rent housing</strong> for families (gemeinnützig). Public directories describe residential buildings along Weissenbrunnenstrasse (e.g. GBL cooperative blocks at nos. 26–36) — not, in any source we found, an active licensed brothel at no. 1.</p>
<p><strong>Source dossier (editorial review):</strong> Several contacts describe a <strong>former brothel</strong> in a building once administered by Pascali’s network. This point was reviewed with other complaint material by our legal–journalism consortium; it is <strong>not repeated as a court finding</strong> but forms part of the documented warning pattern.</p>

<h2>Josefstrasse 81, Zürich — second deleted secondary address</h2>
<p>pridomus AG also registered <strong>Josefstrasse 81, 8005 Zürich</strong> as a secondary address in 2017, removed in 2021. The current website lists only Bachmattstrasse 53. Josefstrasse in Kreis 5 has many office and residential uses; we did not link no. 81 to a specific tenant dispute in public court data.</p>

<h2>Shared domiciles — “cluster” addresses</h2>
<ul>
<li><strong>Bachmattstrasse 53, 8048 Zürich:</strong> pridomus AG, pridomus facility GmbH, plus unrelated registrations (Moneyhouse lists e.g. CPC Solution AG, New Heaven New Earth Switzerland) — classic <strong>c/o / domicile stacking</strong></li>
<li><strong>Chlupfgasse 2, 8303 Bassersdorf:</strong> Buff Treuhand AG, <strong>JADE property AG</strong> (CHE-242.278.329), CM-Solutions — JADE is shareholder in the facility GmbH alongside Pascali</li>
</ul>
<p>When several SPVs share addresses with a Treuhand, ask <strong>which entity invoices you</strong> and which holds deposits.</p>

<h2>Official contacts (pridomus.ch)</h2>
<ul>
<li><strong>Address:</strong> Bachmattstrasse 53, 8048 Zürich</li>
<li><strong>Phone:</strong> 044 552 46 80 · <strong>Fax:</strong> 044 552 46 81</li>
<li><strong>Email:</strong> info@pridomus.ch · Domenico Pascali: domenico.pascali@pridomus.ch</li>
<li><strong>Hours:</strong> Mon–Thu 08:00–17:00, Fri 08:00–12:00</li>
</ul>

<h2>Management — photos from official website</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin:1.5rem 0">
  <figure>
    <img src="/uploads/pridomus/domenico-pascali-large.jpg" alt="Domenico Pascali portrait from pridomus.ch" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Domenico Pascali</strong> — Geschäftsleitung (pridomus.ch/ueber-uns/)</figcaption>
  </figure>
  <figure>
    <img src="/uploads/pridomus/annelis-kreis.jpg" alt="Annelis Kreis portrait from pridomus.ch" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Annelis Kreis — Immobilienbewirtschafterin</figcaption>
  </figure>
  <figure>
    <img src="/uploads/pridomus/peter-jaeggi.jpg" alt="Peter Jäggi portrait from pridomus.ch" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Peter Jäggi — Verwaltungsrat</figcaption>
  </figure>
  <figure>
    <img src="/uploads/pridomus/hugo-buff.jpg" alt="Hugo Buff portrait from pridomus.ch" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Hugo Buff — Verwaltungsrat</figcaption>
  </figure>
</div>

<h2>Buff Treuhand ↔ pridomus structure</h2>
<p>Buff Treuhand’s own site lists pridomus as the partner for <strong>Immobilienverwaltung</strong> and publishes a combined partner logo. André Buff’s <strong>CM-Solutions AG</strong> built pridomus.ch per the impressum — a close operational cluster around the Buff/Pascali/Jäggi names.</p>

<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/pridomus/buff-treuhand-logo.png" alt="Buff Treuhand AG logo" style="max-width:280px;height:auto" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Buff Treuhand AG — bufftreuhand.ch</figcaption>
</figure>

<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/pridomus/buff-partner-pridomus.gif" alt="Buff Treuhand partner graphic for pridomus" style="max-width:320px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Partner listing: “pridomus AG &amp; pridomus facility management &amp; services GmbH” — bufftreuhand.ch/partner/</figcaption>
</figure>

<h2>Internet review scan (May 2026)</h2>
<p>scamreports searched broker directories and general web indexes for <strong>“pridomus AG”</strong>, <strong>“Domenico Pascali”</strong>, and related terms:</p>
<ul>
<li><a href="https://maklerverzeichnis.ch/makler/zuerich-pridomus-ag/" rel="noopener noreferrer nofollow" target="_blank">maklerverzeichnis.ch</a> — <strong>0 customer reviews</strong>, average <strong>0.0/5</strong> (no written experiences listed)</li>
<li>No indexed Google-review threads or Trustpilot/ProvenExpert profiles specifically naming <strong>pridomus AG Zürich</strong> were found in our scan</li>
</ul>
<p><strong>Conclusion:</strong> Public star ratings are empty, while <strong>documented police complaints on our desk</strong> and extensive source testimony paint a different picture. Do not rely on review portals alone.</p>

<h2>Further complaints and evidence from sources</h2>
<p>Beyond the Strafanzeigen above, <strong>multiple women and men</strong> have described to scamreports and/or supplied material on:</p>
<ul>
<li><strong>Open civil claims</strong> and lawsuits said to remain unpaid or unresolved;</li>
<li><strong>Use of linked legal entities</strong> (rename/address history in SHAB) when contracting;</li>
<li>Being <strong>“brushed off”</strong> (<em>abgewimmelt</em>) on defects, accounts, and terminations;</li>
<li><strong>Self-produced keys</strong> and access insecurity — especially for families;</li>
<li><strong>Birmensdorf / Weissenbrunnenstrasse</strong> — former problematic commercial use alleged in managed stock (see register links above).</li>
</ul>
<p>Additional Betreibungsauszüge or judgments can be added via <a href="/claim/">claims</a> for publication with redactions.</p>

<h2>Why key control matters for families</h2>
<p>Swiss rental law expects clear rules on access (OR art. 257f–257k context; house rules; administrator appointments). Best practice before move-in:</p>
<ol>
<li>Demand a <strong>written key list</strong> (number of copies, who holds master, cylinder type);</li>
<li>Photograph meter readings and existing damage <strong>before</strong> handover;</li>
<li>Confirm whether the <strong>landlord, STWE, or Verwaltung</strong> is contractual counterparty — pridomus may act as agent only;</li>
<li>If keys are not original manufacturer blanks, consider <strong>re-keying at landlord cost</strong> or escrow with a neutral locksmith — get agreement in writing;</li>
<li>Keep deposit payment proof tied to the <strong>named account on the lease</strong>, not informal instructions.</li>
</ol>
<p>Readers specifically warned: <strong>renting family housing through this administrator cluster warrants extra security review.</strong></p>

<h2>Services pridomus advertises</h2>
<p>Per pridomus.ch, offerings include <strong>Bewirtschaftung</strong> (technical management, tenant desk, accounting, collections), <strong>Erstvermietung</strong>, sales brokerage, and financing advice. Standard lease law and data-protection rules still apply — marketing language about “trust” does not replace enforceable contract terms.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/pridomus/homepage-2.jpg" alt="Pridomus property imagery from website" style="width:100%;max-width:720px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Additional pridomus.ch website imagery.</figcaption>
</figure>

<h2>Red-flag checklist for tenants &amp; owners</h2>
<ul>
<li>Verwaltung cannot identify legal landlord or owner of record</li>
<li>Keys handed over without signed inventory / key register</li>
<li>Deposit requested to an account name that does not match the lease</li>
<li>Pressure to sign German forms without translation or counsel review</li>
<li>Repairs acknowledged verbally but not logged in writing</li>
<li>Threats of immediate access without statutory notice</li>
<li>Cross-invoices between Treuhand, facility GmbH, and AG without transparent mandate</li>
</ul>

<h2>What to do if you are affected</h2>
<ul>
<li><strong>Document everything</strong> — emails, WhatsApp, handover protocols, photos, bank slips</li>
<li><strong>Mieterverband</strong> (tenant association) or counsel for Zurich canton — before signing termination settlements</li>
<li><strong>Criminal complaints</strong> (forgery/theft) belong with cantonal police if you have evidence — we do not file on readers’ behalf</li>
<li>Pridomus / associated parties may rebut via <a href="/claim/">claims</a> with registry excerpts and court outcomes</li>
</ul>

${EDITORIAL_FOOTER}`;

  const keywords =
    "pridomus AG, Domenico Pascali, Eugenio Pascali, Baugenossenschaft ferrum, Weissenbrunnenstrasse Birmensdorf, Hugo Buff, Buff Treuhand, OSS one smart star, Re Commit AG, JADE property, Mantelfirma, Strafanzeige, Betreibung";

  const tags =
    "switzerland,zurich,birmensdorf,property-management,tenant-warning,business-scam,buff-treuhand,pridomus,investigation";

  const metaTitle =
    "Pridomus / Pascali Investigation: Birmensdorf, Renames, Tenant Risk | scamreports";

  const metaDescription =
    "7 Strafanzeigen against pridomus AG on file (Kanton Zürich, 2022–2025). SHAB network, Birmensdorf, Pascali, tenant key risks — maximum caution.";

  const readingTime = 16;

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
