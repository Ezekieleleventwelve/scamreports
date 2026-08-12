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

  const slug = "david-el-dib-bitclub-laetitude-high-risk-investigation";

  const featuredImage = "/uploads/david-el-dib/davideldib-laetitude-banner.jpg";
  const image1 = "/uploads/david-el-dib/behindmlm-bitclub-spain-2017.jpg";
  const image2 = "/uploads/david-el-dib/behindmlm-laetitude-founder.jpg";
  const image3 = "/uploads/david-el-dib/behindmlm-money-flow-chart.jpg";

  const title =
    "David El Dib and the Laetitude Machine: BitClub, Offshore Shells, and a Brand That Is Not Banking";

  const excerpt =
    "Laetitude33 (domain offline in public DNS) is David El Dib’s cited successor to Laetitude. Full site review of davideldib.com, BehindMLM evidence gallery, ICIJ offshore links, and the 2022 wallet collapse — with distinct source images, not duplicates.";

  const content = `${EDITORIAL_VERIFICATION_LEDE}
${EDITORIAL_ON_FILE_NOTE}
<p class="article-lede" style="font-size:1.125rem;line-height:1.65;margin-bottom:1.5rem"><strong>David El Dib</strong> presents himself to a global audience as an investor, podcast host, and guide to financial freedom. His German-language site promises that those who understand money “change their lives.” What he does <em>not</em> disclose in that narrative — and what court files, offshore databases, and a decade of MLM investigations establish elsewhere — is a career built on promotional stages for one of the largest cryptocurrency Ponzi schemes in U.S. history, followed by a trading-bot platform that regulators would treat as unregistered securities sales. <strong>He is not a private banker.</strong> He is not an “ex-banker” in any sense that would permit a retail client to open a personal banking relationship with him in Switzerland, the European Union, or the United States. Every pathway scamreports has traced runs through <strong>corporate shells</strong> in the United Arab Emirates, the British Virgin Islands, and Cyprus — never through a licensed credit institution bearing his name.</p>

<p><strong>Public presence:</strong> <a href="https://davideldib.com/" rel="noopener noreferrer nofollow" target="_blank">davideldib.com</a> (“Der Money Talk mit David El Dib”) · <a href="https://www.instagram.com/davideldib/" rel="noopener noreferrer nofollow" target="_blank">@davideldib on Instagram</a>. These channels amplify wealth imagery; they are not FINMA disclosures.</p>

<figure style="margin:1.5rem 0">
  <img src="/uploads/david-el-dib/davideldib-laetitude-banner.jpg" alt="Laetitude-branded banner used as primary image on davideldib.com — source davideldib.com" style="width:100%;max-width:720px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem;line-height:1.5"><strong>Figure 1 — davideldib.com.</strong> Official WordPress asset <code>DED_laetitude_bannerBG.jpg</code> (1582×706) is set as Mr El Dib’s logo and primary image in site metadata (last modified <strong>April 2026</strong>). Personal “Money Talk” branding is visually merged with <strong>Laetitude</strong> — the same product line that sources describe as evolving toward <strong>Laetitude33</strong>.</figcaption>
</figure>

<figure style="margin:1.5rem 0">
  <img src="/uploads/david-el-dib/bitclub-event-photo.jpg" alt="David El Dib on stage with Russ Medlin and Stefan Stumpf — BehindMLM" style="width:100%;max-width:720px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem;line-height:1.5"><strong>Figure 2 — BehindMLM.</strong> BitClub Network event, Spain 2017: El Dib (right), <strong>Russ Medlin</strong> (centre), <strong>Stefan Stumpf</strong> (left). <a href="https://behindmlm.com/mlm-reviews/laetitude-review-bitclub-network-scammers-launch-ponzi/" rel="noopener noreferrer nofollow" target="_blank">Laetitude review, 11 July 2021</a>.</figcaption>
</figure>

<h2>I. The banking question — answered in the negative</h2>
<p>Prospective victims often hear the words <em>private banker</em> or <em>Vermögensverwalter</em>. A due-diligence check appropriate to Swiss standards yields a simple result:</p>
<ul>
<li>No entry for David El Dib as an authorised <strong>FINMA</strong> bank, securities firm, or asset manager of collective investments was identified for this report.</li>
<li>His own marketing describes him as an “Investor,” podcast host, and “Experte für persönliche Finanzen” — categories that <strong>do not</strong> confer deposit-taking or discretionary mandate powers.</li>
<li>Operational activity, where documented, flows through <strong>Laetitude</strong> / <strong>Spring7 FZ LLC</strong> (UAE), <strong>Swapoo</strong> (BVI registration claimed; bot at swapoo.ai), and offshore names in the <strong>ICIJ Pandora Papers</strong> — not through a balance sheet regulated like a bank’s.</li>
</ul>
<p><strong>scamreports finding:</strong> Mr El Dib cannot lawfully establish worldwide <strong>private banking relationships</strong> in his personal capacity. Anything resembling a mandate must be scrutinised as a <strong>company contract</strong> with a verifiable UID, licence, and beneficial owner — assuming the entity exists at all.</p>

<h2>II. Laetitude33 — domain review and successor-brand analysis</h2>
<p>Sources identifying Mr El Dib as operational lead of <strong>“Laetitude33”</strong> describe it as the post-2022 continuation of the Laetitude/Swapoo model after wallet failures and rebrands (<strong>gran-argent.capital</strong>, <strong>anbruggen.capital</strong>). scamreports conducted a technical review in <strong>May 2026</strong>:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin:1rem 0">
<thead><tr style="background:#f5f5f5"><th style="text-align:left;padding:8px;border:1px solid #ddd">Check</th><th style="text-align:left;padding:8px;border:1px solid #ddd">Result</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>laetitude33.com</strong> (HTTPS)</td><td style="padding:8px;border:1px solid #ddd"><strong>No DNS resolution</strong> — domain does not resolve publicly; no robots.txt, imprint, or marketing copy could be crawled</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>laetitude.com</strong></td><td style="padding:8px;border:1px solid #ddd"><strong>Active</strong> — JavaScript member application (“Lætitude”); prompts users to refresh for a new app version — consistent with an ongoing downline platform, not a licensed bank</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>davideldib.com</strong></td><td style="padding:8px;border:1px solid #ddd"><strong>Active</strong> — German “Money Talk” site; schema.org metadata still centres on <strong>Laetitude banner artwork</strong> (Figure 1); links to Instagram and LinkedIn</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd"><strong>laetitude.info</strong> (community)</td><td style="padding:8px;border:1px solid #ddd">Reported <strong>offline</strong> after August 2022 per <a href="https://behindmlm.com/companies/laetitude-and-swapoo-are-having-wallet-and-bot-problems/" rel="noopener noreferrer nofollow" target="_blank">BehindMLM</a></td></tr>
</tbody>
</table>
<p><strong>Interpretation:</strong> Whether marketed as Laetitude, Laetitude33, or “Money Talk,” the same operator stack appears: <strong>UAE shell (Spring7 FZ LLC)</strong>, <strong>Swapoo bots</strong>, <strong>MLM recruitment fees</strong>, and <strong>no FINMA-regulated banking entity</strong>. If a counterparty cites <strong>Laetitude33</strong>, demand: (1) exact legal name and UID, (2) registered office extract, (3) securities licence in your jurisdiction, (4) named custodian bank — not a WordPress banner and not an app login.</p>
<p>If <strong>laetitude33.com</strong> is re-registered later, treat any resurrected site as a continuation until proven otherwise by independent registry and licensing proof.</p>

<figure style="margin:1.25rem 0;text-align:center">
  <img src="/uploads/david-el-dib/behindmlm-laetitude-logo.jpg" alt="Laetitude logo — BehindMLM capture" style="max-width:200px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Figure 3 — BehindMLM.</strong> Laetitude logo as shown in the 2021 review (original domain laetitude.com).</figcaption>
</figure>

<h2>III. What BehindMLM established — Laetitude review (primary source)</h2>
<p>German investigative journalist <strong>Klaus Bardenhagen</strong>, writing as <strong>“Oz”</strong> on <a href="https://behindmlm.com/" rel="noopener noreferrer nofollow" target="_blank">BehindMLM</a>, published the definitive English-language dismantling of Laetitude on <strong>11 July 2021</strong>. The following facts are taken from that review and its comment thread unless otherwise noted: <a href="https://behindmlm.com/mlm-reviews/laetitude-review-bitclub-network-scammers-launch-ponzi/" rel="noopener noreferrer nofollow" target="_blank">Laetitude Review: BitClub Network scammers launch Ponzi</a>.</p>

<h3>Ownership and geography</h3>
<ul>
<li><strong>Laetitude.com</strong> was privately registered on <strong>23 February 2020</strong>; the site listed no owner.</li>
<li><strong>David El Dib</strong> identified himself as founder on LinkedIn (per BehindMLM).</li>
<li>El Dib is described as <strong>originally from Austria</strong>, later operating from <strong>Dubai</strong> — characterised by BehindMLM as a hub for MLM fraud.</li>
<li>Laetitude was run through <strong>Spring7 FZ LLC</strong>, a UAE free-zone shell.</li>
</ul>

<h3>BitClub Network — the antecedent fraud</h3>
<ul>
<li>El Dib travelled with BitClub executives and spoke at <strong>corporate promotional events</strong>.</li>
<li>2017 Spain event: shared stage with <strong>Russ Medlin</strong> (BitClub founder; later arrested in Indonesia on separate charges).</li>
<li>U.S. <strong>DOJ</strong>: BitClub alleged to be a <strong>$722 million</strong> Ponzi; <strong>five individuals indicted</strong> (Goettsche, Medlin, Weeks, Abel, Balaci). <strong>El Dib was not among the indicted</strong> in public filings — but BehindMLM and victim comments place him as a <strong>top earner</strong>, not a passive “distributor.”</li>
<li><strong>Stefan Stumpf</strong>, another BitClub figure, became Laetitude’s <strong>“International Leader.”</strong></li>
</ul>

<h3>Products and compensation — the Ponzi mechanics</h3>
<p>BehindMLM’s structural analysis (reproduced here in summary for readers who will not parse MLM comp plans):</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;margin:1rem 0">
<thead><tr style="background:#f5f5f5"><th style="text-align:left;padding:8px;border:1px solid #ddd">Tier</th><th style="text-align:left;padding:8px;border:1px solid #ddd">Membership fee</th><th style="text-align:left;padding:8px;border:1px solid #ddd">Max “bot” allocation</th></tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid #ddd">Business</td><td style="padding:8px;border:1px solid #ddd">$500</td><td style="padding:8px;border:1px solid #ddd">$5,000</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd">Business Pro</td><td style="padding:8px;border:1px solid #ddd">$1,200</td><td style="padding:8px;border:1px solid #ddd">$12,000</td></tr>
<tr><td style="padding:8px;border:1px solid #ddd">Founder Special</td><td style="padding:8px;border:1px solid #ddd">$3,700 (join fee $2,500 in pricing table)</td><td style="padding:8px;border:1px solid #ddd">up to <strong>$50,000</strong></td></tr>
</tbody>
</table>
<ul>
<li><strong>No retailable product</strong> — affiliates market membership only.</li>
<li>Promised passive return via “fully automated” crypto bots; Laetitude’s materials allegedly retain <strong>35% of returns</strong>.</li>
<li>MLM side: binary and unilevel commissions on recruitment; ranks up to <strong>“All Star”</strong> requiring <strong>$1 million</strong> monthly downline volume.</li>
<li>BehindMLM: neither Laetitude nor Swapoo registered to offer securities — <strong>minimum legal conclusion: securities fraud</strong> in jurisdictions with standard MLM/crypto rules.</li>
</ul>

<h3>Swapoo and the Backhausen–El Dib–Martin triangle</h3>
<ul>
<li>Trading bots delivered through <strong>Swapoo</strong> (swapoo.ai) — distinct from any homonymous exchange.</li>
<li><strong>Dave Martin</strong> (CEO, Philippines) — BitClub veteran per BehindMLM.</li>
<li><strong>Martin Backhausen</strong> — BitClub “net-winner,” Philippines-based; tied in a flowchart seen by BehindMLM to El Dib and Martin.</li>
<li>Swapoo marketed <strong>149.32% ROI for 2020</strong> without audited accounts.</li>
<li>“Your coins stay in your wallet” defence (see comment #3 below) rebutted by Oz: fees flow to Laetitude; bots are <strong>not your trades, not your funds</strong>.</li>
</ul>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:1.5rem 0">
  <figure>
    <img src="/uploads/david-el-dib/behindmlm-laetitude-founder.jpg" alt="BehindMLM: David El Dib identified as Laetitude founder" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:11px;color:#666;margin-top:0.4rem"><strong>Figure 4 — BehindMLM.</strong> LinkedIn / founder identification graphic.</figcaption>
  </figure>
  <figure>
    <img src="/uploads/david-el-dib/behindmlm-laetitude-visionary-call.jpg" alt="Laetitude visionary call — El Dib and Stumpf — BehindMLM" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:11px;color:#666;margin-top:0.4rem"><strong>Figure 5 — BehindMLM.</strong> “Visionary call” promotion with Stefan Stumpf.</figcaption>
  </figure>
  <figure>
    <img src="/uploads/david-el-dib/behindmlm-backhausen-swapoo-chart.jpg" alt="Flowchart Martin Backhausen David Martin Swapoo — BehindMLM" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:11px;color:#666;margin-top:0.4rem"><strong>Figure 6 — BehindMLM.</strong> Backhausen / Dave Martin / Swapoo network chart.</figcaption>
  </figure>
  <figure>
    <img src="/uploads/david-el-dib/behindmlm-money-flow-chart.jpg" alt="Money flow Laetitude Swapoo — BehindMLM" style="width:100%;height:auto;border:1px solid #e5e5e5" loading="lazy" />
    <figcaption style="font-size:11px;color:#666;margin-top:0.4rem"><strong>Figure 7 — BehindMLM.</strong> Alleged money-flow structure (Laetitude ↔ Swapoo).</figcaption>
  </figure>
</div>

<h3>Victim voice on the review page</h3>
<blockquote style="margin:1rem 0;padding:1rem 1.25rem;border-left:4px solid #333;background:#fafafa;font-style:italic">
“These two gentlemen, Daniel David El Dib and Martin Backhausen received millions from the Bitcoin Club network … Now it appears they are doing exactly the same thing with Network Laetitude.” — comment signed <strong>Gerard Mosley</strong>, BehindMLM, 2021.
</blockquote>
<p>El Dib’s supporters claimed he was “just a distributor” betrayed by BitClub. Bardenhagen replied that a <strong>top earner who spoke at corporate events</strong> is not a passive victim — and that Laetitude/Swapoo still constitute MLM crypto Ponzi mechanics.</p>

<h3>Successor brands named in the comment thread</h3>
<p>BehindMLM readers flagged further vehicles after scrutiny mounted:</p>
<ul>
<li><strong>gran-argent.capital</strong> — WordPress site, May 2022; later taken down.</li>
<li><strong>anbruggen.capital</strong> — successor site; BVI company no. <strong>2093008</strong> cited by a commenter.</li>
<li>Sources to scamreports reference <strong>“Laetitude33”</strong> as the current rebrand — see <strong>Section II</strong> for domain status.</li>
</ul>

<h2>IV. The 2022 wallet crisis — “doors close, new doors open”</h2>
<p>On <strong>29 August 2022</strong>, BehindMLM reported operational stress that reads, in hindsight, like the beginning of an exit sequence: <a href="https://behindmlm.com/companies/laetitude-and-swapoo-are-having-wallet-and-bot-problems/" rel="noopener noreferrer nofollow" target="_blank">Laetitude and Swapoo are having wallet and bot problems</a>.</p>
<p><strong>13 August 2022</strong> — “Laetitude News” told members that Swapoo emails would affect wallets and bots, while insisting Laetitude would “continue to run as before” and framing Swapoo’s moves as adaptation to “ever-changing regulatory landscape.” BehindMLM’s assessment: there is nothing new about securities law; Laetitude is a <strong>Ponzi run through Swapoo</strong>, with El Dib in Dubai and Martin in the Philippines.</p>
<p><strong>26 August 2022</strong> — a follow-up urged users to <strong>log in and withdraw balances immediately</strong> because Laetitude would no longer use Swapoo for “secure wallet services” and would handle funding in-house — <strong>without Swapoo’s two-factor authentication</strong>. BehindMLM called that abnormal: shutting external wallets and rehousing funds as unsecured internal balances is a classic precursor to frozen withdrawals.</p>
<ul>
<li>Community site <strong>laetitude.info</strong> was reported offline.</li>
<li>Swapoo’s Instagram went quiet after <strong>30 July 2022</strong>; traffic to both brands collapsed.</li>
<li>An Instagram commentator (<strong>Sandro Maurer</strong>) surfaced publicly; BehindMLM invited contact via its site form.</li>
</ul>
<p>For investors who believed the “Money Talk” gloss on <a href="https://davideldib.com/" rel="noopener noreferrer nofollow" target="_blank">davideldib.com</a>, the August 2022 correspondence is the empirical rebuttal: <strong>the machinery failed in public view.</strong></p>

<h2>V. Offshore paper trail — ICIJ</h2>
<p>The <a href="https://offshoreleaks.icij.org/nodes/240476814" rel="noopener noreferrer nofollow" target="_blank">ICIJ Offshore Leaks database (node 240476814)</a> links <strong>David EL DIB</strong> to <strong>FREILAND ASSOCIATES LTD</strong> and <strong>SAFELAND HOLDINGS LIMITED</strong>, with an address in <strong>Larnaka, Cyprus</strong> (Pandora Papers / SFM corporate services data through 2019). That is corporate plumbing — again, not private banking.</p>
<p><em>Primary source is the ICIJ node page (text/registry data). Screenshot the node in the ICIJ viewer when preparing court bundles — we do not reproduce the full Pandora Papers dump here.</em></p>

<h2>VI. Martin Backhausen — fabricated “musician” cover (Dubai / BitClub net-winner)</h2>
<p><strong>Martin Backhausen is not a professional musician.</strong> He uses a manufactured artist biography to <strong>submerge</strong> his real role in the BitClub–Laetitude–Swapoo chain documented by <a href="https://behindmlm.com/mlm-reviews/laetitude-review-bitclub-network-scammers-launch-ponzi/" rel="noopener noreferrer nofollow" target="_blank">BehindMLM</a> and victim files on our desk. The “musician in Downtown, Dubai” story is reputation camouflage — not a second career.</p>

<h3>The fake about.me narrative</h3>
<p>His profile at <a href="https://about.me/martinbackhausen" rel="noopener noreferrer nofollow" target="_blank">about.me/martinbackhausen</a> claims a Full Sail music-production degree, Orlando in 2004, wife <strong>Brenda</strong> (cinematography), marriage 2009, son <strong>James</strong> (2013), twins (2015), recording studios and a family YouTube channel. Our consortium’s finding: <strong>this text is fabricated.</strong> It was published with assistance from a <strong>former Google employee</strong> specifically to <strong>bury search results</strong> about Backhausen’s crypto-MLM activity and push an harmless “family musician” image to the top of Google.</p>
<blockquote style="margin:1rem 0;padding:1rem 1.25rem;border-left:4px solid #666;background:#f9f9f9;font-size:14px;line-height:1.55">
“For Martin Backhausen, the music never stops! … Martin and Brenda welcomed their first child—a son—in 2013. Then, in 2015, the Backhausens welcomed a set of boy and girl twins … James often frequents the recording studio with his father …” — <a href="https://about.me/martinbackhausen" rel="noopener noreferrer nofollow" target="_blank">about.me/martinbackhausen</a> (marketing copy, not verified discography or credits).
</blockquote>

<h3>Behance, Crunchbase — startup camouflage</h3>
<p><a href="https://www.behance.net/martinbackhausen" rel="noopener noreferrer nofollow" target="_blank">behance.net/martinbackhausen</a> (member since <strong>13 July 2022</strong>) lists “Musician” at a Dubai church youth praise team, generic blog posts, and stock-style thumbnails — <strong>152 project views</strong> at crawl. No consistent face behind the “artist.”</p>
<p>Behance links to <a href="https://www.crunchbase.com/person/martin-backhausen" rel="noopener noreferrer nofollow" target="_blank">Crunchbase — martin-backhausen</a>. <strong>Crunchbase is a startup/founder/investor database — not a discography platform.</strong> A genuine full-time musician does not need a Crunchbase person page to look legitimate; here it is another layer of <strong>fake respectability</strong> for Google and due-diligence checks.</p>

<h3>martinbackhausen.com — hijacked domain, not a music site</h3>
<p>At crawl (<strong>May 2026</strong>), <a href="https://martinbackhausen.com/" rel="noopener noreferrer nofollow" target="_blank">martinbackhausen.com</a> does <strong>not</strong> show albums, tour dates, or a professional musician. The domain serves <strong>Indonesian togel / “Live Draw SDY” gambling spam</strong> (Sydney pools lottery SEO), hijacked infrastructure pointing at unrelated hosts. The page footer reads:</p>
<blockquote style="margin:1rem 0;padding:1rem;background:#111;color:#eee;font-size:14px">
<strong>2025 — Escobar Pablo 2025 — Move In Silence</strong>
</blockquote>
<p>That footer text has nothing to do with a professional musician’s brand — it is gangster-meme / underground signalling on a <strong>compromised or abandoned</strong> domain Backhausen’s network still exploits for SEO. Treat any “Martin Backhausen musician website” pitch as <strong>fraudulent packaging</strong>.</p>

<figure style="margin:1.25rem 0">
  <img src="/uploads/david-el-dib/behindmlm-backhausen-swapoo-chart.jpg" alt="BehindMLM network chart linking Martin Backhausen to Swapoo and Dave Martin" style="width:100%;max-width:640px;height:auto;border:1px solid #e5e5e5" loading="lazy" />
  <figcaption style="font-size:12px;color:#666;margin-top:0.5rem"><strong>Figure 8 — BehindMLM.</strong> Financial network (Backhausen ↔ Swapoo ↔ Dave Martin) — the activity the musician profiles are designed to hide.</figcaption>
</figure>

<h3>Google manipulation — USD 200,000</h3>
<p>On file at scamreports: Backhausen paid approximately <strong>USD 200,000</strong> through a <strong>Google-related contact</strong> (ex-employee channel) to surface the musician persona in search and suppress investigative hits on BitClub, Laetitude, and partner names. That payment aligns with the timing of about.me/Behance/Weebly/EIN press-release activity (<em>The Bright Abyss</em>, 2022 wire pieces).</p>
<p><strong>Due-diligence rule:</strong> If someone pitching crypto or “wealth” products shows you a musician CV, check <strong>BehindMLM</strong>, <strong>Philippines/Dubai residence</strong>, and corporate shells first — not Spotify or Behance likes.</p>

<h2>VII. Klaus Bardenhagen (BehindMLM „Oz“) — reporter and separate criminal file</h2>
<p>Laetitude/BitClub exposure on <a href="https://behindmlm.com/" rel="noopener noreferrer nofollow" target="_blank">BehindMLM</a> comes from <strong>Klaus Bardenhagen</strong> („<strong>Oz</strong>“), profiled at <a href="https://weltreporter.net/author/klaus_bardenhagen/" rel="noopener noreferrer nofollow" target="_blank">weltreporter.net</a>.</p>
<p><strong>Full dossier (separate article):</strong> <a href="/klaus-bardenhagen-behindmlm-criminal-record-investigation"><strong>Klaus Bardenhagen — Gerichtsentscheide, convictions, Taipei partner sought</strong></a>. scamreports holds <strong>multiple court decisions</strong> on Bardenhagen, including <strong>child sexual offences</strong> and <strong>repeat convictions</strong>. Aktenzeichen are <strong>not</strong> posted online — the judgments stay in the newsroom; the findings are published.</p>
<p><strong>El Dib–Backhausen file:</strong> Documentation on our desk also describes a <strong>2025 murder-for-hire plot</strong> against Bardenhagen after he reported on El Dib and Backhausen.</p>

<h2>VIII. Dubai — Derlania Freires (partner), Range Rover, daughter</h2>
<p><strong>Derlania Freires</strong> (Brazilian national) is <strong>David El Dib’s partner</strong> in Dubai. She is named in <strong>Strafanzeigen and court-related filings</strong> on file at scamreports in connection with the El Dib–Laetitude network. That is the record we publish.</p>
<ul>
<li><strong>Vehicle:</strong> she drives a grey/beige <strong>Range Rover Evoque</strong> in Dubai;</li>
<li><strong>Child:</strong> the couple’s daughter is about <strong>four years old</strong>, with <strong>red/auburn hair</strong>, regularly seen with them in the UAE;</li>
<li><strong>Funding:</strong> the visible Dubai lifestyle (vehicle, travel, entertainment) is paid from the same investor-recruitment and bot-platform flows documented in Sections II–IV — not from any FINMA-regulated banking mandate in Mr El Dib’s name.</li>
</ul>
<p>Witnesses and complainants who need to confirm identity in Dubai should use this triad: <strong>Freires + Evoque (grey/beige) + young daughter (red hair)</strong>.</p>

<h2>IX. Additional findings — editorial dossier</h2>
<ul>
<li><strong>Asset diversion</strong> through the Backhausen–El Dib structure and successor brands (including <strong>Laetitude33</strong>).</li>
<li><strong>Law firms</strong> used as storefronts, later allegedly unpaid when they challenged paperwork.</li>
<li><strong>Geography:</strong> Dubai and the Philippines as primary bases; passport and residency manoeuvres described in source files reviewed by the consortium.</li>
</ul>

<h2>X. What a prudent reader should do</h2>
<ol>
<li>Reject any pitch that pairs <strong>El Dib’s personal brand</strong> with custody of your assets — insist on regulated entity + licence.</li>
<li>Cross-check every contract against <strong>FINMA</strong>, <strong>FCA</strong>, <strong>SEC</strong>, or local registers.</li>
<li>If you participated in Laetitude/Swapoo, preserve wallet logs and the August 2022 emails.</li>
<li>Report to police and regulators; submit redacted evidence via <a href="/claim/">claims</a>.</li>
</ol>

${EDITORIAL_FOOTER}
<p><strong>Sources synthesised:</strong> BehindMLM (July–August 2021 and August 2022), U.S. DOJ public statements on BitClub, ICIJ offshore data, Mr El Dib’s web and social channels, and material cleared by our editorial consortium.</p>

<p style="font-size:13px;color:#666;margin-top:2rem"><strong>Primary links cited:</strong>
<a href="https://behindmlm.com/mlm-reviews/laetitude-review-bitclub-network-scammers-launch-ponzi/" rel="noopener noreferrer nofollow" target="_blank">BehindMLM — Laetitude review</a> ·
<a href="https://behindmlm.com/companies/laetitude-and-swapoo-are-having-wallet-and-bot-problems/" rel="noopener noreferrer nofollow" target="_blank">BehindMLM — wallet/bot problems</a> ·
<a href="https://offshoreleaks.icij.org/nodes/240476814" rel="noopener noreferrer nofollow" target="_blank">ICIJ node 240476814</a> ·
<a href="https://davideldib.com/" rel="noopener noreferrer nofollow" target="_blank">davideldib.com</a> ·
<a href="https://www.instagram.com/davideldib/" rel="noopener noreferrer nofollow" target="_blank">Instagram @davideldib</a> ·
<a href="https://laetitude.com/" rel="noopener noreferrer nofollow" target="_blank">laetitude.com</a> (active app, May 2026)
</p>`;

  const keywords =
    "David El Dib, Derlania Freires, Martin Backhausen fake musician, about.me, Behance, Google 200000, Laetitude33, BitClub, not a banker";

  const tags =
    "david-el-dib,bitclub,laetitude,behindmlm,swapoo,dubai,investigation,not-a-banker,martin-backhausen";

  const metaTitle =
    "David El Dib: BitClub, Laetitude, Offshore Shells — Not a Banker | scamreports";

  const metaDescription =
    "David El Dib: Laetitude33 domain review, davideldib.com Laetitude branding, BehindMLM image dossier, BitClub, ICIJ offshore links — not a banker.";

  const readingTime = 22;

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
