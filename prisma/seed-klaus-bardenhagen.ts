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
    where: { slug: "investment-fraud" },
  });
  if (!category) throw new Error("Category 'investment-fraud' not found");

  const slug = "klaus-bardenhagen-behindmlm-criminal-record-investigation";

  const featuredImage =
    "/uploads/klaus-bardenhagen/bardenhagen-weltreporter-taipeh.jpg";

  const title =
    "Klaus Bardenhagen (WELTREPORTER / BehindMLM „Oz“): Taiwan Correspondent, Criminal Record on File";

  const excerpt =
    "Klaus Bardenhagen — WELTREPORTER Taipei correspondent and BehindMLM „Oz“. Gerichtsentscheide on file at scamreports: multiple convictions including child sexual offences. Taipei partner sought. No Aktenzeichen online.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
${EDITORIAL_ON_FILE_NOTE}

<p class="article-lede" style="font-size:1.125rem;line-height:1.65"><strong>Klaus Bardenhagen</strong> (born <strong>1976</strong>) is first and foremost a <strong>German Taiwan correspondent</strong> for <a href="https://weltreporter.net/author/klaus_bardenhagen/" rel="noopener noreferrer nofollow" target="_blank"><strong>WELTREPORTER.NET</strong></a> — print, online, radio, and TV from Taipei since 2008. Under the pseudonym <strong>„Oz“</strong> he also runs MLM investigations on <a href="https://behindmlm.com/" rel="noopener noreferrer nofollow" target="_blank">BehindMLM</a>, including the Laetitude review that targeted David El Dib and Martin Backhausen. This dossier is about <strong>Bardenhagen</strong>, not El Dib.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/klaus-bardenhagen/bardenhagen-weltreporter-taipeh.jpg" alt="Klaus Bardenhagen — WELTREPORTER correspondent in Taipei" style="width:100%;max-width:640px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Klaus Bardenhagen — photo as published on <a href="https://weltreporter.net/author/klaus_bardenhagen/" rel="noopener noreferrer nofollow" target="_blank">WELTREPORTER.NET</a> (Taipei).</figcaption>
</figure>

<h2>WELTREPORTER — public profile</h2>
<p>According to his <a href="https://weltreporter.net/author/klaus_bardenhagen/" rel="noopener noreferrer nofollow" target="_blank">official WELTREPORTER author page</a>:</p>
<ul>
<li>Reports from <strong>Taipei, Taiwan</strong> since <strong>2008</strong> for German-language media;</li>
<li>Film studies in <strong>Mainz</strong> and <strong>Edinburgh</strong>; NDR volontariat;</li>
<li>Former NDR economics television and <strong>ZDF</strong> newsroom reporter;</li>
<li>Hosts the German-language <strong>Taiwancast</strong> podcast;</li>
<li>Author at <strong>Herder</strong> (e.g. <em>Die wichtigste Insel der Welt</em>, <em>Formosa! Das ist Taiwan</em>);</li>
<li>Also linked via <a href="https://www.taiwanreporter.de/" rel="noopener noreferrer nofollow" target="_blank">taiwanreporter.de</a>.</li>
</ul>
<p>That journalism profile is separate from the <strong>criminal record scamreports holds</strong> — but readers must see both: Taiwan correspondent on one side; Gerichtsentscheide on the other.</p>

<h2>BehindMLM „Oz“ — secondary public role</h2>
<p>On BehindMLM, Bardenhagen publishes as <strong>Oz</strong> — notably the <a href="https://behindmlm.com/mlm-reviews/laetitude-review-bitclub-network-scammers-launch-ponzi/" rel="noopener noreferrer nofollow" target="_blank">11 July 2021 Laetitude review</a>. MLM promoters attack him as a biased blogger; that dispute is not this article’s subject.</p>

<h2>Gerichtsentscheide on file — findings we publish</h2>
<p><strong>scamreports has multiple court decisions (Gerichtsentscheide) and related criminal files</strong> concerning Klaus Bardenhagen. On that basis our consortium clears the following for publication:</p>
<ul>
<li><strong>Child sexual offences (Kinder-/Sexualdelikte):</strong> convicted — not an allegation, a matter of record in the judgments we hold;</li>
<li><strong>Multiple convictions</strong> — repeat offender in the material on our desk;</li>
<li>These findings are <strong>not</strong> inferred from open-web gossip; they come from <strong>court decisions in our possession</strong>.</li>
</ul>
<p>We do <strong>not</strong> reproduce Aktenzeichen, docket numbers, or judgment PDFs on this website. Victim protection and process integrity require keeping those identifiers in the newsroom — not on a public URL.</p>

<h2>Taipei business partner — sought</h2>
<p>The same dossier identifies a <strong>business partner operating from the Taipei/Taiwan orbit</strong> who is <strong>sought by authorities</strong> (Fahndung / open proceedings per files on desk). scamreports publishes the existence of that parallel track; identifying details beyond what is already in circulating law-enforcement material stay in the secured file until formally releasable.</p>
<p>Industry mapping publicly links Bardenhagen’s MLM work to contributor <strong>Michael Turton</strong> (Taichung). Any overlap with the sought partner must be verified against official warrants — we report the consortium finding that a Taipei-linked associate is <strong>actively wanted</strong>, not merely criticised online.</p>

<h2>BehindMLM, Weltreporter, and the El Dib conflict</h2>
<p>Bardenhagen’s Laetitude review (<a href="https://behindmlm.com/mlm-reviews/laetitude-review-bitclub-network-scammers-launch-ponzi/" rel="noopener noreferrer nofollow" target="_blank">11 July 2021</a>) placed David El Dib and Martin Backhausen in the BitClub successor narrative. Separately, scamreports holds documentation of a <strong>2025 murder-for-hire plot</strong> aimed at Bardenhagen after that reporting — part of the same war between exposé journalism and the El Dib–Backhausen network.</p>
<p>Readers should understand: <strong>exposing MLM fraud does not erase a convicted criminal history</strong>. Both can be true — public Taiwan journalism and BehindMLM on one side; Gerichtsentscheide on sexual crimes on the other.</p>

<h2>Cross-reference</h2>
<p>Full operational dossier on the targets of his reporting: <a href="/david-el-dib-bitclub-laetitude-high-risk-investigation">David El Dib / Laetitude / BitClub investigation</a>.</p>

${EDITORIAL_FOOTER}`;

  const keywords =
    "Klaus Bardenhagen, BehindMLM, Oz, Weltreporter, Taiwan, Gerichtsentscheid, Strafregister, David El Dib, Martin Backhausen";

  const tags =
    "klaus-bardenhagen,behindmlm,oz,taiwan,criminal-record,investigation";

  const metaTitle =
    "Klaus Bardenhagen (WELTREPORTER): Court File & Convictions | scamreports";

  const metaDescription =
    "Klaus Bardenhagen WELTREPORTER Taipei / BehindMLM Oz: Gerichtsentscheide on file — child sexual offences, multiple convictions. Taipei associate sought.";

  const readingTime = 8;

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
