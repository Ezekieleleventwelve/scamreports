import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create default categories
  const categories = [
    {
      name: "Online Scam",
      slug: "online-scam",
      description: "Internet and digital scams including phishing, fake websites, and online fraud",
    },
    {
      name: "Investment Fraud",
      slug: "investment-fraud",
      description: "Ponzi schemes, fake investments, cryptocurrency scams, and financial fraud",
    },
    {
      name: "Fraud",
      slug: "fraud",
      description: "General fraud reports including identity theft, document fraud, and impersonation",
    },
    {
      name: "Corruption",
      slug: "corruption",
      description: "Reports of corruption, bribery, and abuse of power",
    },
    {
      name: "Phishing",
      slug: "phishing",
      description: "Email phishing, SMS scams, and social engineering attacks",
    },
    {
      name: "Romance Scam",
      slug: "romance-scam",
      description: "Dating scams, catfishing, and relationship fraud",
    },
    {
      name: "Business Scam",
      slug: "business-scam",
      description: "B2B fraud, fake companies, non-delivery, and business impersonation",
    },
    {
      name: "Employment Scam",
      slug: "employment-scam",
      description: "Fake job offers, work-from-home scams, and recruitment fraud",
    },
  ];

  const createdCategories: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories[cat.slug] = created.id;
  }

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@scamwatch.dev" },
    update: { role: "ADMIN" },
    create: {
      email: "admin@scamwatch.dev",
      name: "Admin",
      role: "ADMIN",
    },
  });

  // Create test posts
  const posts = [
    {
      title: "SwissCapital FX: Fake Forex Trading Platform Steals CHF 2.3 Million",
      slug: "swisscapital-fx-fake-forex-trading-platform-steals-chf-2-3-million",
      excerpt: "Investigation reveals SwissCapital FX operated as a fraudulent trading platform, siphoning funds from over 400 victims across Switzerland and Germany through sophisticated social engineering tactics.",
      content: `<h2>Overview</h2>
<p>SwissCapital FX presented itself as a legitimate Swiss-regulated forex trading platform, claiming to offer AI-driven trading strategies with guaranteed returns of 15-25% per month. The platform operated from September 2024 to January 2026, targeting German-speaking investors.</p>

<h2>How the Scam Worked</h2>
<p>Victims were initially contacted through professional-looking advertisements on social media platforms, particularly LinkedIn and Facebook. The ads featured fake testimonials from supposed Swiss banking professionals.</p>

<h3>Step 1: Initial Contact</h3>
<p>Potential victims received personalized messages from "account managers" who claimed to be based in Zurich. These managers used Swiss phone numbers and professional email addresses ending in @swisscapitalfx.com.</p>

<h3>Step 2: Small Initial Profits</h3>
<p>After depositing small amounts (typically CHF 250-500), victims would see their accounts show impressive returns within the first week. These were entirely fabricated numbers displayed on a rigged dashboard.</p>

<h3>Step 3: Pressure to Invest More</h3>
<p>Account managers would pressure victims to increase their investments, claiming that "premium tier" accounts with CHF 10,000+ deposits would unlock even higher returns and exclusive features.</p>

<h3>Step 4: Withdrawal Block</h3>
<p>When victims attempted to withdraw funds, they were told they needed to pay "withdrawal fees," "tax clearance charges," or "account verification deposits" before any money could be released.</p>

<h2>Red Flags Identified</h2>
<ul>
<li>No registration with FINMA (Swiss Financial Market Supervisory Authority)</li>
<li>Guaranteed returns claims (legitimate investments never guarantee returns)</li>
<li>Pressure to deposit more before withdrawals</li>
<li>Website registered anonymously through offshore registrar</li>
<li>No physical office at the claimed Zurich address</li>
</ul>

<h2>Impact</h2>
<p>Based on reports filed with this registry and law enforcement data:</p>
<ul>
<li><strong>Total estimated losses:</strong> CHF 2.3 million</li>
<li><strong>Number of known victims:</strong> 400+</li>
<li><strong>Average loss per victim:</strong> CHF 5,750</li>
<li><strong>Countries affected:</strong> Switzerland, Germany, Austria</li>
</ul>

<h2>Current Status</h2>
<p>FINMA issued a public warning about SwissCapital FX in December 2025. The website has since been taken down, but the operators remain unidentified. Swiss federal police (fedpol) has opened an investigation.</p>`,
      categorySlug: "investment-fraud",
      keywords: "SwissCapital FX, forex scam, trading fraud, Switzerland scam, fake broker, investment fraud, FINMA warning, forex trading platform scam, cryptocurrency fraud, Swiss financial scam",
      tags: "forex,trading,switzerland,finma,investment",
      metaTitle: "SwissCapital FX Scam Alert: Fake Forex Platform Steals CHF 2.3M",
      metaDescription: "Detailed report on SwissCapital FX, a fraudulent forex trading platform that defrauded 400+ victims of CHF 2.3 million through fake AI trading promises.",
      readingTime: 6,
    },
    {
      title: "PhishNet Pro: Massive Email Phishing Campaign Targets European Banks",
      slug: "phishnet-pro-massive-email-phishing-campaign-targets-european-banks",
      excerpt: "A sophisticated phishing operation dubbed PhishNet Pro has been targeting customers of major European banks with near-perfect replica login pages, stealing credentials and draining accounts.",
      content: `<h2>Summary</h2>
<p>Security researchers have uncovered a large-scale phishing operation targeting customers of UBS, Credit Suisse, Deutsche Bank, and Raiffeisen. The campaign uses sophisticated email templates that bypass most spam filters and redirect victims to convincing fake banking portals.</p>

<h2>Technical Analysis</h2>
<p>The phishing emails use legitimate-looking sender addresses spoofed to appear as official bank communications. The emails typically claim there is a "security alert" or "mandatory account verification" that requires immediate action.</p>

<h3>Email Characteristics</h3>
<ul>
<li>Perfect replication of bank branding and formatting</li>
<li>Personalized with victim's first name (data from leaked databases)</li>
<li>Embedded tracking pixels to confirm email opens</li>
<li>Links using legitimate URL shorteners to bypass filters</li>
</ul>

<h3>Fake Login Pages</h3>
<p>The phishing pages are hosted on compromised legitimate websites, making them harder to detect. They capture login credentials, two-factor authentication codes, and even session cookies in real-time, immediately replaying them against the real banking portal.</p>

<h2>How to Protect Yourself</h2>
<ul>
<li>Never click links in emails claiming to be from your bank</li>
<li>Always type your bank's URL directly in the browser</li>
<li>Enable hardware security keys (FIDO2/WebAuthn) instead of SMS 2FA</li>
<li>Report suspicious emails to your bank immediately</li>
</ul>

<h2>Known Indicators of Compromise</h2>
<p>The following domains have been identified as part of this campaign: secure-ubs-verify.com, creditsuisse-security.net, deutsche-bank-alert.com (all now seized by authorities).</p>`,
      categorySlug: "phishing",
      keywords: "phishing attack, bank phishing, UBS phishing, Credit Suisse scam, email fraud, credential theft, European bank scam, two-factor bypass, real-time phishing, banking fraud",
      tags: "phishing,banking,email,security,europe",
      metaTitle: "PhishNet Pro Phishing Campaign: European Bank Customers Targeted",
      metaDescription: "Alert: Sophisticated phishing campaign PhishNet Pro targets UBS, Credit Suisse, Deutsche Bank customers with near-perfect replica login pages.",
      readingTime: 5,
    },
    {
      title: "CryptoVault AG: Ponzi Scheme Disguised as DeFi Yield Platform",
      slug: "cryptovault-ag-ponzi-scheme-disguised-as-defi-yield-platform",
      excerpt: "CryptoVault AG marketed itself as a regulated Swiss DeFi yield aggregator promising 8% monthly returns. After collecting over EUR 15 million from investors, the founders disappeared.",
      content: `<h2>Background</h2>
<p>CryptoVault AG was registered in Zug, Switzerland's "Crypto Valley," and claimed to operate a decentralized finance (DeFi) yield aggregation platform. The company promised investors consistent monthly returns of 8% through "proprietary smart contract strategies."</p>

<h2>The Scheme</h2>
<p>The platform operated as a classic Ponzi scheme, using new investor deposits to pay returns to earlier investors. The illusion of legitimate operations was maintained through:</p>
<ul>
<li>A registered Swiss AG (corporation) with a Zug address</li>
<li>Professional website with real-time "yield dashboard"</li>
<li>Regular "audit reports" from a fictitious accounting firm</li>
<li>Sponsorship of blockchain conferences and meetups</li>
<li>Influencer partnerships promoting the platform</li>
</ul>

<h2>Timeline of Events</h2>
<ul>
<li><strong>March 2025:</strong> CryptoVault AG registered in Zug</li>
<li><strong>April-June 2025:</strong> Initial marketing push, first investors onboarded</li>
<li><strong>July-October 2025:</strong> Aggressive growth, EUR 15M+ collected</li>
<li><strong>November 2025:</strong> Withdrawals start being delayed</li>
<li><strong>December 2025:</strong> Website goes offline, founders unreachable</li>
<li><strong>January 2026:</strong> Criminal complaints filed with Zug state police</li>
</ul>

<h2>Identified Perpetrators</h2>
<p>The company was registered by two individuals using forged passports. Interpol has issued red notices. Investigation is ongoing.</p>

<h2>Lessons Learned</h2>
<p>No legitimate investment can guarantee consistent high returns. Always verify that financial service providers are registered with FINMA and cross-reference their claimed registrations on the official FINMA website.</p>`,
      categorySlug: "investment-fraud",
      keywords: "CryptoVault AG, Ponzi scheme, DeFi scam, cryptocurrency fraud, yield farming scam, Zug Switzerland, crypto valley scam, blockchain fraud, investment scam Switzerland, smart contract scam",
      tags: "crypto,ponzi,defi,switzerland,zug",
      metaTitle: "CryptoVault AG Ponzi Scheme: EUR 15M DeFi Yield Scam Exposed",
      metaDescription: "CryptoVault AG exposed as Ponzi scheme disguised as Swiss DeFi yield platform. Over EUR 15 million stolen from investors before founders disappeared.",
      readingTime: 5,
    },
    {
      title: "Municipal Procurement Fraud: City Official Diverts CHF 800K to Shell Companies",
      slug: "municipal-procurement-fraud-city-official-diverts-chf-800k-to-shell-companies",
      excerpt: "A senior procurement officer in a mid-sized Swiss municipality systematically awarded contracts to shell companies controlled by family members, diverting an estimated CHF 800,000 over four years.",
      content: `<h2>Investigation Summary</h2>
<p>This report documents a case of systematic procurement fraud within a Swiss municipal government. A senior procurement officer exploited their position to award IT infrastructure contracts to companies secretly controlled by family members.</p>

<h2>How It Worked</h2>
<p>The officer was responsible for evaluating bids for IT maintenance, software licensing, and network infrastructure projects. Over a four-year period, they:</p>
<ul>
<li>Created artificially narrow technical specifications that only the shell companies could meet</li>
<li>Split large contracts into smaller ones below the competitive bidding threshold</li>
<li>Provided inside information on competitor bids to the shell companies</li>
<li>Approved inflated invoices for services never delivered</li>
</ul>

<h2>The Shell Company Network</h2>
<p>Three companies were identified as part of the scheme, all registered in different cantons but sharing the same beneficial owners (the officer's spouse and brother-in-law). The companies maintained minimal operations and primarily served as invoicing vehicles.</p>

<h2>Discovery and Investigation</h2>
<p>The fraud was discovered during a routine internal audit when an auditor noticed that three separate IT vendors all used the same bank account for receiving payments. This led to a deeper investigation revealing the full extent of the scheme.</p>

<h2>Legal Status</h2>
<p>The officer has been suspended and criminal proceedings have been initiated. The municipality is pursuing civil claims for recovery of the diverted funds. Two of the three shell companies have been dissolved.</p>`,
      categorySlug: "corruption",
      keywords: "procurement fraud, municipal corruption, Switzerland corruption, public procurement scam, shell company fraud, government corruption, embezzlement, conflict of interest, Swiss municipality fraud",
      tags: "corruption,procurement,government,switzerland,embezzlement",
      metaTitle: "Swiss Municipal Procurement Fraud: CHF 800K Diverted Through Shell Companies",
      metaDescription: "Report on systematic procurement fraud in Swiss municipality where senior official diverted CHF 800K to family-controlled shell companies over four years.",
      readingTime: 4,
    },
    {
      title: "LoveConnect International: Romance Scam Ring Operating from West Africa",
      slug: "loveconnect-international-romance-scam-ring-operating-from-west-africa",
      excerpt: "A coordinated romance scam ring using the alias LoveConnect International has defrauded dozens of Swiss and German citizens out of hundreds of thousands of francs through fake online relationships.",
      content: `<h2>Overview</h2>
<p>LoveConnect International is not a real company but the operational name used by investigators to describe a coordinated romance scam ring. The group operates primarily from Nigeria and Ghana, targeting lonely individuals in German-speaking European countries.</p>

<h2>Methodology</h2>
<p>The scammers create elaborate fake profiles on dating platforms including Tinder, Bumble, and Parship, as well as social media platforms. They use stolen photos of attractive individuals and build emotional relationships over weeks or months before requesting money.</p>

<h3>Common Scenarios Used</h3>
<ul>
<li><strong>"Military deployment":</strong> Claiming to be a US or NATO soldier stationed abroad who needs money for "leave paperwork"</li>
<li><strong>"Medical emergency":</strong> Sudden hospital bills or surgery costs in a foreign country</li>
<li><strong>"Business investment":</strong> Needing a short-term loan for a lucrative business deal</li>
<li><strong>"Travel funds":</strong> Needing money to visit the victim but then "encountering problems"</li>
</ul>

<h2>Scale of Operations</h2>
<p>Based on reports to Swiss cybercrime units and our registry:</p>
<ul>
<li>At least 15 operators working in shifts to maintain multiple "relationships" simultaneously</li>
<li>Over 50 known victims in Switzerland alone</li>
<li>Individual losses ranging from CHF 5,000 to CHF 150,000</li>
<li>Total estimated losses exceeding CHF 2 million</li>
</ul>

<h2>Warning Signs</h2>
<ul>
<li>Person refuses video calls or always has an excuse</li>
<li>Relationship progresses to "love" unusually quickly</li>
<li>Requests for money, gift cards, or cryptocurrency</li>
<li>Claims to be abroad (military, oil rig, business trip)</li>
<li>Photos can be found through reverse image search</li>
</ul>`,
      categorySlug: "romance-scam",
      keywords: "romance scam, love scam, dating fraud, catfishing, online dating scam, Nigerian scam, Ghana scam, Tinder scam, relationship fraud, Swiss romance scam",
      tags: "romance,dating,catfishing,social-engineering,fraud",
      metaTitle: "LoveConnect Romance Scam Ring: How Fake Online Relationships Steal Millions",
      metaDescription: "Exposing coordinated romance scam ring LoveConnect International targeting Swiss and German citizens through fake dating profiles, stealing CHF 2M+.",
      readingTime: 5,
    },
    {
      title: "FakeJob.ch: Employment Scam Targets Swiss Job Seekers with Advance Fee Fraud",
      slug: "fakejob-ch-employment-scam-targets-swiss-job-seekers-advance-fee-fraud",
      excerpt: "Scammers impersonating major Swiss employers are targeting job seekers with fake offers requiring advance payments for 'background checks', 'work permits', and 'training materials'.",
      content: `<h2>Scam Description</h2>
<p>A network of fraudulent job listings has been appearing on legitimate job boards including jobs.ch, Indeed Switzerland, and LinkedIn. The scammers impersonate well-known Swiss companies including Nestlé, Novartis, ABB, and Swiss Post, offering attractive positions with above-market salaries.</p>

<h2>How the Scam Works</h2>
<h3>Stage 1: The Listing</h3>
<p>Professional-looking job ads are posted for remote or hybrid positions with salaries 20-30% above market rate. The descriptions are copied from real job listings but modified with the fake contact details.</p>

<h3>Stage 2: The Interview</h3>
<p>Applicants receive a quick "interview" via WhatsApp or Telegram (never through official company channels). They are told they've been selected and receive a fake employment contract.</p>

<h3>Stage 3: The Fees</h3>
<p>Before starting, new "employees" are asked to pay for:</p>
<ul>
<li>Background check processing: CHF 150-300</li>
<li>Work permit application: CHF 500-1,000</li>
<li>Training materials and laptop: CHF 800-2,000</li>
<li>Insurance enrollment: CHF 200-500</li>
</ul>

<h3>Stage 4: Disappearance</h3>
<p>After payments are made, communication stops. Phone numbers are disconnected, email addresses become inactive, and the job listings are removed.</p>

<h2>Companies Being Impersonated</h2>
<p>All listed companies have confirmed they never ask candidates for upfront payments. Legitimate employers cover all onboarding costs.</p>

<h2>How to Verify</h2>
<ul>
<li>Contact the company directly through their official website</li>
<li>Check if the job listing appears on the company's official careers page</li>
<li>Never pay money to get a job - this is always a scam</li>
<li>Be suspicious of interviews conducted only via messaging apps</li>
</ul>`,
      categorySlug: "online-scam",
      keywords: "job scam, employment fraud, fake job, advance fee fraud, Swiss job scam, LinkedIn scam, jobs.ch scam, work from home scam, recruitment fraud, hiring scam",
      tags: "employment,jobs,advance-fee,impersonation,switzerland",
      metaTitle: "FakeJob.ch Alert: Employment Scam Targets Swiss Job Seekers",
      metaDescription: "Warning: Scammers impersonating Nestlé, Novartis, ABB target Swiss job seekers with fake job offers requiring advance fee payments.",
      readingTime: 4,
    },
  ];

  for (const post of posts) {
    const categoryId = createdCategories[post.categorySlug];
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: "PUBLISHED",
        categoryId,
        tags: post.tags,
        keywords: post.keywords,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        readingTime: post.readingTime,
        authorId: admin.id,
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        viewCount: Math.floor(Math.random() * 5000) + 100,
      },
    });
  }

  console.log(`Seed completed: ${categories.length} categories, 1 admin user, ${posts.length} test posts created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
