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
    "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance";

  const featuredImage = "/uploads/jonny-dodge/jonny-dodge.jpg";
  const jonnyImage = "/uploads/jonny-dodge/jonny-dodge.jpg";
  const oliverImage = "/uploads/oliver-clarke/oliver-clarke.jpg";

  const title =
    "YOUR SKY (yoursky.com): Jonny Dodge & Oliver Clarke — Threats, Non-Performance, and an Aviation Counterparty Warning";

  const excerpt =
    "Editorial file: YOUR SKY charter broker yoursky.com — Jonny Dodge (CEO) and Oliver Clarke (senior broker) alleged to threaten clients verbally and physically after non-performance on multiple jet deals. Turkish and international customers report losses; GBP 50,000 matter on file for Clarke.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
${EDITORIAL_ON_FILE_NOTE}

<p class="article-lede" style="font-size:1.125rem;line-height:1.65"><strong>YOUR SKY</strong> (<a href="https://yoursky.com/" rel="noopener noreferrer nofollow" target="_blank">yoursky.com</a>) markets itself as a disruptor in private jet charter and aircraft sales — crypto-friendly, WhatsApp-first, “we make the impossible happen.” Creditor and client files reviewed by scamreports tell a different story: <strong>multiple non-performance events</strong>, funds taken without delivery, and — in several matters — <strong>verbal and physical intimidation</strong> directed at customers who demanded refunds or contract performance. At the centre of the dossier: <strong>Jonny Dodge</strong> (also “Johnny Dodge”), founder and CEO per the company’s public team page, and <strong>Oliver Clarke</strong>, senior charter broker heading UK expansion.</p>

<p><strong>scamreports assessment:</strong> For a sector that lives on trust, crew safety, and regulated handling of client funds, the pattern described on file is not a billing dispute — it is a <strong>reputational catastrophe for aviation brokerage</strong>. Treat YOUR SKY and named operators as <strong>high-risk counterparties</strong> until independent counsel verifies escrow, operator AOC, and payment rails.</p>

<h2>Who they are — public profile vs. editorial file</h2>
<p>YOUR SKY’s website presents a global jet charter and sales desk specialising in large-cabin and ultra-long-range aircraft, with instant messaging and cryptocurrency payment options. Public team pages identify:</p>
<ul>
<li><strong>Jonny Dodge</strong> — CEO / founder (<a href="https://yoursky.com/team/jonny-dodge/" rel="noopener noreferrer nofollow" target="_blank">yoursky.com/team/jonny-dodge</a>); Dubai footprint claimed in industry press;</li>
<li><strong>Oliver Clarke</strong> — senior jet charter advisor / senior charter broker (<a href="https://yoursky.com/team/oliver-clarke/" rel="noopener noreferrer nofollow" target="_blank">yoursky.com/team/oliver-clarke</a>); YOUR SKY announced UK office expansion with Clarke as lead broker (LinkedIn, 2025).</li>
</ul>
<p>That marketing layer is what prospects see first. The editorial file adds: <strong>non-delivery after payment</strong>, <strong>misappropriation of client funds alleged</strong>, and escalation to <strong>threats — including physical force — by Dodge, Clarke, or associates described as part of “the team.”</strong></p>

<figure style="margin:1.5rem 0">
<img src="${jonnyImage}" alt="Jonny Dodge — public photo (Wikimedia Commons)" width="720" height="480" loading="lazy" style="max-width:100%;height:auto;border-radius:8px" />
<figcaption style="font-size:0.875rem;color:var(--muted-foreground);margin-top:0.5rem">Jonny Dodge — public photo (Wikimedia Commons). YOUR SKY CEO per company site.</figcaption>
</figure>

<figure style="margin:1.5rem 0">
<img src="${oliverImage}" alt="Oliver Clarke — YOUR SKY senior charter broker" width="200" height="200" loading="lazy" style="max-width:100%;height:auto;border-radius:8px" />
<figcaption style="font-size:0.875rem;color:var(--muted-foreground);margin-top:0.5rem">Oliver Clarke — senior charter broker, YOUR SKY (public LinkedIn profile image).</figcaption>
</figure>

<h2>Non-performance — multiple matters on file</h2>
<p>Across separate client submissions (2025–2026), a repeating fact pattern emerges:</p>
<ul>
<li>Charter or brokerage quotes accepted; <strong>deposits or full prepayments</strong> requested via fast rails (including crypto / instant transfer messaging);</li>
<li><strong>No aircraft</strong>, <strong>no repositioning</strong>, or <strong>no contractually agreed service</strong> delivered on the booked date;</li>
<li>When clients invoke cancellation rights or chargeback paths, responses shift from delay to <strong>pressure</strong> rather than documented refund workflows;</li>
<li>Turkish customers are named in more than one file as having been <strong>“prellt”</strong> (defrauded / left unpaid) after transferring funds for flights that did not operate as sold.</li>
</ul>
<p>One consolidated matter tied to <strong>Oliver Clarke</strong> records a reported client loss of <strong>GBP 50,000</strong> (editorial file, May 2026). Other amounts and jurisdictions remain in the newsroom pending consent for publication.</p>

<h2>Threats — verbal, physical, and “team” intimidation</h2>
<p>The most serious allegations in the YOUR SKY dossier are not financial alone. Multiple interlocutors describe:</p>
<ul>
<li><strong>Verbal threats</strong> during calls and instant-message threads when clients refused further payments or demanded proof of operator licence and tail number;</li>
<li><strong>Physical intimidation</strong> — including incidents where clients state that Dodge, Clarke, or persons presented as YOUR SKY staff used or threatened <strong>physical force</strong> to silence complaints or recover hardware / documents;</li>
<li>Conduct characterised by victims as <strong>“grober”</strong> (coarse/aggressive) and <strong>abnormal for aviation professionals</strong> — a sector where disputes are normally handled through counsel, escrow, and operator contracts, not street-level pressure.</li>
</ul>
<p>scamreports has <strong>not</strong> published victim names, medical records, or police file numbers online. Where criminal conduct is alleged, material is retained for authorities and counsel. The public interest finding: <strong>prospective charter clients should not assume YOUR SKY disputes stay commercial.</strong></p>

<h2>Why this matters for aviation</h2>
<p>Private aviation brokerage sits between the passenger and the <strong>AOC holder</strong> (the actual operator). Reputable brokers document: operator name, insurance, tail, crew, cancellation terms, and client-money handling. YOUR SKY’s public pitch emphasises speed and crypto — not segregated client accounts or FINMA/FCA-style disclosures.</p>
<p>When non-performance stacks across jurisdictions (UK, UAE, Turkey, wider Europe/Asia client base cited in marketing), the industry risk is contagion: suppliers, FBOs, and legitimate brokers inherit suspicion. Sources familiar with charter due diligence describe the YOUR SKY pattern as <strong>“a pure catastrophe”</strong> for sector reputation — strong language, but consistent with multi-file non-delivery plus intimidation claims.</p>

<h2>Warnlist international — linked entries</h2>
<p>scamreports maintains parallel due-diligence entries (static register, searchable):</p>
<ul>
<li><a href="/warnlist/yoursky">YOUR SKY (company)</a></li>
<li><a href="/warnlist/jonny-dodge">Jonny Dodge</a></li>
<li><a href="/warnlist/oliver-clarke">Oliver Clarke</a></li>
</ul>
<p>Readers with additional contracts, wire proofs, or operator correspondence may submit material via <a href="/warnlist/submit">Suggest a listing</a> or <a href="/claim/">claims</a>.</p>

<h2>Due diligence — minimum steps before paying YOUR SKY</h2>
<ol>
<li>Demand the <strong>operating AOC holder</strong> (legal name + licence number) — not a brochure PDF;</li>
<li>Confirm <strong>tail number</strong>, insurance certificate, and crew roster before any transfer;</li>
<li>Use <strong>lawyer-controlled escrow</strong> — never crypto or instant transfer to a personal account on WhatsApp pressure;</li>
<li>Verify UAE/UK company extracts independently (UID / Companies House) — do not rely on website impressum alone;</li>
<li>If threats occur, <strong>preserve messages</strong>, cease contact, and report to local police — do not meet “the team” alone.</li>
</ol>

<h2>Sources &amp; right of reply</h2>
<p>Public sources: YOUR SKY website and team pages (May 2026). Editorial file: client statements, payment records, and correspondence held by scamreports (2025–2026). Named parties may submit court judgments, refund proofs, or operator contracts via <a href="/claim/">claims</a>.</p>

${EDITORIAL_FOOTER}`;

  const keywords =
    "YOUR SKY, yoursky.com, Jonny Dodge, Johnny Dodge, Oliver Clarke, Oliver Clark, aviation fraud, private jet charter, non-performance, threats, Turkish customers, GBP 50000";

  const tags =
    "yoursky,jonny-dodge,oliver-clarke,aviation-fraud,private-jet,dubai,uk,charter-broker";

  const metaTitle =
    "YOUR SKY Warning: Jonny Dodge & Oliver Clarke — Threats & Non-Performance | scamreports";

  const metaDescription =
    "YOUR SKY (yoursky.com): editorial file alleges Jonny Dodge and Oliver Clarke threatened clients, non-performance on jet deals, Turkish customer losses, GBP 50k matter. Aviation counterparty warning.";

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
