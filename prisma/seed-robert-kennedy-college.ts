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

  const slug = "robert-kennedy-college-switzerland-mba-scam-alert";

  const featuredImage = "/uploads/robert-kennedy-college/homepage-hero.webp";
  const image1 = "/uploads/robert-kennedy-college/logo.webp";
  const image2 = "/uploads/robert-kennedy-college/cumbria-partner.svg";
  const image3 = "/uploads/robert-kennedy-college/homepage-hero.webp";

  const title =
    "Robert Kennedy College Switzerland: Online MBA Scam Alert — Refund Delay, Opaque Grading, Thin Teaching";

  const excerpt =
    "Former-student warning on Robert Kennedy College (RKC, Freienbach/Zürich): cancelled online MBA, agreed refund still unpaid, poor lecture quality, grading with no external re-mark, and non-responsive student services. UK validation via University of Cumbria — verify before you pay.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
<h2>Overview</h2>
<p><strong>Robert Kennedy College</strong> (also styled RKC / Robert Kennedy Institute in market talk; domains <strong>rkc.swiss</strong>, <strong>rkc.edu</strong>, <strong>college.ch</strong>) markets online BA, MBA, MSc, LLM and doctoral pathways from Switzerland, with public partnership messaging tied to UK universities — notably the <strong>University of Cumbria</strong>.</p>
<p>scamreports received a detailed <strong>former-student consumer complaint</strong> describing an online MBA experience so poor the student cancelled the degree — and, months later, is still chasing a refund the college had already agreed to. This alert summarises that account, names the contacts on the correspondence trail, and flags accreditation questions prospective students should settle <em>in writing</em> before paying.</p>
<p><strong>Editorial recommendation:</strong> Treat RKC enrolment pitches as high consumer risk until accreditation scope, academic appeals, and refund timelines are confirmed in writing with both RKC and the UK awarding partner.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/robert-kennedy-college/homepage-hero.webp" alt="Robert Kennedy College website homepage hero" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Screenshot source: RKC marketing site (rkc.swiss), captured for this report.</figcaption>
</figure>

<h2>What they sell</h2>
<p>Public materials present RKC as a Swiss private college delivering flexible online programmes, with degrees awarded by UK partners after study through RKC’s platform. Address details published in RKC programme literature include:</p>
<ul>
<li><strong>Head office:</strong> Kantonsstrasse 25, 8807 Freienbach, Switzerland</li>
<li><strong>Zürich branch:</strong> Technoparkstrasse 1, 8005 Zürich, Switzerland</li>
<li><strong>Published contact:</strong> +41 58 122 11 11 · hello@rkc.edu · www.rkc.edu</li>
</ul>
<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/robert-kennedy-college/logo.webp" alt="Robert Kennedy College logo" style="max-width:280px;height:auto" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Logo as published on rkc.swiss</figcaption>
</figure>

<h2>Former student: “Why I cancelled my MBA”</h2>
<p>The complainant enrolled expecting a rigorous, professionally delivered online MBA matching RKC’s marketing. Their account — summarised below — is held on editorial file as a first-person warning to prospective students.</p>

<h3>Lecture and teaching quality</h3>
<p>The student describes lectures as thin and under-prepared, and professors as failing to demonstrate the academic calibre expected for premium fees. Online delivery, they argue, is not an excuse for low standards.</p>

<h3>Grading with no accountability</h3>
<p>Feedback on assessed work was allegedly unclear and inadequate. When the student requested that work be independently evaluated by an external professor — a reasonable step when disputing an assessment — the college <strong>refused</strong>. An institution confident in its grading should welcome external scrutiny, not forbid it.</p>

<h3>Customer service and the refund that never came</h3>
<p>Back-office handling is described as useless, inefficient and incompetent: emails unanswered or unresolved. After cancellation, the college <strong>agreed to a refund</strong>. More than a month later, the student reports they are still waiting. A personal email to the Dean allegedly received no reply.</p>

<blockquote style="margin:1.5rem 0;padding:1rem 1.25rem;border-left:3px solid #ccc;background:#fafafa;color:#333">
<p style="margin:0;font-style:italic">“What RKC sells and what it delivers are, in my experience, two very different things. Slick marketing, prestigious-sounding partnerships — and behind it, poor teaching, opaque grading, no accountability, and a refund process that drags on with no end in sight.”</p>
<p style="margin:0.75rem 0 0;font-size:12px;color:#666">— Former RKC MBA student (complaint on scamreports file)</p>
</blockquote>

<h2>The Cumbria question</h2>
<p>RKC programmes are publicly validated / partnered through UK institutions including the <strong>University of Cumbria</strong>. The complainant states they could not identify Swiss institutional accreditation of RKC’s own — and that the brand trades heavily on the UK partnership. Prospective students should verify:</p>
<ul>
<li>Exactly <strong>what</strong> is accredited and by whom;</li>
<li>Whether the award is identical in standing to on-campus Cumbria degrees;</li>
<li>How academic appeals and refunds work when delivery is via a Swiss private partner.</li>
</ul>
<figure style="margin:1.5rem 0;text-align:center">
  <img src="/uploads/robert-kennedy-college/cumbria-partner.svg" alt="University of Cumbria partner mark as shown on RKC site" style="max-width:220px;height:auto" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem">Cumbria partner branding as used on RKC’s site — confirm validation scope independently.</figcaption>
</figure>
<p>University of Cumbria publicly lists RKC Zürich as a partner delivering online postgraduate programmes. That partnership does <strong>not</strong>, by itself, answer a student’s complaint about refunds, grading appeals, or teaching quality at the Swiss delivery partner.</p>

<h2>Contacts on the complainant trail</h2>
<p>The following addresses appear on the editorial complaint correspondence. Roles beyond the email domain are not independently verified by scamreports — treat as outreach contacts pending confirmation:</p>
<ul>
<li><strong>david.costa@rkc.edu</strong> — David Costa</li>
<li><strong>chitra@rkc.swiss</strong> — Chitra (RKC)</li>
<li><strong>gopika.rajendran@rkc.edu</strong> — Gopika Rajendran</li>
<li><strong>akhil.rajeswary@rkc.edu</strong> — Akhil Rajeswary</li>
<li><strong>signy.henderson@cumbria.ac.uk</strong> — Signy Henderson (University of Cumbria)</li>
</ul>
<p>Warnlist register entries: <a href="/scamreport/warnlist/robert-kennedy-college">Robert Kennedy College</a> and linked named contacts.</p>

<h2>Red flags checklist</h2>
<ul>
<li>Premium online MBA marketing vs. student reports of thin teaching</li>
<li>Opaque grading / refusal of independent external re-mark</li>
<li>Agreed refund not paid within a month (and still outstanding)</li>
<li>Dean / leadership non-response to paying student grievance</li>
<li>Heavy reliance on UK partner branding — unclear Swiss institutional accreditation of RKC itself</li>
<li>Appeals, refund, and accreditation terms not locked in writing before payment</li>
</ul>

<h2>What to do if you are considering RKC — or already enrolled</h2>
<ul>
<li><strong>Before paying:</strong> demand written accreditation scope, appeals procedure, and refund schedule signed by RKC and the UK awarding body</li>
<li><strong>If refund agreed:</strong> preserve all emails, bank details, and timelines; escalate in writing to RKC and the partner university</li>
<li><strong>Switzerland:</strong> consider cantonal consumer advice / police economic crime if funds were obtained by deception</li>
<li><strong>UK partner:</strong> use the university’s formal complaints / OIA pathways where applicable</li>
<li><strong>Right of reply:</strong> named parties may submit documented corrections via our claim process</li>
</ul>

${EDITORIAL_FOOTER}
<p><strong>Classification:</strong> Consumer scam alert / high enrolment risk — former-student complaint on file (teaching quality, grading accountability, unpaid agreed refund). Not a FINMA securities matter; education / consumer-protection diligence required.</p>`;

  const keywords =
    "Robert Kennedy College, RKC scam, RKC Switzerland, online MBA warning, University of Cumbria, Freienbach, Zürich, refund delay, grading appeal, rkc.swiss, rkc.edu, David Costa, Signy Henderson";

  const tags =
    "switzerland,education,business-scam,consumer-alert,mba,rkc,cumbria,refund,warning";

  const metaTitle =
    "Robert Kennedy College Switzerland MBA Scam Alert: Refund & Grading Warning";

  const metaDescription =
    "scamreports alert: former RKC MBA student cancelled after poor teaching and opaque grading; agreed refund still unpaid. Cumbria partnership — verify before you pay.";

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
  console.log(`Warnlist: /scamreport/warnlist/robert-kennedy-college`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
