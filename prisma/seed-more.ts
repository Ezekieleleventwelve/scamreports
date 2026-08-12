import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Get admin user
  const admin = await prisma.user.findUnique({
    where: { email: "admin@scamwatch.dev" },
  });
  if (!admin) throw new Error("Run the main seed first");

  // Get categories
  const cats = await prisma.category.findMany();
  const catMap: Record<string, string> = {};
  for (const c of cats) catMap[c.slug] = c.id;

  const posts = [
    {
      title: "AlpineWealth Management: Unlicensed Investment Advisor Fleeces Retirees of CHF 4.1 Million",
      slug: "alpinewealth-management-unlicensed-investment-advisor-fleeces-retirees",
      excerpt: "An unregistered investment advisor operating under the name AlpineWealth Management targeted Swiss retirees with promises of safe, high-yield bond portfolios while funneling their savings into personal accounts.",
      content: `<h2>Summary</h2>
<p>AlpineWealth Management operated from a rented office in Lausanne between 2024 and 2025, presenting itself as a boutique wealth management firm specializing in retirement portfolios. The firm's sole operator, using the alias "Dr. Marcus Lehmann," claimed to hold a CFA charter and previous experience at major Swiss private banks.</p>

<h2>How the Fraud Was Conducted</h2>
<p>The operator recruited clients through seminars held at upscale hotels in Lausanne, Geneva, and Montreux. These events, marketed as "Retirement Security Workshops," were free to attend and included complimentary meals — a tactic designed to build trust with elderly attendees.</p>

<h3>The Investment Pitch</h3>
<p>Clients were offered a "Swiss Sovereign Bond Plus" portfolio that supposedly combined government bonds with a proprietary hedging strategy, promising:</p>
<ul>
<li>6-8% annual returns (well above actual bond yields)</li>
<li>"Capital guarantee" backed by a non-existent insurance policy</li>
<li>Monthly income distributions</li>
<li>No lock-up period (though withdrawals were later blocked)</li>
</ul>

<h3>Where the Money Went</h3>
<p>Forensic accounting revealed that client funds were transferred to personal accounts in Cyprus and the UAE. Approximately 30% was used to pay returns to earlier investors (Ponzi-style), while the remainder was spent on luxury goods, real estate, and further marketing.</p>

<h2>Victim Profile</h2>
<ul>
<li><strong>Number of known victims:</strong> 87</li>
<li><strong>Average age:</strong> 71 years</li>
<li><strong>Average investment:</strong> CHF 47,000</li>
<li><strong>Largest single loss:</strong> CHF 380,000</li>
<li><strong>Total losses:</strong> CHF 4.1 million</li>
</ul>

<h2>Red Flags</h2>
<ul>
<li>Not registered with FINMA as an asset manager or financial advisor</li>
<li>Guaranteed returns on what were supposedly market-linked products</li>
<li>Funds deposited to a personal bank account rather than a custodian</li>
<li>Refusal to provide audited account statements</li>
<li>The "CFA charter" was never verified with the CFA Institute</li>
</ul>

<h2>Legal Status</h2>
<p>Vaud cantonal police arrested the suspect in February 2026. Criminal proceedings for fraud, embezzlement, and operating without a financial license are underway. FINMA has placed the operation on its public warning list. Recovery of funds is considered unlikely as most assets were moved offshore.</p>`,
      categorySlug: "investment-fraud",
      keywords: "investment fraud, unlicensed advisor, retirement scam, wealth management fraud, Ponzi scheme, Swiss retirees, FINMA warning, bond scam, financial advisor fraud, Lausanne scam",
      tags: "investment,retirement,ponzi,switzerland,finma",
      metaTitle: "AlpineWealth Management Fraud: CHF 4.1M Stolen from Swiss Retirees",
      metaDescription: "Unlicensed investment advisor AlpineWealth Management defrauded 87 Swiss retirees of CHF 4.1 million through fake bond portfolios. Full investigation report.",
      readingTime: 6,
    },
    {
      title: "TechHire Solutions: Fake IT Recruitment Agency Harvests Personal Data",
      slug: "techhire-solutions-fake-it-recruitment-agency-harvests-personal-data",
      excerpt: "A fraudulent recruitment agency posing as a Swiss IT headhunter collected passports, bank details, and social security numbers from hundreds of job applicants under the guise of onboarding procedures.",
      content: `<h2>Overview</h2>
<p>TechHire Solutions presented itself as a premium IT recruitment agency based in Zurich, specializing in placing software engineers, data scientists, and cybersecurity professionals at top Swiss companies. The operation ran a professional website and maintained active LinkedIn profiles for several fictitious recruiters.</p>

<h2>The Data Harvesting Operation</h2>
<h3>Phase 1: Job Listings</h3>
<p>Attractive job listings were posted on LinkedIn, jobs.ch, and Stack Overflow Jobs, offering remote positions at well-known Swiss tech companies with salaries 20-40% above market rate. The listings used real company names without authorization.</p>

<h3>Phase 2: Professional Interview Process</h3>
<p>Applicants went through a seemingly legitimate multi-stage interview process:</p>
<ul>
<li>Initial screening call via Zoom (with camera off, claiming "company policy")</li>
<li>Technical assessment through a legitimate-looking online platform</li>
<li>"Final interview" with a supposed hiring manager</li>
</ul>

<h3>Phase 3: Data Collection</h3>
<p>Successful candidates were told they'd been selected and asked to submit "onboarding documents":</p>
<ul>
<li>Passport or ID card (front and back scans)</li>
<li>AHV/social security number</li>
<li>Bank account details for "salary setup"</li>
<li>Proof of address (utility bill)</li>
<li>Tax identification number</li>
<li>Criminal record extract</li>
</ul>

<h2>What Happened to the Data</h2>
<p>The harvested personal data was used for:</p>
<ul>
<li><strong>Identity theft:</strong> Opening bank accounts and credit lines in victims' names</li>
<li><strong>Tax fraud:</strong> Filing false tax returns to claim refunds</li>
<li><strong>Sale on dark web:</strong> Complete identity packages sold for EUR 200-500 each</li>
</ul>

<h2>Scale of Impact</h2>
<ul>
<li><strong>Estimated victims:</strong> 300-500 across Switzerland and Germany</li>
<li><strong>Period of operation:</strong> March 2025 – January 2026</li>
<li><strong>Companies impersonated:</strong> Google Zurich, UBS, SIX Group, Swisscom, ABB</li>
</ul>

<h2>How to Protect Yourself</h2>
<ul>
<li>Never submit identity documents before signing an actual employment contract</li>
<li>Verify recruiters through the company's official HR department</li>
<li>Check if the recruitment agency is registered in the Swiss commercial register</li>
<li>Be suspicious of interviews where the interviewer keeps their camera off</li>
<li>If you've been affected, report to MELANI/NCSC and freeze your credit</li>
</ul>`,
      categorySlug: "online-scam",
      keywords: "recruitment scam, identity theft, data harvesting, fake recruiter, IT job scam, personal data theft, Swiss recruitment fraud, LinkedIn scam, job application fraud, onboarding scam",
      tags: "recruitment,identity-theft,data,linkedin,employment",
      metaTitle: "TechHire Solutions: Fake Recruiter Harvests Personal Data from IT Job Seekers",
      metaDescription: "Fake IT recruitment agency TechHire Solutions harvested passports and bank details from 500+ job applicants. Identity theft and dark web data sales confirmed.",
      readingTime: 5,
    },
    {
      title: "GreenEnergy Token: Fraudulent Crypto Token Exploits Climate Concerns",
      slug: "greenenergy-token-fraudulent-crypto-token-exploits-climate-concerns",
      excerpt: "A cryptocurrency project claiming to fund renewable energy installations through blockchain technology turned out to be a rug pull, with developers draining EUR 8.2 million in liquidity.",
      content: `<h2>Project Background</h2>
<p>GreenEnergy Token (GET) launched in May 2025 as an ERC-20 token on the Ethereum blockchain, marketing itself as a "climate-positive cryptocurrency" that would fund solar panel installations across developing countries. The project garnered attention through aggressive social media marketing and endorsements from environmental influencers.</p>

<h2>Marketing Tactics</h2>
<p>The project employed sophisticated marketing strategies:</p>
<ul>
<li><strong>Influencer partnerships:</strong> Paid environmental activists and crypto influencers to promote the token</li>
<li><strong>Fake partnerships:</strong> Claimed collaborations with UNHCR and the World Wildlife Fund (both denied any involvement)</li>
<li><strong>Fabricated impact reports:</strong> Published fake documentation of solar installations in Kenya and Bangladesh</li>
<li><strong>Celebrity deepfakes:</strong> Used AI-generated video endorsements from public figures</li>
</ul>

<h2>The Rug Pull</h2>
<p>On October 12, 2025, the development team executed a classic rug pull:</p>
<ol>
<li>Removed all liquidity from the Uniswap trading pool (EUR 8.2 million)</li>
<li>Deleted all social media accounts (Twitter, Discord, Telegram)</li>
<li>Took the website offline</li>
<li>Transferred funds through Tornado Cash mixer</li>
</ol>
<p>Token holders were left with worthless tokens that could no longer be traded.</p>

<h2>Technical Analysis</h2>
<p>Blockchain analysis revealed several red flags that were present from launch:</p>
<ul>
<li>Smart contract contained a hidden function allowing developers to drain the liquidity pool</li>
<li>70% of tokens were held by wallets linked to the development team</li>
<li>No time-lock on liquidity provider tokens</li>
<li>Contract was not audited by any reputable security firm (the claimed "CertiK audit" was fabricated)</li>
</ul>

<h2>Impact</h2>
<ul>
<li><strong>Total funds stolen:</strong> EUR 8.2 million</li>
<li><strong>Estimated number of token holders:</strong> 12,000+</li>
<li><strong>Countries most affected:</strong> Germany, Switzerland, Austria, Netherlands</li>
</ul>

<h2>Lessons</h2>
<ul>
<li>Always verify claimed partnerships directly with the organizations mentioned</li>
<li>Check if smart contracts have been independently audited (verify directly on the auditor's website)</li>
<li>Be extremely cautious of tokens with no liquidity lock</li>
<li>Celebrity endorsements in crypto are frequently fake or paid for without due diligence</li>
</ul>`,
      categorySlug: "fraud",
      keywords: "crypto rug pull, cryptocurrency scam, GreenEnergy Token, DeFi fraud, Ethereum scam, token scam, rug pull, liquidity drain, climate crypto fraud, fake cryptocurrency",
      tags: "crypto,rug-pull,defi,ethereum,greenwashing",
      metaTitle: "GreenEnergy Token Rug Pull: EUR 8.2M Climate Crypto Scam Exposed",
      metaDescription: "GreenEnergy Token exposed as rug pull scam. Developers drained EUR 8.2M from 12,000+ investors after faking climate partnerships and solar installations.",
      readingTime: 6,
    },
    {
      title: "PharmaExpress Online: Counterfeit Medication Sales Endanger European Consumers",
      slug: "pharmaexpress-online-counterfeit-medication-sales-endanger-consumers",
      excerpt: "An illegal online pharmacy operating as PharmaExpress sold counterfeit and substandard medications to thousands of European consumers, with lab tests revealing dangerous contaminants in seized products.",
      content: `<h2>Investigation</h2>
<p>PharmaExpress operated multiple domain names (pharmaexpress-eu.com, pharmaexpress-shop.net, and others) selling prescription medications without requiring prescriptions. The operation primarily targeted consumers in Switzerland, Germany, and France seeking affordable medications.</p>

<h2>Products Sold</h2>
<p>The pharmacy offered a wide range of medications at 60-80% below legitimate pharmacy prices:</p>
<ul>
<li>Erectile dysfunction medications (claimed generic Viagra, Cialis)</li>
<li>Weight loss drugs (claimed Ozempic, Wegovy)</li>
<li>Anxiety medications (claimed Xanax, Valium)</li>
<li>Pain medications (claimed Tramadol, Codeine)</li>
<li>Antibiotics (claimed Amoxicillin, Azithromycin)</li>
</ul>

<h2>Laboratory Analysis of Seized Products</h2>
<p>Swissmedic and German BfArM authorities seized shipments and conducted laboratory analysis. Results were alarming:</p>
<ul>
<li><strong>34% of samples</strong> contained no active pharmaceutical ingredient at all</li>
<li><strong>28% contained wrong dosages</strong> (some dangerously high, others ineffective)</li>
<li><strong>15% contained undeclared substances</strong> including heavy metals and industrial chemicals</li>
<li><strong>23% were close to claimed composition</strong> but produced in unsanitary conditions</li>
</ul>

<h2>Health Consequences</h2>
<p>At least 12 consumers required hospitalization after taking products from PharmaExpress:</p>
<ul>
<li>Three cases of acute liver injury from contaminated weight loss pills</li>
<li>Five cases of severe allergic reactions from undeclared ingredients</li>
<li>Four cases of dangerous drug interactions due to undisclosed active ingredients</li>
</ul>

<h2>Operation Details</h2>
<ul>
<li><strong>Server locations:</strong> Moldova and Ukraine</li>
<li><strong>Shipping origin:</strong> India and Pakistan</li>
<li><strong>Payment methods:</strong> Cryptocurrency and Western Union (no credit cards)</li>
<li><strong>Estimated revenue:</strong> EUR 3-5 million annually</li>
<li><strong>Estimated customers:</strong> 15,000+ across Europe</li>
</ul>

<h2>Current Status</h2>
<p>Europol Operation "Pharma Shield" resulted in domain seizures and arrests of three individuals in Moldova. However, new domains continue to appear. Consumers are urged to only purchase medications from pharmacies listed on the official Swissmedic or national pharmacy registries.</p>`,
      categorySlug: "online-scam",
      keywords: "fake pharmacy, counterfeit medication, online pharmacy scam, PharmaExpress, fake drugs, prescription fraud, Swissmedic warning, illegal pharmacy, counterfeit pills, medication scam",
      tags: "pharmacy,health,counterfeit,medication,europe",
      metaTitle: "PharmaExpress: Counterfeit Medication Scam Endangers European Consumers",
      metaDescription: "PharmaExpress sold counterfeit medications to 15,000+ European consumers. Lab tests reveal dangerous contaminants. 12 hospitalizations reported.",
      readingTime: 6,
    },
    {
      title: "SwissLegal Advisors: Fake Law Firm Charges Victims of Scams a Second Time",
      slug: "swisslegal-advisors-fake-law-firm-charges-scam-victims-second-time",
      excerpt: "A fraudulent recovery service posing as a Swiss law firm targeted previous scam victims, promising to recover their lost funds for an upfront fee — a classic 'recovery room' scam.",
      content: `<h2>The Double Victimization Scheme</h2>
<p>SwissLegal Advisors specifically targeted people who had already lost money to investment scams, romance fraud, and cryptocurrency schemes. This type of fraud is known as a "recovery room" scam — arguably one of the cruelest forms of fraud, as it exploits victims at their most vulnerable.</p>

<h2>How Victims Were Found</h2>
<p>The operators obtained lists of previous scam victims through:</p>
<ul>
<li>Dark web purchases of victim databases from other scam operations</li>
<li>Monitoring online fraud forums where victims share their stories</li>
<li>Social media groups for scam victims</li>
<li>Fake "scam reporting" websites designed to collect victim data</li>
</ul>

<h2>The Approach</h2>
<p>Victims received unsolicited calls or emails from individuals claiming to be lawyers at "SwissLegal Advisors, Zurich." They claimed to be:</p>
<ul>
<li>Working with Swiss federal prosecutors on a case involving the victim's scammer</li>
<li>Part of a class action lawsuit that had already frozen the scammer's assets</li>
<li>Appointed by a court to distribute recovered funds to victims</li>
</ul>

<h3>The Fees</h3>
<p>To receive their "recovered funds," victims were asked to pay various fees:</p>
<ul>
<li>"Legal processing fee": CHF 500-1,000</li>
<li>"Court filing fee": CHF 300-800</li>
<li>"International transfer tax": CHF 1,000-3,000</li>
<li>"Anti-money laundering clearance": CHF 500-2,000</li>
</ul>
<p>Each payment was followed by a new required fee, always with the promise that it would be the last one.</p>

<h2>Scale</h2>
<ul>
<li><strong>Known victims:</strong> 60+</li>
<li><strong>Average additional loss:</strong> CHF 3,500</li>
<li><strong>Total estimated take:</strong> CHF 200,000+</li>
<li><strong>Countries targeted:</strong> Switzerland, Germany, Austria, UK</li>
</ul>

<h2>Verification</h2>
<p>No law firm named "SwissLegal Advisors" exists in any Swiss cantonal bar association registry. The claimed Zurich office address belongs to a virtual office provider. Phone numbers trace to VoIP services registered in the Netherlands.</p>

<h2>How to Protect Yourself</h2>
<ul>
<li>Legitimate lawyers never cold-call victims with unsolicited recovery offers</li>
<li>Real legal fees are never paid to receive recovered funds</li>
<li>Verify any law firm through the Swiss Bar Association (SAV/FSA) directory</li>
<li>Report recovery scam attempts to your cantonal police immediately</li>
</ul>`,
      categorySlug: "fraud",
      keywords: "recovery scam, fake lawyer, recovery room scam, advance fee fraud, double victimization, fake law firm, Swiss law scam, scam recovery fraud, legal fraud, fund recovery scam",
      tags: "recovery-scam,legal,advance-fee,double-victim,fraud",
      metaTitle: "SwissLegal Advisors: Fake Law Firm Targets Previous Scam Victims",
      metaDescription: "Recovery room scam: Fake law firm SwissLegal Advisors targets previous scam victims with promises to recover lost funds, stealing CHF 200K+ in fees.",
      readingTime: 5,
    },
    {
      title: "EuroTrade Logistics: Invoice Fraud Ring Targets Small Businesses Across DACH Region",
      slug: "eurotrade-logistics-invoice-fraud-ring-targets-small-businesses-dach",
      excerpt: "A sophisticated invoice fraud operation sent fake invoices to thousands of small businesses in Switzerland, Germany, and Austria for services never rendered, collecting an estimated EUR 1.5 million.",
      content: `<h2>Scheme Description</h2>
<p>EuroTrade Logistics GmbH sent professional-looking invoices to small and medium businesses across the DACH region for supposed "directory listing fees," "domain renewal charges," and "trade register publication costs." The invoices were deliberately designed to mimic legitimate government or industry charges.</p>

<h2>Invoice Tactics</h2>
<p>The fraudulent invoices were crafted with several psychological manipulation techniques:</p>
<ul>
<li><strong>Official appearance:</strong> Used Swiss cross imagery, federal-style formatting, and references to real trade regulations</li>
<li><strong>Small amounts:</strong> Typically CHF 280-890, low enough to avoid scrutiny</li>
<li><strong>Urgency language:</strong> "Payment due within 10 days to avoid listing removal"</li>
<li><strong>Buried disclaimer:</strong> In tiny print, a barely readable note stating this was an "offer" not an invoice — their legal defense</li>
<li><strong>Real company data:</strong> Used actual business names, addresses, and registration numbers obtained from public commercial registers</li>
</ul>

<h2>Scale of Operations</h2>
<ul>
<li><strong>Invoices sent:</strong> Estimated 50,000+ across three countries</li>
<li><strong>Payment rate:</strong> Approximately 8-12% of recipients paid</li>
<li><strong>Average payment:</strong> EUR 380</li>
<li><strong>Total collected:</strong> EUR 1.5 million+</li>
<li><strong>Period:</strong> January 2025 – December 2025</li>
</ul>

<h2>Who Was Targeted</h2>
<p>The operation specifically targeted:</p>
<ul>
<li>Newly registered businesses (within 30 days of commercial register entry)</li>
<li>Solo entrepreneurs and micro-businesses without dedicated accounting staff</li>
<li>Foreign-owned businesses in Switzerland less familiar with local norms</li>
<li>Non-profit organizations and associations</li>
</ul>

<h2>Legal Gray Area</h2>
<p>The operators exploited a legal gray area by including a barely visible disclaimer classifying the invoice as an "offer for services." This made prosecution difficult, as they could claim recipients voluntarily accepted the offer by paying. However, Swiss consumer protection authorities have classified this as deceptive business practice under the UWG (Unfair Competition Act).</p>

<h2>How to Protect Your Business</h2>
<ul>
<li>Never pay invoices for services you didn't order</li>
<li>Cross-reference any invoice against your purchase orders</li>
<li>Be especially vigilant with invoices arriving shortly after business registration</li>
<li>Report suspicious invoices to SECO (State Secretariat for Economic Affairs)</li>
<li>If you've already paid, file a complaint — collective action may enable recovery</li>
</ul>`,
      categorySlug: "business-scam",
      keywords: "invoice fraud, fake invoice, business scam, directory scam, trade register scam, B2B fraud, Swiss business fraud, DACH region scam, small business fraud, commercial register scam",
      tags: "invoice,b2b,business,dach,commercial",
      metaTitle: "EuroTrade Logistics Invoice Fraud: EUR 1.5M Fake Invoices Target DACH Businesses",
      metaDescription: "Invoice fraud ring EuroTrade Logistics sent 50,000+ fake invoices to small businesses in Switzerland, Germany, Austria. EUR 1.5M+ collected through deception.",
      readingTime: 5,
    },
    {
      title: "SafeRent Zurich: Rental Deposit Scam Exploits Housing Crisis",
      slug: "saferent-zurich-rental-deposit-scam-exploits-housing-crisis",
      excerpt: "Scammers exploiting Zurich's tight rental market created fake apartment listings and collected deposits from desperate apartment seekers, disappearing with an estimated CHF 340,000.",
      content: `<h2>Context</h2>
<p>With vacancy rates below 0.5% in Zurich, apartment seekers face extreme competition. Scammers have exploited this desperation by creating fake listings for attractively priced apartments and collecting deposits from multiple applicants simultaneously.</p>

<h2>How the Scam Operated</h2>
<h3>The Listings</h3>
<p>Professional-quality listings were posted on Homegate, ImmoScout24, and Comparis for apartments priced 15-25% below market rate. Photos were stolen from real estate agencies or taken from Airbnb listings. Addresses corresponded to real buildings.</p>

<h3>The Viewing</h3>
<p>In some cases, scammers organized actual viewings by:</p>
<ul>
<li>Renting the apartment through Airbnb for one day</li>
<li>Posing as the current tenant showing the place before moving out</li>
<li>Scheduling viewings when the real owner was away</li>
</ul>
<p>In other cases, viewings were conducted only via pre-recorded video tours.</p>

<h3>The Payment</h3>
<p>Applicants were told the apartment was highly competitive and asked to secure it immediately with:</p>
<ul>
<li>Three months' rent as deposit: CHF 4,500-7,500</li>
<li>First month's rent in advance</li>
<li>Agency fee: CHF 500-1,000</li>
</ul>
<p>Payments were requested to Swiss IBAN accounts (opened with fake or stolen IDs) or via Twint/bank transfer.</p>

<h2>Victim Reports</h2>
<ul>
<li><strong>Known victims:</strong> 45+</li>
<li><strong>Average loss per victim:</strong> CHF 7,500</li>
<li><strong>Total estimated losses:</strong> CHF 340,000</li>
<li><strong>Most targeted areas:</strong> Zurich Kreis 4, 5, and 6; Winterthur; Baden</li>
</ul>

<h2>Red Flags</h2>
<ul>
<li>Price significantly below market rate for the area</li>
<li>Landlord claims to be "abroad" and can't meet in person</li>
<li>Pressure to pay deposit before signing a rental contract</li>
<li>Request to transfer money to a private individual rather than a Mietkautionskonto (rental deposit account)</li>
<li>Apartment listed on rental platforms but not through a recognized agency</li>
</ul>

<h2>Legal Requirements in Switzerland</h2>
<p>Under Swiss tenancy law, rental deposits must be placed in a blocked bank account (Mietkautionskonto/Mietkaution) in the tenant's name. Any landlord asking for deposits to be transferred to their personal account is either uninformed or fraudulent.</p>`,
      categorySlug: "fraud",
      keywords: "rental scam, apartment fraud, Zurich housing scam, deposit fraud, fake apartment listing, Homegate scam, ImmoScout24 fraud, rental deposit theft, Swiss rental market, housing crisis scam",
      tags: "rental,housing,zurich,deposit,real-estate",
      metaTitle: "SafeRent Zurich: Rental Deposit Scam Exploits Swiss Housing Crisis",
      metaDescription: "Scammers exploit Zurich housing crisis with fake apartment listings on Homegate and ImmoScout24. CHF 340K stolen in rental deposit fraud from 45+ victims.",
      readingTime: 5,
    },
    {
      title: "HelvetiaCare Premium: Health Insurance Bait-and-Switch Scam Targets Expats",
      slug: "helvetiacare-premium-health-insurance-bait-switch-scam-targets-expats",
      excerpt: "A fake health insurance broker targeting expats in Switzerland sold worthless policies that didn't comply with KVG requirements, leaving families without coverage during medical emergencies.",
      content: `<h2>Background</h2>
<p>HelvetiaCare Premium operated as an online health insurance broker claiming to offer Swiss mandatory health insurance (KVG/LAMal) at significantly discounted rates. The operation specifically targeted English-speaking expatriates unfamiliar with the Swiss health insurance system.</p>

<h2>The Bait-and-Switch</h2>
<h3>What Was Promised</h3>
<p>The broker advertised compliant Swiss health insurance at 30-50% below standard premiums, claiming special "expat group rates" and "corporate negotiated discounts." Policies were presented as full KVG-compliant coverage with major insurers like CSS, Helsana, and Sanitas.</p>

<h3>What Was Actually Sold</h3>
<p>Instead of KVG-compliant Swiss health insurance, victims received:</p>
<ul>
<li>International travel insurance policies with severe coverage limitations</li>
<li>Policies from offshore insurers not recognized in Switzerland</li>
<li>In some cases, completely fabricated policy documents with no actual coverage</li>
</ul>

<h2>Consequences for Victims</h2>
<p>The impact was severe when victims actually needed medical care:</p>
<ul>
<li>Hospital bills rejected by the supposed insurer</li>
<li>Discovery of non-compliance during cantonal insurance audits</li>
<li>Retroactive fines for not holding valid KVG insurance</li>
<li>Medical debts of CHF 10,000-80,000 for treatments they believed were covered</li>
<li>Some victims forced to leave Switzerland due to accumulated debts</li>
</ul>

<h2>Scale</h2>
<ul>
<li><strong>Estimated victims:</strong> 200+ individuals and families</li>
<li><strong>Premiums collected:</strong> CHF 1.8 million</li>
<li><strong>Period of operation:</strong> 2024-2025</li>
<li><strong>Primary targets:</strong> British, American, and Indian expats in Zurich, Geneva, and Basel</li>
</ul>

<h2>How to Verify Your Insurance</h2>
<ul>
<li>Check that your insurer appears on the BAG/OFSP (Federal Office of Public Health) approved list</li>
<li>Verify your policy directly with the insurance company, not through the broker</li>
<li>KVG-compliant insurance is only available from Swiss-approved Krankenkassen</li>
<li>No legitimate broker can offer premiums significantly below the BAG-published rates</li>
<li>If in doubt, contact your cantonal insurance authority (SVA/Gemeinde)</li>
</ul>`,
      categorySlug: "fraud",
      keywords: "health insurance scam, fake insurance broker, Swiss insurance fraud, expat scam, KVG fraud, Krankenkasse scam, insurance bait switch, expat health insurance, Switzerland expat fraud, fake policy",
      tags: "insurance,health,expat,switzerland,kvg",
      metaTitle: "HelvetiaCare Premium: Fake Insurance Broker Leaves Expats Without Coverage",
      metaDescription: "Fake health insurance broker HelvetiaCare Premium sold worthless policies to 200+ Swiss expats. CHF 1.8M collected. Victims left with massive medical debts.",
      readingTime: 5,
    },
    {
      title: "WinProfitBet: Illegal Gambling Platform Uses Rigged Algorithms",
      slug: "winprofitbet-illegal-gambling-platform-rigged-algorithms",
      excerpt: "An unlicensed online gambling platform operating in Switzerland used manipulated algorithms to ensure players could never win significant amounts, while aggressively marketing 'guaranteed winning strategies.'",
      content: `<h2>Platform Overview</h2>
<p>WinProfitBet advertised itself as a sports betting and online casino platform offering "the best odds in Europe." The platform was accessible to Swiss users despite not holding an ESBK (Swiss Federal Gaming Board) license, operating from servers in Curaçao with a dubious offshore license.</p>

<h2>Rigged Operations</h2>
<h3>Manipulated Odds</h3>
<p>Independent analysis of bet outcomes revealed statistically impossible patterns:</p>
<ul>
<li>House edge on supposedly "fair" games exceeded 25% (legitimate casinos: 1-5%)</li>
<li>Slot machine return-to-player (RTP) was approximately 62% vs. the advertised 96%</li>
<li>Live sports betting odds were adjusted against players in real-time after bets were placed</li>
<li>Wins above EUR 500 triggered "account verification" that resulted in frozen accounts</li>
</ul>

<h3>Predatory Marketing</h3>
<p>The platform used aggressive acquisition and retention tactics:</p>
<ul>
<li>€100 "free" welcome bonus with impossible 60x wagering requirements</li>
<li>Targeted ads on YouTube and Instagram showing fake "big win" moments</li>
<li>"VIP managers" who called players to encourage larger deposits</li>
<li>Emotional manipulation during losing streaks: "Your luck is about to turn!"</li>
</ul>

<h2>Withdrawal Problems</h2>
<p>The most common complaint was inability to withdraw winnings:</p>
<ul>
<li>Withdrawal requests ignored or delayed for months</li>
<li>Arbitrary "bonus abuse" accusations voiding balances</li>
<li>Demands for excessive documentation (10+ documents) before processing</li>
<li>Account closures after winning streaks with remaining balances confiscated</li>
</ul>

<h2>Impact</h2>
<ul>
<li><strong>Swiss users affected:</strong> 2,000+ (estimated from complaint volume)</li>
<li><strong>Total deposits from Swiss users:</strong> EUR 4+ million</li>
<li><strong>Total withdrawals paid:</strong> Less than EUR 400,000</li>
<li><strong>Addiction referrals linked to platform:</strong> 30+ through Swiss addiction services</li>
</ul>

<h2>Legal Status</h2>
<p>ESBK has added the platform's domains to the Swiss gambling blacklist, requiring ISPs to block access. However, the platform continues to operate through mirror domains and VPN access. Criminal proceedings have been initiated through international cooperation channels.</p>`,
      categorySlug: "online-scam",
      keywords: "online gambling scam, rigged casino, illegal betting, ESBK, Swiss gambling, unlicensed casino, sports betting fraud, rigged algorithms, online casino scam, gambling platform fraud",
      tags: "gambling,casino,betting,online,switzerland",
      metaTitle: "WinProfitBet: Rigged Gambling Platform Steals EUR 4M from Swiss Users",
      metaDescription: "Unlicensed gambling platform WinProfitBet used rigged algorithms against 2,000+ Swiss users. EUR 4M deposited, less than 10% ever paid out.",
      readingTime: 6,
    },
    {
      title: "CEO Fraud Wave: Swiss Companies Lose CHF 12 Million to Business Email Compromise",
      slug: "ceo-fraud-wave-swiss-companies-lose-chf-12-million-business-email-compromise",
      excerpt: "A coordinated wave of business email compromise attacks targeted Swiss SMEs in late 2025, with criminals impersonating CEOs and CFOs to authorize fraudulent wire transfers totaling CHF 12 million.",
      content: `<h2>Overview</h2>
<p>Between September and December 2025, Swiss law enforcement recorded a significant spike in Business Email Compromise (BEC) attacks, also known as "CEO fraud." The attacks targeted small and medium enterprises across multiple industries, with a particular focus on manufacturing, trading, and professional services companies.</p>

<h2>Attack Methodology</h2>
<h3>Phase 1: Reconnaissance</h3>
<p>Attackers spent weeks researching target companies through:</p>
<ul>
<li>LinkedIn profiles to identify CEO, CFO, and finance staff</li>
<li>Company websites for organizational structure</li>
<li>Swiss commercial register for shareholder and director information</li>
<li>Annual reports and press releases for business relationships</li>
</ul>

<h3>Phase 2: Email Compromise</h3>
<p>Access was gained through one of two methods:</p>
<ul>
<li><strong>Account takeover:</strong> Phishing emails to C-level executives, gaining access to their actual email accounts</li>
<li><strong>Domain spoofing:</strong> Registering similar domains (e.g., company-ch.com instead of company.ch)</li>
</ul>

<h3>Phase 3: The Fraudulent Request</h3>
<p>Finance department staff received urgent emails appearing to come from the CEO or CFO, requesting immediate wire transfers for:</p>
<ul>
<li>"Confidential acquisition" payments</li>
<li>"Updated supplier bank details" for existing invoices</li>
<li>"Emergency tax payments" to avoid penalties</li>
<li>"Bonus payments" to be processed immediately</li>
</ul>

<h2>Case Examples</h2>
<ul>
<li><strong>Manufacturing company, Aargau:</strong> CHF 2.1 million transferred to a Hong Kong account for a "machine purchase" authorized by a spoofed CEO email</li>
<li><strong>Trading firm, Basel:</strong> CHF 890,000 redirected when criminals changed supplier bank details in a compromised email thread</li>
<li><strong>Law firm, Bern:</strong> CHF 340,000 transferred to a "client trust account" based on a forged partner email</li>
</ul>

<h2>Total Impact (Sept-Dec 2025)</h2>
<ul>
<li><strong>Reported incidents:</strong> 180+</li>
<li><strong>Successful frauds:</strong> 43 confirmed</li>
<li><strong>Total losses:</strong> CHF 12 million</li>
<li><strong>Funds recovered:</strong> Approximately CHF 1.8 million (15%)</li>
<li><strong>Average loss per incident:</strong> CHF 279,000</li>
</ul>

<h2>Prevention Measures</h2>
<ul>
<li>Implement dual-authorization for all wire transfers above a threshold</li>
<li>Verbal confirmation (phone call) for any unusual payment requests, especially those marked "urgent" or "confidential"</li>
<li>Deploy email authentication (DMARC, DKIM, SPF) on company domains</li>
<li>Train all finance staff to recognize BEC red flags</li>
<li>Establish clear procedures for changing supplier bank details (require multiple verification steps)</li>
</ul>`,
      categorySlug: "business-scam",
      keywords: "CEO fraud, business email compromise, BEC, wire transfer fraud, email scam, Swiss company fraud, corporate fraud, impersonation scam, invoice redirect, CFO fraud",
      tags: "bec,ceo-fraud,email,corporate,wire-transfer",
      metaTitle: "CEO Fraud Wave: Swiss SMEs Lose CHF 12M to Business Email Compromise",
      metaDescription: "Coordinated BEC attack wave hits Swiss companies. 43 successful frauds, CHF 12M stolen through impersonated CEO emails. Prevention guide included.",
      readingTime: 6,
    },
    {
      title: "Telegram Investment Groups: How 'Signal Channels' Manipulate Crypto Markets",
      slug: "telegram-investment-groups-signal-channels-manipulate-crypto-markets",
      excerpt: "Fraudulent Telegram channels promising insider crypto trading signals are running coordinated pump-and-dump schemes, enriching operators while group members consistently lose money.",
      content: `<h2>The Scam Model</h2>
<p>Dozens of Telegram channels with names like "Swiss Crypto Elite," "VIP Altcoin Signals," and "Whale Alert Pro" promise subscribers access to "insider trading signals" for cryptocurrency markets. These channels, charging CHF 50-500/month for "VIP access," are actually running coordinated pump-and-dump operations.</p>

<h2>How Pump-and-Dump Works on Telegram</h2>
<ol>
<li><strong>Accumulation:</strong> Channel operators quietly buy large amounts of a low-cap cryptocurrency over several days</li>
<li><strong>The Signal:</strong> A "buy signal" is sent to all subscribers with urgent messaging: "BUY NOW! Target 300% gain!"</li>
<li><strong>The Pump:</strong> Thousands of subscribers buy simultaneously, driving the price up rapidly</li>
<li><strong>The Dump:</strong> Operators sell their pre-purchased tokens at the inflated price</li>
<li><strong>The Crash:</strong> Price collapses as selling pressure overwhelms buying. Subscribers are left holding worthless tokens</li>
</ol>

<h2>Proof of Manipulation</h2>
<p>Blockchain analysis of 50 "signals" from three major channels revealed:</p>
<ul>
<li>In 47 out of 50 cases, operator wallets purchased the token 1-3 days before the signal</li>
<li>Operators sold within 2-15 minutes of sending the buy signal</li>
<li>Average operator profit per signal: EUR 15,000-50,000</li>
<li>Average subscriber loss per signal: 30-60% of invested amount</li>
<li>Only 3 out of 50 signals resulted in any profit for regular subscribers</li>
</ul>

<h2>Subscriber Manipulation Tactics</h2>
<ul>
<li><strong>Fake profit screenshots:</strong> Channels share fabricated trading results showing massive gains</li>
<li><strong>Survivorship bias:</strong> Only winning trades (for operators) are highlighted; losses are deleted or ignored</li>
<li><strong>Urgency and FOMO:</strong> "Only VIP members get this signal. Non-VIPs will miss out!"</li>
<li><strong>"Paper trading" results:</strong> Historical "signals" retroactively posted after the fact</li>
<li><strong>Paid testimonials:</strong> Fake user accounts posting screenshots of supposed profits</li>
</ul>

<h2>Known Channels Under Investigation</h2>
<p>Swiss financial regulators and FINMA are monitoring at least 15 Telegram channels with significant Swiss user bases. Several channel operators have been identified through KYC data from cryptocurrency exchanges where they converted profits to CHF.</p>

<h2>How to Recognize Scam Signal Channels</h2>
<ul>
<li>No legitimate trader needs to sell "signals" — if they could predict the market, they wouldn't need your subscription fee</li>
<li>Guaranteed returns in crypto trading are impossible</li>
<li>Check if the channel only promotes low-cap, easily manipulated tokens</li>
<li>Verify claims by checking if trades were actually profitable for the timing when signals were sent (not when operators bought)</li>
</ul>`,
      categorySlug: "investment-fraud",
      keywords: "pump and dump, Telegram scam, crypto signals, trading signals fraud, cryptocurrency manipulation, Telegram trading group, market manipulation, crypto pump dump, signal channel scam, altcoin scam",
      tags: "telegram,crypto,pump-dump,signals,market-manipulation",
      metaTitle: "Telegram Crypto Signal Channels Exposed: Pump-and-Dump Scheme Analysis",
      metaDescription: "Investigation exposes Telegram crypto signal channels as pump-and-dump schemes. Analysis of 50 signals shows operators profit while subscribers lose 30-60%.",
      readingTime: 6,
    },
    {
      title: "AI Voice Clone Scam: Criminals Use Deepfake Audio to Impersonate Family Members",
      slug: "ai-voice-clone-scam-criminals-deepfake-audio-impersonate-family-members",
      excerpt: "A disturbing new scam trend uses AI-generated voice clones to impersonate family members in emergency calls, convincing victims to transfer thousands of francs to 'help' their loved ones.",
      content: `<h2>The Emerging Threat</h2>
<p>Advances in AI voice synthesis have enabled a terrifying evolution of the classic "grandparent scam." Criminals now use AI tools to clone the voices of family members from as little as 3-5 seconds of audio scraped from social media videos, voicemail greetings, or phone calls.</p>

<h2>How the Scam Works</h2>
<h3>Step 1: Voice Harvesting</h3>
<p>Scammers collect voice samples from:</p>
<ul>
<li>Public Instagram and TikTok videos</li>
<li>YouTube content</li>
<li>Voicemail greetings (obtained by calling the target's number)</li>
<li>Previous phone conversations (if they've called before)</li>
</ul>

<h3>Step 2: Voice Cloning</h3>
<p>Using commercially available AI voice synthesis tools, scammers create a real-time voice model that can speak any text in the cloned voice, complete with emotional inflections like crying, panic, or fear.</p>

<h3>Step 3: The Call</h3>
<p>Victims receive a call that sounds exactly like their child, grandchild, or spouse, claiming:</p>
<ul>
<li>"I've been in a car accident and need money for the hospital"</li>
<li>"I've been arrested abroad and need bail money"</li>
<li>"I'm being held and they want money or they'll hurt me" (virtual kidnapping)</li>
</ul>

<h3>Step 4: The Transfer</h3>
<p>A "police officer" or "lawyer" takes over the call, instructing the victim to transfer money via bank transfer, cryptocurrency, or gift cards. Amounts range from CHF 5,000 to CHF 50,000.</p>

<h2>Documented Cases in Switzerland</h2>
<ul>
<li><strong>Zurich, October 2025:</strong> 73-year-old grandmother transferred CHF 25,000 after hearing her granddaughter's cloned voice crying and begging for help</li>
<li><strong>Bern, November 2025:</strong> Couple transferred CHF 15,000 believing their son was in a hospital after a ski accident</li>
<li><strong>Basel, December 2025:</strong> Business owner sent CHF 45,000 thinking his wife was being held for ransom</li>
</ul>

<h2>How to Protect Yourself</h2>
<ul>
<li><strong>Establish a family code word</strong> that only family members know, to verify identity in emergency calls</li>
<li>If you receive an emergency call, hang up and call the family member back on their known number</li>
<li>Remember: police and hospitals never ask family members to transfer money</li>
<li>Reduce public voice exposure: consider making social media accounts private</li>
<li>Be skeptical of any call demanding immediate financial action under emotional pressure</li>
</ul>

<h2>Reporting</h2>
<p>If you receive a suspected AI voice clone call, report it immediately to your cantonal police and the NCSC (National Cyber Security Centre). Even if you didn't lose money, your report helps track the operators.</p>`,
      categorySlug: "online-scam",
      keywords: "AI voice scam, deepfake audio, voice clone fraud, grandparent scam, virtual kidnapping, AI impersonation, voice synthesis scam, family emergency scam, deepfake voice call, AI fraud",
      tags: "ai,deepfake,voice-clone,impersonation,phone-scam",
      metaTitle: "AI Voice Clone Scam: Deepfake Audio Used to Impersonate Family Members",
      metaDescription: "Criminals use AI voice cloning to impersonate family members in emergency scam calls. Swiss victims lose CHF 5,000-50,000. How to protect yourself.",
      readingTime: 5,
    },
    {
      title: "Suisse Prestige Watches: Counterfeit Luxury Watch Ring Operates on Instagram",
      slug: "suisse-prestige-watches-counterfeit-luxury-watch-ring-instagram",
      excerpt: "An Instagram-based operation selling counterfeit Swiss luxury watches at 'grey market prices' has defrauded hundreds of buyers with high-quality fakes branded as Rolex, Omega, and Patek Philippe.",
      content: `<h2>Operation Overview</h2>
<p>Suisse Prestige Watches operated through multiple Instagram accounts (each with 50,000-200,000 followers, largely bought), presenting itself as a "grey market dealer" selling authentic Swiss luxury watches at 30-50% discounts. The accounts featured professional photography, unboxing videos, and fake customer testimonials.</p>

<h2>Product Quality</h2>
<p>Unlike typical counterfeits, these were high-quality "super clones" that could fool casual inspection:</p>
<ul>
<li>Correct weight (using stainless steel cases with proper finishing)</li>
<li>Functional mechanical movements (Chinese-made, not Swiss)</li>
<li>Accurate dial printing and lume application</li>
<li>Convincing packaging with boxes, papers, and fake warranty cards</li>
<li>Laser-etched serial numbers (all traced to non-existent production batches)</li>
</ul>

<h2>Pricing Strategy</h2>
<p>The operation charged premium prices for counterfeits:</p>
<ul>
<li>"Rolex Submariner": CHF 5,500 (retail: CHF 9,100 | actual value: CHF 200)</li>
<li>"Omega Speedmaster": CHF 3,800 (retail: CHF 6,900 | actual value: CHF 150)</li>
<li>"Patek Philippe Nautilus": CHF 35,000 (retail: CHF 75,000+ | actual value: CHF 500)</li>
</ul>

<h2>Scale</h2>
<ul>
<li><strong>Estimated sales:</strong> 500+ watches over 18 months</li>
<li><strong>Estimated revenue:</strong> CHF 3-5 million</li>
<li><strong>Primary markets:</strong> Switzerland, Germany, UAE, UK</li>
<li><strong>Shipping origin:</strong> China via reshipping services in Germany</li>
</ul>

<h2>How Buyers Discovered the Fraud</h2>
<ul>
<li>Watches brought to authorized service centers were identified as counterfeit</li>
<li>Attempted resale through reputable dealers resulted in authentication failure</li>
<li>Insurance claims rejected when appraisers identified fakes</li>
<li>Some movements failed within weeks, impossible for genuine Swiss movements</li>
</ul>

<h2>Legal Implications for Buyers</h2>
<p>Importantly, buyers should be aware that in Switzerland, knowingly purchasing counterfeit goods can itself carry legal consequences under trademark protection law. Even unknowing buyers may face seizure of the goods by customs.</p>

<h2>How to Buy Safely</h2>
<ul>
<li>Only purchase from authorized dealers or established grey market dealers with verifiable track records</li>
<li>Verify serial numbers directly with the manufacturer</li>
<li>Use authentication services before purchasing pre-owned watches</li>
<li>Be suspicious of any deal that seems too good to be true — especially on social media</li>
<li>Instagram and WhatsApp are not legitimate sales channels for luxury watches</li>
</ul>`,
      categorySlug: "fraud",
      keywords: "counterfeit watches, fake Rolex, luxury watch scam, Instagram fraud, super clone watches, Swiss watch counterfeit, grey market scam, fake luxury goods, watch fraud, Patek Philippe fake",
      tags: "counterfeit,luxury,watches,instagram,trademark",
      metaTitle: "Suisse Prestige Watches: CHF 5M Instagram Counterfeit Luxury Watch Ring",
      metaDescription: "Instagram counterfeit watch operation Suisse Prestige Watches sold 500+ fake Rolex, Omega, Patek Philippe watches for CHF 3-5M. How to spot super clones.",
      readingTime: 5,
    },
  ];

  let created = 0;
  for (const post of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (existing) continue;

    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: "PUBLISHED",
        categoryId: catMap[post.categorySlug],
        tags: post.tags,
        keywords: post.keywords,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        readingTime: post.readingTime,
        authorId: admin.id,
        publishedAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
        viewCount: Math.floor(Math.random() * 8000) + 200,
      },
    });
    created++;
  }

  console.log(`Added ${created} new posts (${posts.length - created} already existed)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
