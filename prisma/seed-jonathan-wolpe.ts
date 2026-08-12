import { PrismaClient } from "@prisma/client";
import {
  EDITORIAL_FOOTER,
  EDITORIAL_ON_FILE_NOTE,
  EDITORIAL_VERIFICATION_LEDE,
} from "./lib/editorial-standard";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) throw new Error("No admin user found");

  const category = await prisma.category.findUnique({
    where: { slug: "fraud" },
  });
  if (!category) throw new Error("Category 'fraud' not found");

  const slug =
    "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure";

  const featuredImage =
    "/uploads/jonathan-wolpe/jonathan-wolpe-united-aviation-hangar.png";
  const image1 =
    "/uploads/jonathan-wolpe/jonathan-wolpe-whatsapp-contact.png";

  const title =
    "Jonathan Wolpe: Serial Fraudster with 150 Open Cases — United Aviation Group, Fraud, and Hangar Seizure";

  const excerpt =
    "Jonathan Wolpe (UAG, South Africa): ~150 open cases on file, DRC fraud arrest, Lanseria hangar seizure — identified by creditors and counsel as a serial aviation fraudster.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
${EDITORIAL_ON_FILE_NOTE}

<p class="article-lede" style="font-size:1.125rem;line-height:1.65"><strong>Jonathan Wolpe</strong> is classified in creditor and counsel files reviewed by scamreports as a <strong>serial fraudster</strong> in private aviation: approximately <strong>150 open cases</strong> — civil claims, criminal referrals, registry entries, and cross-border defaults — are active or unresolved against him and entities he controls. Publicly he still plays the Johannesburg elite: CEO of <strong>United Aviation Group (UAG)</strong>, horse-derby host, hangar-front photos with jets. The dossier underneath: <strong>fake bank proofs</strong>, a <strong>DRC election contract</strong> that left pilots hostage, sheriff attachment at <strong>Lanseria</strong>, and jet equipment seizures in group hangarage.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/jonathan-wolpe/jonathan-wolpe-united-aviation-hangar.png" alt="Jonathan Wolpe at United Aviation Group hangar with private jet" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Jonathan Wolpe</strong> at a <strong>United Aviation Group</strong> hangar — corporate branding visible on the building. Photo supplied to scamreports.</figcaption>
</figure>

<h2>Identification — contact on file</h2>
<p>Creditors and investigators have circulated the following contact footprint (screenshot on file, May 2026):</p>
<figure style="margin:1rem 0;max-width:400px">
  <img src="/uploads/jonathan-wolpe/jonathan-wolpe-whatsapp-contact.png" alt="Jonathan Wolpe WhatsApp contact card +27 83 270 8886" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">WhatsApp / mobile profile: <strong>Jonathan Wolpe</strong>, <strong>+27 83 270 8886</strong> (South Africa). Status text on card: “Never be afraid to try something new…” — supplied to scamreports.</figcaption>
</figure>
<p><strong>Do not</strong> send new funds or aircraft releases to this number without independent legal and title verification.</p>

<h2>~150 open cases — scale of exposure</h2>
<p>Our consortium’s consolidated file (registry extracts, counsel lists, and creditor submissions — not all matters are public dockets) shows roughly <strong>150 open cases</strong> tied to Wolpe personally or to UAG-linked entities. They span:</p>
<ul>
<li>Unpaid fuel, handling, maintenance, and charter brokerage invoices;</li>
<li>Cross-border defaults (UAE Arrow Avia, DRC/ZAS, European suppliers cited in press);</li>
<li>Registered aviation-creditor claims against <strong>United Flight Support</strong> (reported at roughly <strong>USD 259,000</strong> and <strong>EUR 53,000</strong> in industry filings);</li>
<li>Criminal tracks including <strong>Hawks</strong> fraud (~R9 million DRC-related loss) and KZN civil fraud (~R3.1 million).</li>
</ul>
<p>We do not publish internal case numbers online. The market takeaway: Wolpe is not a single-dispute debtor — he is a <strong>systemic counterparty risk</strong>.</p>

<h2>Who he is — and what the United Aviation Group claims to be</h2>
<p>Wolpe has run UAG for more than two decades, marketing Africa’s largest charter-broker footprint, FBO services, maintenance, hangarage, and aircraft sales through entities including:</p>
<ul>
<li><strong>United Flight Support</strong> (UFS)</li>
<li><strong>United Charter Services</strong></li>
<li><strong>United Aircraft Sales</strong> &amp; <strong>United Aircraft Maintenance</strong></li>
<li><strong>Owenair</strong> (acquired 2008 — historic Cape Town operator, est. 1946)</li>
</ul>
<p>Corporate marketing: <a href="https://unitedcharter.co.za/uag/" rel="noopener noreferrer nofollow" target="_blank">unitedcharter.co.za — United Aviation Group</a>. Company-registry reporting shows Wolpe as an <strong>active director in numerous companies</strong>, including equestrian vehicle <strong>Summit Club Equestrian</strong> behind the annual <strong>UAG SA Derby</strong>.</p>
<p><strong>Background:</strong> Interlocutors and court-adjacent filings describe Wolpe as coming from a <strong>respected South African family</strong> — which makes the contrast sharper when contractors, governments, and pilots are left unpaid while derby and champagne events continue.</p>

<h2>Unpaid aviation creditors — UFS / UAG cluster</h2>
<p><a href="https://www.ewn.co.za/2024/07/23/sa-pilots-held-hostage-in-kinshasa-after-aviation-ceo-dupes-drc-government" rel="noopener noreferrer nofollow" target="_blank">Eyewitness News (EWN)</a> and aviation-industry sources document a long pattern of defaults on fuel, handling, maintenance, and brokerage invoices tied to Wolpe’s companies. Reported highlights include:</p>
<ul>
<li><strong>United Flight Support</strong> carrying multi-currency creditor claims (approximately <strong>USD 259,111</strong> and <strong>EUR 53,253</strong> in one published industry matter);</li>
<li>Wolpe telling creditors he would pay only <em>“when we have the means and when I deem it necessary”</em>;</li>
<li>While pleading poverty, continuing <strong>UAG Derby</strong> equestrian events and a <strong>“League of Champions by UAG”</strong> football tournament;</li>
<li>Failed investor searches and new litigation in South Africa (July 2024 reporting).</li>
</ul>
<p>Sources in the aviation market describe UAG as a <strong>“soap bubble”</strong> — glossy branding over unresolved debts.</p>

<h2>Hangar, jets, and confiscation — counsel and public enforcement</h2>
<p><strong>Public record:</strong> EWN reported that the <strong>United Aviation Group hangar at Lanseria International Airport</strong> was <strong>attached by the sheriff</strong> amid the widening creditor and fraud crisis (<a href="https://www.ewn.co.za/2024/07/23/sa-pilots-held-hostage-in-kinshasa-after-aviation-ceo-dupes-drc-government" rel="noopener noreferrer nofollow" target="_blank">July 2024</a>).</p>
<p><strong>On file with scamreports:</strong> <strong>Several aviation-law practitioners</strong> have advised creditor groups that <strong>jet aircraft and related equipment</strong> stored in <strong>UAG hangarage in South Africa</strong> were subject to <strong>attachment / confiscation proceedings</strong> — consistent with sheriff enforcement and unpaid secured claims. We do not publish internal docket numbers or warehouse manifests online; the finding for the market is: <strong>treat UAG hangar assets as encumbered and legally contested</strong>.</p>
<p>Charter clients and lessors should verify <strong>title, lien status, and SACAA release paperwork</strong> before any movement of airframes or spares from Lanseria or other UAG facilities.</p>

<h2>DRC presidential elections contract — fraud, fake payments, hostage pilots</h2>
<p>In December 2023 Wolpe contracted with <strong>ZAS Aviation Transport and Logistics</strong> (DRC) to supply helicopters for presidential-election delegate transport — quoted at over <strong>R11 million</strong> for two Airbus H125 machines, per later court reporting.</p>
<p>EWN’s investigation established:</p>
<ul>
<li>Wolpe received funds including a <strong>USD 60,000 DRC-government deposit</strong> but failed to perform;</li>
<li>He delivered <strong>one wrong-type helicopter</strong> and never supplied the second;</li>
<li>He sent <strong>forged proof-of-payment documents</strong>, later verified as fake by banks;</li>
<li>Two <strong>South African pilots</strong> (Tim Stark and a colleague) were <strong>held in Kinshasa</strong> for days; one suffered a <strong>heart attack</strong> under stress; military seized aircraft and drained ferry fuel;</li>
<li>Outstanding amounts reported included roughly <strong>USD 150,000</strong> to ZAS (of which USD 60,000 belonged to the DRC state) and separate <strong>R3.1 million</strong> owed in KwaZulu-Natal.</li>
</ul>
<p>International creditors: EWN cited an alleged <strong>USD 250,000</strong> debt to UAE-based <strong>Arrow Avia</strong> unpaid for two years. Complaints were also filed with <strong>SACAA</strong> regarding Wolpe’s conduct.</p>

<h2>Criminal proceedings — Hawks arrest (November 2024)</h2>
<p>On <strong>26 November 2024</strong> the Hawks arrested Wolpe in Johannesburg (<a href="https://www.ewn.co.za/2024/11/26/hawks-arrest-sa-business-man-who-duped-drc-govt-out-of-millions-of-rands" rel="noopener noreferrer nofollow" target="_blank">EWN</a>).</p>
<p>Hawks spokesperson <strong>Lloyd Ramovha</strong> stated fraud charges tied to roughly <strong>R9 million</strong> in losses; Wolpe appeared in the <strong>Johannesburg Specialised Commercial Crimes Court (Palm Ridge)</strong>, was granted <strong>R20,000 bail</strong>, and was barred from leaving South Africa pending trial (<a href="https://www.ewn.co.za/2024/11/26/hawks-arrest-sa-business-man-who-duped-drc-govt-out-of-millions-of-rands" rel="noopener noreferrer nofollow" target="_blank">EWN — Hawks arrest</a>, <a href="https://www.ewn.co.za/2024/11/27/fraud-accused-aviation-boss-jonathan-wolpes-case-adjourned-to-2025" rel="noopener noreferrer nofollow" target="_blank">case adjourned to 2025</a>).</p>
<p>EWN’s “fall from grace” profile noted declared property interests approaching <strong>R30 million</strong> while contractors remained unpaid — <a href="https://www.ewn.co.za/2024/11/27/fall-from-grace-jonathan-wolpe-goes-from-rubbing-shoulders-with-joburg-elite-to-being-accused-of-fraud" rel="noopener noreferrer nofollow" target="_blank">EWN — fall from grace</a>.</p>

<h2>Market risk summary</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px">
<thead>
<tr style="border-bottom:2px solid #111"><th style="text-align:left;padding:8px">Risk</th><th style="text-align:left;padding:8px">Detail</th></tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Creditor exposure</td><td style="padding:8px">Multi-jurisdiction unpaid claims — UFS / UAG cluster</td></tr>
<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Enforcement</td><td style="padding:8px">Sheriff attachment — Lanseria hangar (public); jet equipment seizures per counsel briefs</td></tr>
<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Criminal</td><td style="padding:8px">Hawks fraud/theft — DRC contract (active 2025 docket)</td></tr>
<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Operational</td><td style="padding:8px">Forged POPs; pilot hostage incident; multi-jurisdiction civil debts</td></tr>
</tbody>
</table>

<h2>Sources &amp; right of reply</h2>
<p>Primary public sources: Eyewitness News series cited above. scamreports adds consortium review of <strong>lawyer representations on asset confiscation</strong>. For third-party aviation counterparty checks see also the industry register <a href="https://blacklist.aero/" rel="noopener noreferrer nofollow" target="_blank">blacklist.aero</a>.</p>
<p>Mr Wolpe may submit court judgments, payment proofs, or SACAA correspondence via <a href="/claim/">claims</a>.</p>

${EDITORIAL_FOOTER}`;

  const keywords =
    "Jonathan Wolpe, serial fraudster, 150 open cases, United Aviation Group, +27832708886, Lanseria, hangar seizure, South Africa aviation fraud, Hawks arrest";

  const tags =
    "jonathan-wolpe,united-aviation-group,south-africa,aviation-fraud,hangar,lanseria";

  const metaTitle =
    "Jonathan Wolpe: 150 Open Cases, UAG Fraud & Hangar Seizure | scamreports";

  const metaDescription =
    "Jonathan Wolpe — ~150 open cases, large-scale aviation fraud, UAG hangar, DRC arrest, +27 83 270 8886 on file. scamreports dossier.";

  const readingTime = 11;

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
