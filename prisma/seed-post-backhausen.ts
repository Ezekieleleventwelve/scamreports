import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const title = "The Alleged Fraudulent Operations of Martin Backhausen and David El Dib";
const slug = "alleged-fraudulent-operations-martin-backhausen-david-el-dib-bitclub-laetitude-swapoo";
const excerpt = "An investigation into Martin Backhausen and David El Dib — two figures linked to the $722 million BitClub Network Ponzi scheme — and their alleged new ventures Laetitude and Swapoo, which exhibit classic hallmarks of investment fraud.";
const tags = "Martin Backhausen, David El Dib, BitClub Network, Laetitude, Swapoo, Ponzi scheme, crypto fraud, investment fraud, MLM scam, Dubai scam, shell company, securities fraud";
const keywords = "Martin Backhausen scam, David El Dib fraud, BitClub Network Ponzi, Laetitude crypto scam, Swapoo trading scam, Spring7 FZ LLC, Russ Medlin, crypto Ponzi scheme, MLM fraud, Dubai shell company, investment fraud report, Backhausen El Dib, Laetitude review, Swapoo review, cryptocurrency scam warning";

const content = `<h2>Introduction</h2>
<p>An intricate web of allegations surrounds two central figures in the cryptocurrency and multi-level marketing (MLM) space: <strong>Martin Backhausen</strong> and <strong>David El Dib</strong>. Investigative reports and public records paint a picture of two individuals with deep ties to one of history's largest crypto Ponzi schemes, who are now allegedly orchestrating new, opaque ventures. Their operational playbook appears to involve the use of shell companies in lax jurisdictions, deceptive personal practices, and the promotion of investment platforms that exhibit classic hallmarks of fraud.</p>

<h2>The BitClub Network Foundation</h2>
<p>The foundation of Backhausen and El Dib's notoriety is their significant involvement with the <strong>BitClub Network</strong>, a massive Ponzi scheme that defrauded investors of approximately <strong>$722 million</strong> before its collapse. The U.S. Department of Justice indictment exposed a global fraud operation built on false promises of cryptocurrency mining returns.</p>

<p>David El Dib acted as a promoter for BitClub. A key piece of evidence is a video from a <strong>2017 BitClub event in Spain</strong>, where El Dib is seen sharing a stage with <strong>Russ Medlin</strong>, the network's founder. Medlin's history is particularly dark; he was later convicted on serious child sex charges in Indonesia. The association places El Dib directly in the inner circle of the scheme's leadership during its active years. Martin Backhausen, similarly, is identified as a key associate connected to the network and its players.</p>

<h2>Laetitude and Swapoo: The New Ventures</h2>
<p>Following the demise of BitClub, El Dib and Backhausen are alleged to have repackaged their model into a new project called <strong>Laetitude</strong> and its associated trading platform, <strong>Swapoo</strong>. Laetitude presents itself as an automated crypto-trading bot service, promising investors extraordinary returns, reportedly as high as <strong>149.32%</strong>.</p>

<p>Investigations, however, reveal a structure devoid of transparency or legitimate financial backing. Laetitude operates through <strong>Spring7 FZ LLC</strong>, a shell company registered in the United Arab Emirates, a jurisdiction frequently criticized as the "MLM scam capital of the world" for its lack of regulatory oversight. The domain itself, laetitude.com, is privately registered through a proxy service to hide the identity of its owners. The platform's compensation plan is heavily reliant on recruitment commissions and a binary structure, which is a classic indicator of a pyramid scheme rather than a legitimate investment fund. Dave Martin, the CEO of Swapoo based in the Philippines, is noted to have direct connections to Martin Backhausen, further cementing the network of individuals involved.</p>

<h2>Dubious Personal and Financial Practices</h2>
<p>Beyond their corporate structures, both men are alleged to employ a range of dubious personal practices to facilitate their operations and manage their wealth and legal status.</p>

<p><strong>Geographic Maneuvering:</strong> Both individuals strategically base themselves in jurisdictions with light-touch financial regulation. David El Dib has relocated to Dubai, using it as a base for Laetitude, while also maintaining a presence in Munich. Martin Backhausen divides his time between the Philippines and Europe, using these locations to complicate regulatory pursuit.</p>

<p><strong>Schein Marriage (Sham Marriage):</strong> Backhausen allegedly orchestrated a sham marriage in Barcelona for his girlfriend. This was reportedly done to enable the birth of their child in Austria, securing residency or citizenship benefits through a arrangement described as a "lesbian marriage."</p>

<p><strong>Strategic Marriages:</strong> El Dib is reported to have married a Brazilian woman he met on Lake Como. This is viewed by observers as a potential strategy to secure additional residency rights or facilitate the movement and protection of assets.</p>

<p><strong>Identity Manipulation:</strong> Backhausen is alleged to have paid significant sums to cultivate a false identity as a musician. This is seen as a tactic to build a veneer of legitimacy and obscure his history in the crypto world.</p>

<p><strong>Suspicious Transactions:</strong> A specific incident in Marbella from <strong>October 2023</strong> highlights the potential for criminal financial activity. Backhausen was reportedly involved in a Bitcoin transaction worth <strong>€200,000</strong> that involved counterfeit money. The intent behind this transaction — whether for purchasing goods, money laundering, or another illicit purpose — remains a critical question.</p>

<h2>Securities Fraud and Investor Warnings</h2>
<p>A central allegation against the Laetitude operation is <strong>securities fraud</strong>. Neither Laetitude nor its affiliated entities are registered to offer securities in any major jurisdiction, yet they solicit investments from the public. The business model is described by watchdog sites as a "productless Ponzi scheme," where the only real product is the affiliate membership itself.</p>

<p>Consumer reviews and analyses are overwhelmingly negative. One ScamAdviser review describes a victim's nightmare: after being convinced to invest, they faced endless fees and taxes whenever they attempted a withdrawal, a common "exit scam" tactic to prevent users from recovering their funds. The Intelligence Line describes Laetitude as having "the same false hope, same empty promises, same Ponzi DNA" as BitClub Network. Users report that El Dib is "not a visionary" but "a con artist refining his pitch."</p>

<h2>Conclusion</h2>
<p>The evidence compiled from investigative reports, watchdog organizations, and public records suggests that Martin Backhausen and David El Dib are seasoned operators within a network of alleged fraud. Their history with the BitClub Network, the opaque and high-risk structure of Laetitude and Swapoo, their use of shell companies in Dubai, and their engagement in suspicious personal financial dealings collectively form a picture of individuals who may pose a significant risk to investors. While they have not faced direct prosecution for their newer ventures, the red flags are extensive, and potential investors are strongly advised to exercise extreme caution.</p>`;

async function main() {
  // Get admin user
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) throw new Error("No admin user found");

  // Investment Fraud category
  const categoryId = "cmmbux02e0001yxwpzoz4hchv";

  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      tags,
      keywords,
      metaTitle: title,
      metaDescription: excerpt,
      featuredImage: null,
      categoryId,
      authorId: admin.id,
      readingTime,
      status: "PUBLISHED",
      publishedAt: new Date(),
      translations: "{}",
    },
  });

  console.log(`Created post: ${post.id}`);
  console.log(`Slug: ${post.slug}`);
  console.log(`Reading time: ${readingTime} min`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
