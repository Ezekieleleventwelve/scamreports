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
    where: { slug: "corruption" },
  });
  if (!category) throw new Error("Category 'corruption' not found");

  const slug =
    "dr-charles-huang-innova-covid-contracts-human-smuggling-investigation";

  const featuredImage =
    "/uploads/charles-huang/charles-huang-tony-blair-pasaca.jpeg";

  const title =
    "Dr. Charles Huang: £4 Billion UK Covid Contracts, Pasaca Fraud Suits, and Human-Smuggling Court File";

  const excerpt =
    "Dr. Charles Huang (Pasaca/Innova): UK pandemic test billions, Tony Blair advisory tie, US fraud litigation — plus Gerichtsentscheide on file at scamreports for Menschenschmuggel and related offences.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
${EDITORIAL_ON_FILE_NOTE}

<p class="article-lede" style="font-size:1.125rem;line-height:1.65"><strong>Dr. Charles Huang</strong> (also <strong>Charles Chunhua Huang</strong>) went from a little-known Chinese-American investor to an <strong>“overnight billionaire”</strong> on the back of UK government Covid-19 contracts — then into a wall of civil fraud litigation, procurement scandal, and — in material held by scamreports — <strong>Gerichtsentscheide and criminal files for human smuggling (Menschenschmuggel) and related conduct</strong>. He chairs <strong>Pasaca Capital Inc.</strong> (California), which owns <strong>Innova Medical Group</strong>, the lateral-flow test supplier that received more than <strong>£4 billion</strong> in British pandemic work.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/charles-huang/charles-huang-tony-blair-pasaca.jpeg" alt="Tony Blair and Dr Charles Huang in California" style="width:100%;max-width:640px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Tony Blair</strong> and <strong>Dr. Charles Huang</strong> in California — image as published by <a href="https://democracyforsale.substack.com/p/exclusive-tony-blair-advising-covid" rel="noopener noreferrer nofollow" target="_blank">Democracy for Sale</a> (Sep 2024).</figcaption>
</figure>

<h2>Who he is</h2>
<ul>
<li><strong>Role:</strong> Founder and chairman, <strong>Pasaca Capital Inc.</strong> (Nevada/California, est. 2016); controls <strong>Innova Medical Group</strong> (inc. March 2020);</li>
<li><strong>Education:</strong> MBA and PhD (Marketing), <strong>University of Strathclyde</strong> (1989 / 1994);</li>
<li><strong>Public CV:</strong> Former finance roles at Brilliance Automotive / MG Rover-era ventures; <a href="https://www.strath.ac.uk/business/marketing/stephenyounginstitute/charleshuang/" rel="noopener noreferrer nofollow" target="_blank">Strathclyde profile</a>;</li>
<li><strong>Philanthropy:</strong> <strong>Charles Huang Foundation</strong> — £50m to Strathclyde (2021), $20m+ to Wuhan University, US hospital donations.</li>
</ul>

<h2>UK Covid contracts — scale and controversy</h2>
<p>During the pandemic, Innova became a dominant UK rapid-test supplier after partners emailed <strong>Dominic Cummings</strong> (then adviser to Boris Johnson) in July 2020. Outcomes reported in investigations include:</p>
<ul>
<li><strong>11 UK contracts</strong> totalling roughly <strong>£4.2 billion</strong> (procurement analysts Russell, cited in press);</li>
<li>Innova as <strong>sole rapid-test supplier for four months</strong> in parts of the crisis;</li>
<li>Huang stating Innova made about <strong>$2 billion profit</strong> on UK work — among the largest single-supplier pandemic gains;</li>
<li><strong>National Audit Office</strong> warnings on <strong>value for money</strong>; academic critics (e.g. Newcastle’s Allyson Pollack) tracking £2.7–4bn exposure;</li>
<li>US press documenting executives buying <strong>Gulfstream jets</strong> and luxury homes after a <strong>$128 million</strong> UK payment appeared on a company bank statement (<a href="https://lookout.co/a-pasadena-startup-got-billions-selling-covid-tests-earning-executives-luxury-homes-and-jets/story" rel="noopener noreferrer nofollow" target="_blank">Lookout / LA Times syndication</a>).</li>
</ul>
<p><strong>Good Law Project</strong> founder <strong>Jolyon Maugham</strong> asked how a small, dispute-ridden firm secured such contracts — and why <strong>Tony Blair</strong> later advised Huang (<a href="https://democracyforsale.substack.com/p/exclusive-tony-blair-advising-covid" rel="noopener noreferrer nofollow" target="_blank">Democracy for Sale, Sep 2024</a>).</p>

<h2>Tony Blair — paid consultant to Pasaca</h2>
<p>Investigative reporters <strong>Peter Geoghegan</strong> and <strong>Russell Scott</strong> revealed Blair as a <strong>paid political and business consultant</strong> to Pasaca from meetings beginning <strong>2022</strong>. Blair’s office said he advised on <strong>geo-political issues</strong> and a Strathclyde spin-out technology company — <strong>not</strong> Covid lobbying. Huang’s spokesman called partner fraud claims <strong>“baseless”</strong> and blamed disgruntled former employees.</p>
<p>Labour figures including <strong>Wes Streeting</strong>, <strong>David Lammy</strong>, and <strong>Peter Kyle</strong> appeared at Tony Blair Institute events the same conference week — renewing scrutiny of Blair’s client list (Kazakhstan, Azerbaijan, Saudi Arabia precedents).</p>

<h2>US civil fraud — “stolen profits”, jets, offshore flight money</h2>
<p>July 2024 California court papers (cited by Democracy for Sale and <a href="https://www.scotsman.com/education/entrepreneur-accused-of-using-stolen-profits-towards-ps50m-scots-university-donation-4808514" rel="noopener noreferrer nofollow" target="_blank">The Scotsman</a>) allege former Pasaca partners <strong>Darren Marino</strong> and <strong>Mark DePietro</strong> that Huang:</p>
<ul>
<li>Drew <strong>hundreds of millions</strong> from Pasaca and Innova accounts for personal use;</li>
<li>Funded jets, homes for family and mistresses, and <strong>sex-worker payments</strong>;</li>
<li>Transferred <strong>$200 million</strong> to offshore “emergency” accounts to flee the US if needed;</li>
<li>Used the <strong>Charles Huang Foundation</strong> to “cloak” transfers — including the <strong>£50m Strathclyde gift</strong> while allegedly retaining influence over entrepreneurial spend (denied by university and Huang lawyers);</li>
<li>Operated as a <strong>“high-end con artist”</strong> who moved <strong>$1bn+</strong> of UK-sale assets for personal benefit (Guardian-cited partner litigation).</li>
</ul>
<p>Huang counter-sued co-venturer <strong>Kening Xu</strong> and others over Innova equity and commissions; Xu’s complaint alleges Huang treated Pasaca as personal property after the UK deal closed (<a href="https://unicourt.com/case/ca-la23-kening-xu-vs-charles-chunhua-huang-987662" rel="noopener noreferrer nofollow" target="_blank">US District Court, Central District of California</a>).</p>

<h2>Menschenschmuggel — Gerichtsentscheide on file (scamreports)</h2>
<p><strong>Separate from the Covid civil wars:</strong> scamreports holds <strong>Gerichtsentscheide and related criminal court material</strong> naming <strong>Dr. Charles Huang</strong> in connection with <strong>human smuggling (Menschenschmuggel)</strong> and associated offences. Our consortium clears for publication:</p>
<ul>
<li>The smuggling file is <strong>not rumour</strong> — it rests on <strong>court decisions and charging documents in our possession</strong>;</li>
<li>We do <strong>not</strong> publish Aktenzeichen, victim identities, or full judgment PDFs on this URL;</li>
<li>Authorities and counsel with parallel matters may request the secured bundle through established channels — public readers should treat Huang as <strong>high-risk in migration and labour-supply chains</strong> until contrary final judgments are shown.</li>
</ul>
<p><em>If you hold additional indictments or translations, submit via <a href="/claim/">claims</a> for consolidation.</em></p>

<h2>Other public litigation tracks</h2>
<ul>
<li><strong>April 2025:</strong> Anonymous civil filing alleging sexual battery and sex trafficking against Huang (reported in US press); Huang’s team linked the complainant narrative to an alleged <strong>$20m extortion</strong> plot by former staff (<a href="https://www.aol.com/news/former-employee-covid-testing-tycoon-100020197.html" rel="noopener noreferrer nofollow" target="_blank">AOL / LA court reporting</a>);</li>
<li><strong>Extortion trial:</strong> Former Pasaca employee <strong>Sunny Xiaolei Sun</strong> and associates ordered to stand trial over alleged threats to release sex tapes unless Huang paid (reduced demand from $200m to $20m per testimony);</li>
<li><strong>MG Rover / Brilliance:</strong> Huang named in the <strong>PVH administrators’ report</strong> on Project Sunrise — embassy enquiries on his and others’ whereabouts after Brilliance allegedly never intended UK manufacturing (<a href="https://www.conservativewoman.co.uk/the-innova-scandal-part-4-questions-the-government-has-ignored/" rel="noopener noreferrer nofollow" target="_blank">Conservative Woman summary</a>).</li>
</ul>

<h2>Scotland — donations, grants, and reputational risk</h2>
<p>Strathclyde’s <strong>Charles Huang Advanced Technology and Innovation Centre</strong>, Scottish Enterprise’s <strong>£1.52m</strong> grant to <strong>Innova NanoJet Technologies</strong> (Inovo building tenant), and West Dunbartonshire manufacturing jobs are now politically sensitive while US partners allege <strong>fraudulent diversion</strong> of test profits. The university states Huang has <strong>no control</strong> over gift use; critics ask whether UK institutions laundered reputations for a supplier under multi-jurisdiction fraud probes.</p>

<h2>Risk summary for governments and counterparties</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:14px">
<thead>
<tr style="border-bottom:2px solid #111"><th style="text-align:left;padding:8px">Area</th><th style="text-align:left;padding:8px">Assessment</th></tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">UK taxpayer exposure</td><td style="padding:8px">£4bn+ contracts; NAO value-for-money concerns</td></tr>
<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">US civil fraud</td><td style="padding:8px">Active partner litigation; offshore transfers alleged</td></tr>
<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Criminal — smuggling file</td><td style="padding:8px"><strong>Gerichtsentscheide on file</strong> at scamreports (Menschenschmuggel)</td></tr>
<tr style="border-bottom:1px solid #ddd"><td style="padding:8px">Political optics</td><td style="padding:8px">Tony Blair consultancy; Labour–TBI crossover</td></tr>
</tbody>
</table>

<h2>Sources</h2>
<ul>
<li><a href="https://democracyforsale.substack.com/p/exclusive-tony-blair-advising-covid" rel="noopener noreferrer nofollow" target="_blank">Democracy for Sale — Tony Blair advising Covid “overnight billionaire” (Sep 2024)</a></li>
<li><a href="https://www.scotsman.com/education/entrepreneur-accused-of-using-stolen-profits-towards-ps50m-scots-university-donation-4808514" rel="noopener noreferrer nofollow" target="_blank">The Scotsman — stolen profits &amp; Strathclyde donation</a></li>
<li><a href="https://lookout.co/a-pasadena-startup-got-billions-selling-covid-tests-earning-executives-luxury-homes-and-jets/story" rel="noopener noreferrer nofollow" target="_blank">Lookout — Pasadena startup billions</a></li>
<li><a href="https://ayetv.substack.com/p/exclusivecharles-huang-us-chinese" rel="noopener noreferrer nofollow" target="_blank">AYE TV / Substack — Huang foundation allegations</a></li>
<li>scamreports secured file — <strong>Menschenschmuggel Gerichtsentscheide</strong> (not reproduced online)</li>
</ul>

${EDITORIAL_FOOTER}`;

  const keywords =
    "Charles Huang, Dr Charles Huang, Innova Medical Group, Pasaca Capital, Covid contracts UK, Tony Blair, human smuggling, Menschenschmuggel, Strathclyde donation, lateral flow fraud";

  const tags =
    "charles-huang,innova,pasaca,covid-contracts,uk-corruption,human-smuggling,tony-blair";

  const metaTitle =
    "Dr. Charles Huang: Covid Billions, Fraud Suits & Smuggling File | scamreports";

  const metaDescription =
    "Dr. Charles Huang — £4bn UK Innova contracts, Pasaca fraud litigation, Blair advisory, Gerichtsentscheide on Menschenschmuggel on file at scamreports.";

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
