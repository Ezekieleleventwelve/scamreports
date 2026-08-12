/**
 * Static warning list — no database required for public pages.
 * Edit here; optional: `npx tsx prisma/seed-warnlist.ts` to sync claims/admin.
 */

export type WarnlistCaseStatus = "open" | "civil" | "criminal" | "regulatory" | "closed";

export type WarnlistCase = {
  id: string;
  title: string;
  description?: string;
  status?: WarnlistCaseStatus;
  year?: number;
  jurisdiction?: string;
  reportSlug?: string;
};

export type WarnlistEntry = {
  slug: string;
  type: "PERSON" | "COMPANY";
  name: string;
  aliases?: string;
  /** Named operators / beneficial owners when identified on file */
  principals?: string;
  websites?: string;
  country?: string;
  location?: string;
  /** Street or full postal address when on file */
  address?: string;
  /** Swiss UID (CHE-xxx.xxx.xxx) — links to ZEFIX / UID register */
  uid?: string;
  summary: string;
  sourceLabel?: string;
  sourceUrl?: string;
  /** Public video evidence (Streamable, YouTube, etc.) */
  videoUrl?: string;
  reportSlug?: string;
  amountOwed?: number;
  amountOwedCurrency?: string;
  imageUrl?: string;
  listedAt: string;
  cases: WarnlistCase[];
  /** Other warnlist slugs shown as cross-links on the profile */
  relatedSlugs?: string[];
};

import { INTERPOL_RED_NOTICE_ENTRIES } from "./warnlist-interpol-red-notices";

const FINMA_URL = "https://www.finma.ch/en/finma-public/warnungen/warning-list/";

/** Publicly named figures in the EU Parliament “Qatargate” cash-for-influence probe (press / court record). */
const QATARGATE_CLUSTER = [
  "eva-kaili",
  "pier-antonio-panzeri",
  "francesco-giorgi",
  "andrea-cozzolino",
  "marc-tarabella",
  "niccolo-figa-talamanca",
  "maria-arena",
  "alexandros-kailis",
] as const;

function qatargateLinks(self: (typeof QATARGATE_CLUSTER)[number]): string[] {
  return QATARGATE_CLUSTER.filter((s) => s !== self);
}

const CORE_WARNLIST_ENTRIES: WarnlistEntry[] = [
{
    slug: "immostich-sa",
    type: "COMPANY",
    name: "IMMOSTICH SA",
    principals: "Not named in FINMA warning (May 2026) — operator unidentified on public record",
    websites: "immostich-sa.ch",
    country: "Switzerland",
    location: "La Chaux-de-Fonds",
    summary:
      "FINMA warning (23 May 2026): suspected unauthorised asset management and family-office services via immostich-sa.ch. No natural person named in the regulator’s publication.",
    sourceLabel: "FINMA warning list",
    sourceUrl: FINMA_URL,
    listedAt: "2026-05-23",
    cases: [
      {
        id: "immostich-finma-2026",
        title: "FINMA warning — unauthorised financial services",
        status: "regulatory",
        year: 2026,
        jurisdiction: "Switzerland",
      },
      {
        id: "immostich-website-review",
        title: "scamreports website review — fake family office claims",
        status: "open",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
{
    slug: "ruetli-finanz-holding-ag",
    type: "COMPANY",
    name: "Rütli Finanz Holding AG",
    principals: "Not named in FINMA warning (May 2026) — operator unidentified on public record",
    websites: "ruetli-holding.com",
    country: "Switzerland",
    location: "Hergiswil NW",
    summary:
      "FINMA warning (23 May 2026): suspected unauthorised financial-market activity; marketing site often offline. No natural person named in the regulator’s publication.",
    sourceLabel: "FINMA warning list",
    sourceUrl: FINMA_URL,
    listedAt: "2026-05-23",
    cases: [
      {
        id: "ruetli-finma-2026",
        title: "FINMA warning — Rütli Finanz Holding AG",
        status: "regulatory",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
{
    slug: "alpenstark-bank",
    type: "COMPANY",
    name: "AlpenStark Bank",
    imageUrl: "/uploads/alpenstark-bank/alpenstark-homepage-en.png",
    principals: "Not named in FINMA warning (May 2026) — clone site operator unidentified",
    aliases: "AlpenStark",
    websites: "alpenstark.com/en/, alpenstark.com, alpenstark.online",
    country: "Switzerland",
    location: "Carouge GE",
    summary:
      "FINMA warning (23 May 2026). Clone digital/crypto bank at alpenstark.com/en — no FINMA banking licence. No natural person named in the regulator’s publication.",
    sourceLabel: "FINMA warning list",
    sourceUrl: FINMA_URL,
    listedAt: "2026-05-28",
    cases: [
      {
        id: "alpenstark-finma-2026",
        title: "FINMA warning — AlpenStark Bank",
        status: "regulatory",
        year: 2026,
        jurisdiction: "Switzerland",
      },
      {
        id: "alpenstark-website-clone",
        title: "Fake digital banking website (alpenstark.com / .online)",
        status: "open",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
{
    slug: "finosio",
    type: "COMPANY",
    name: "Finosio",
    principals: "Not named in FINMA warning (May 2026) — clone neobank operator unidentified",
    websites: "finosio.com",
    summary:
      "FINMA warning (23 May 2026): French clone neobank with false ECB/ACPR claims — not authorised in Switzerland. No natural person named in the regulator’s publication.",
    sourceLabel: "FINMA warning list",
    sourceUrl: FINMA_URL,
    listedAt: "2026-05-23",
    cases: [
      {
        id: "finosio-finma-2026",
        title: "FINMA warning — Finosio / finosio.com",
        status: "regulatory",
        year: 2026,
      },
    ],
  },
{
    slug: "eisenberg-bank-ag",
    type: "COMPANY",
    name: "Eisenberg Bank AG",
    principals: "Not named in FINMA warning (May 2026) — clone bank operator unidentified",
    websites: "eisenbergbank.com",
    country: "Switzerland",
    location: "Zürich (claimed Prime Tower)",
    summary:
      "FINMA warning (22 May 2026): fake Festgeld up to 8.6% p.a., false FINMA-supervision claims. No natural person named in the regulator’s publication.",
    sourceLabel: "FINMA warning list",
    sourceUrl: FINMA_URL,
    listedAt: "2026-05-22",
    cases: [
      {
        id: "eisenberg-finma-2026",
        title: "FINMA warning — Eisenberg Bank AG",
        status: "regulatory",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
{
    slug: "enis-kaiser",
    type: "PERSON",
    name: "Enis Kaiser",
    location: "Zürich",
    country: "Switzerland",
    summary: "Investment fraud — Zürich. Documented creditor claim on file.",
    amountOwed: 85000,
    amountOwedCurrency: "EUR",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "ek-investment-fraud",
        title: "Investment fraud — creditor claim EUR 85,000",
        status: "civil",
        jurisdiction: "Kanton Zürich",
        year: 2026,
      },
    ],
  },
{
    slug: "enzo-caputo",
    type: "PERSON",
    name: "Enzo Caputo",
    aliases:
      "Caputo & Partners AG, swiss-banking-lawyers.com, Talstrasse 20 8001 Zürich, Dario Berta",
    imageUrl: "/uploads/enzo-caputo/enzo-caputo.jpg",
    location: "Zürich",
    country: "Switzerland",
    summary:
      "Zürich-based attorney / Caputo & Partners AG (public profile: swiss-banking-lawyers.com). Editorial file alleges active promotion of money-laundering schemes (“wash money for foreigners”) and large-scale embezzlement involving high seven-/eight-figure amounts. Linked on file to Dario Berta. Additional allegation on file: past heroin consumption and association with Fredy Müller (Kaufleuten Zürich).",
    sourceLabel: "Public profile + editorial file",
    sourceUrl: "https://swiss-banking-lawyers.com/",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "ec-ml-promotion",
        title: "Money laundering promotion — “wash money” recruitment alleged",
        status: "open",
        jurisdiction: "Switzerland",
        year: 2026,
      },
      {
        id: "ec-embezzlement-millions",
        title: "Embezzlement — high-value sums alleged",
        status: "open",
        jurisdiction: "Switzerland",
      },
      {
        id: "ec-berta-link",
        title: "Linked network — Dario Berta",
        status: "open",
        jurisdiction: "Zürich, Switzerland",
      },
      {
        id: "ec-heroin-kaufleuten",
        title: "Past heroin use allegation — linked to Fredy Müller (Kaufleuten Zürich)",
        status: "open",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
    ],
  },
{
    slug: "dario-berta",
    type: "PERSON",
    name: "Dario Berta",
    aliases:
      "Matanel, Matanel Ltd, Zürich, Tiefenbrunnen, Bellevue, Enzo Caputo, Pluto (dog), London, Georgia, Türkiye, Dubai",
    imageUrl: "/uploads/dario-berta/dario-berta.png",
    address: "Zürich lakeside — Tiefenbrunnen area (on file)",
    sourceUrl:
      "https://www.youtube.com/watch?v=ALsK-2L6KCw",
    location: "Zürich (Tiefenbrunnen / lakeside); traces Georgia, Türkiye, Dubai, London",
    country: "Switzerland",
    websites: "Matanel (on file); Matanel Ltd — London (closed, on file)",
    amountOwed: 300000,
    amountOwedCurrency: "CHF",
    summary:
      "Zürich-based operator linked in editorial files to Enzo Caputo and the Matanel name. Matanel Ltd (London) reported closed on file; multiple traces alleged to Georgia (euro exchange), Türkiye, Dubai, and Zürich. Editorial files allege client losses in the millions, money-laundering facilitation, embezzlement, and fraud targeting wealthy individuals. Associated damage on file: CHF 300,000. Resides in the greater Zürich lakeside / Tiefenbrunnen area; dog named Pluto (identifier on file). Severe cocaine consumption alleged. Strong counterparty warning — do not engage in business or private dealings; verify counsel and escrow before any contact.",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "db-caputo-link",
        title: "Linked to Enzo Caputo — editorial file",
        status: "open",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
      {
        id: "db-matanel-london",
        title: "Matanel Ltd — London entity closed (on file)",
        status: "closed",
        jurisdiction: "London, United Kingdom",
        year: 2026,
      },
      {
        id: "db-georgia-euro-exchange",
        title: "Georgia — euro exchange traces alleged (on file)",
        status: "open",
        jurisdiction: "Georgia",
        year: 2026,
      },
      {
        id: "db-ml-facilitation",
        title: "Money laundering facilitation — recruitment alleged",
        status: "open",
        jurisdiction: "Switzerland",
      },
      {
        id: "db-embezzlement-millions",
        title: "Client losses — millions stolen alleged (on file)",
        status: "open",
        jurisdiction: "Switzerland / international",
        year: 2026,
      },
      {
        id: "db-creditor-chf-300k",
        title: "Associated damage — CHF 300,000 (on file)",
        status: "civil",
        jurisdiction: "Switzerland",
        year: 2026,
      },
      {
        id: "db-wealthy-victims",
        title: "Fraud targeting wealthy individuals — London / Asia / Switzerland alleged",
        status: "open",
        jurisdiction: "London / Dubai / Türkiye / Switzerland",
        year: 2026,
      },
      {
        id: "db-cocaine-use",
        title: "Cocaine use allegation — severe consumption (on file)",
        status: "open",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
      {
        id: "db-avoid-business",
        title: "Counterparty warning — no business or private dealings (editorial)",
        status: "open",
        jurisdiction: "International",
        year: 2026,
      },
    ],
  },
{
    slug: "yoursky",
    type: "COMPANY",
    name: "YOUR SKY",
    imageUrl: "/uploads/yoursky/yoursky-forbes-jonny.jpg",
    aliases: "YourSky, private jet charter, aircraft sales, yoursky.com",
    websites: "yoursky.com",
    location: "Dubai (claimed) / global",
    country: "United Arab Emirates",
    principals:
      "Jonny (Johnny) Dodge — CEO / founder (per public company site); Oliver Clarke — senior charter broker (per public company site)",
    summary:
      "Private jet charter and aircraft sales brand (yoursky.com). Editorial files allege customer intimidation, verbal and physical threats, multiple non-performance events, non-payment, and misuse of client funds; linked to Jonny Dodge and Oliver Clarke.",
    sourceLabel: "Company site",
    sourceUrl: "https://yoursky.com/",
    reportSlug:
      "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "ys-customer-extortion",
        title: "Customer extortion / intimidation alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "ys-client-funds",
        title: "Misappropriation of client funds alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "ys-turkish-clients",
        title: "Turkish customers — non-payment / client losses alleged",
        status: "open",
        jurisdiction: "Turkey / international",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "ys-non-performance",
        title: "Multiple charter non-performance events alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "ys-physical-threats",
        title: "Verbal and physical threats towards clients alleged",
        status: "criminal",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
    ],
  },
{
    slug: "jonny-dodge",
    type: "PERSON",
    name: "Jonny Dodge",
    imageUrl: "/uploads/jonny-dodge/jonny-dodge.jpg",
    aliases: "Johnny Dodge, YOUR SKY, yoursky.com",
    location: "Dubai (claimed) / international",
    country: "United Arab Emirates",
    websites: "yoursky.com",
    summary:
      "CEO / founder of YOUR SKY (yoursky.com). Editorial files allege extortion of customers, verbal and physical threats, abnormal/aggressive conduct, multiple non-performance events, non-payment, misappropriation of customer funds, and fraud. High-risk profile; avoid sending funds without verified escrow and counsel.",
    sourceLabel: "Company site + editorial file",
    sourceUrl: "https://yoursky.com/team/jonny-dodge/",
    reportSlug:
      "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "jd-extortion",
        title: "Extortion / threats towards customers alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "jd-misappropriation",
        title: "Misappropriation of customer funds alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "jd-fraud",
        title: "Fraud / non-payment alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "jd-physical-threats",
        title: "Verbal and physical intimidation alleged",
        status: "criminal",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "jd-non-performance",
        title: "Charter non-performance — multiple matters alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
    ],
  },
{
    slug: "oliver-clarke",
    type: "PERSON",
    name: "Oliver Clarke",
    imageUrl: "/uploads/oliver-clarke/oliver-clarke.jpg",
    aliases: "Oliver Clark, YOUR SKY, yoursky.com",
    location: "International (YOUR SKY UK expansion per company profile)",
    country: "United Kingdom",
    websites: "yoursky.com",
    summary:
      "YOUR SKY senior jet charter advisor / senior charter broker (per public company profile). Editorial file alleges customer non-payment, verbal and physical threats, multiple non-performance events, and client fund loss including Turkish customers. Reported loss amount GBP 50,000 on file.",
    amountOwed: 50000,
    amountOwedCurrency: "GBP",
    sourceLabel: "Company site + editorial file",
    sourceUrl: "https://yoursky.com/team/oliver-clarke/",
    reportSlug:
      "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "oc-yoursky-role",
        title: "YOUR SKY — senior charter broker (public company profile)",
        status: "open",
        jurisdiction: "United Kingdom / UAE",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "oc-gbp-50k",
        title: "Reported client loss — GBP 50,000",
        status: "civil",
        jurisdiction: "United Kingdom / international",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "oc-turkish-clients",
        title: "Turkish customers — non-payment / client losses alleged",
        status: "open",
        jurisdiction: "Turkey / international",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "oc-non-performance",
        title: "Charter non-performance — multiple matters alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
      {
        id: "oc-physical-threats",
        title: "Verbal and physical intimidation alleged",
        status: "criminal",
        jurisdiction: "International",
        year: 2026,
        reportSlug:
          "yoursky-johnny-dodge-oliver-clarke-aviation-threats-non-performance",
      },
    ],
  },
{
    slug: "swiss-capital-club",
    type: "COMPANY",
    name: "Swiss Capital Club",
    imageUrl: "/uploads/swiss-capital-club/homepage-hero.jpg",
    principals:
      "Oliwia Kraft & Alexander Maximilian Kraft (operating couple — president & vice-president per impressum; joint face of the club)",
    aliases: "Verein (Art. 60 OR), swiss-capital-club.com",
    websites: "swiss-capital-club.com",
    location: "Zürich",
    address: "Bahnhofquai 11, 8001 Zürich",
    country: "Switzerland",
    summary:
      "Zurich “investor network” run as a couple (Oliwia & Alexander Kraft). Documented complaints: CHF 48,000 upfront “investor introduction” fee, dossier requested before NDA, unverified 2,500-investor claims. Check ZEFIX / impressum for current signatories — association, not a FINMA-licensed placement agent.",
    amountOwed: 48000,
    amountOwedCurrency: "CHF",
    reportSlug: "swiss-capital-club-investment-network-scam-warning",
    listedAt: "2026-05-01",
    cases: [
      {
        id: "scc-investigation",
        title: "scamreports investigation — Swiss Capital Club network",
        status: "open",
        reportSlug: "swiss-capital-club-investment-network-scam-warning",
      },
      {
        id: "scc-fee-48k",
        title: "Advance fee — CHF 48,000 investor introduction (reported)",
        status: "civil",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
      {
        id: "scc-kraft-couple",
        title: "Oliwia Kraft & Alexander Kraft — joint operators (website impressum)",
        status: "open",
        jurisdiction: "Zürich",
        reportSlug: "swiss-capital-club-investment-network-scam-warning",
      },
    ],
  },
{
    slug: "oliwia-kraft",
    type: "PERSON",
    name: "Oliwia Kraft",
    aliases: "Swiss Capital Club, Alexander Maximilian Kraft (partner / co-operator)",
    imageUrl: "/uploads/swiss-capital-club/oliwia-kraft.jpg",
    location: "Zürich",
    address: "Bahnhofquai 11, 8001 Zürich (Swiss Capital Club impressum)",
    country: "Switzerland",
    summary:
      "President and co-founder of Swiss Capital Club — operates jointly with partner Alexander Kraft. Alleged CHF 48,000 upfront investor-introduction fees. Verify board/signatory status via ZEFIX (Verein) and impressum; no verified FINMA placement licence on file.",
    amountOwed: 48000,
    amountOwedCurrency: "CHF",
    reportSlug: "swiss-capital-club-investment-network-scam-warning",
    listedAt: "2026-05-01",
    cases: [
      {
        id: "ok-scc-president",
        title: "Swiss Capital Club — president (impressum)",
        status: "open",
        jurisdiction: "Zürich",
        reportSlug: "swiss-capital-club-investment-network-scam-warning",
      },
      {
        id: "ok-kraft-couple",
        title: "Joint operation with Alexander Kraft — Swiss Capital Club",
        status: "open",
        reportSlug: "swiss-capital-club-investment-network-scam-warning",
      },
    ],
  },
{
    slug: "alexander-kraft",
    type: "PERSON",
    name: "Alexander Maximilian Kraft",
    aliases: "Alexander Kraft, Swiss Capital Club, Oliwia Kraft (partner / co-operator)",
    imageUrl: "/uploads/swiss-capital-club/alexander-kraft.jpg",
    location: "Zürich",
    address: "Bahnhofquai 11, 8001 Zürich (Swiss Capital Club impressum)",
    country: "Switzerland",
    summary:
      "Vice-president and co-founder of Swiss Capital Club — operates jointly with partner Oliwia Kraft. Alleged CHF 48,000 upfront fees and misleading “attorney” page on website without bar registration. Couple presents as single outreach unit in victim files.",
    amountOwed: 48000,
    amountOwedCurrency: "CHF",
    reportSlug: "swiss-capital-club-investment-network-scam-warning",
    listedAt: "2026-05-01",
    cases: [
      {
        id: "ak-scc-vice-president",
        title: "Swiss Capital Club — vice-president (impressum)",
        status: "open",
        jurisdiction: "Zürich",
        reportSlug: "swiss-capital-club-investment-network-scam-warning",
      },
      {
        id: "ak-kraft-couple",
        title: "Joint operation with Oliwia Kraft — Swiss Capital Club",
        status: "open",
        reportSlug: "swiss-capital-club-investment-network-scam-warning",
      },
    ],
  },
{
    slug: "jonathan-wolpe",
    type: "PERSON",
    name: "Jonathan Wolpe",
    imageUrl: "/uploads/jonathan-wolpe/jonathan-wolpe-united-aviation-hangar.png",
    aliases: "United Aviation Group",
    country: "South Africa",
    summary:
      "Serial fraudster in private aviation — ~150 open cases on file, UAG hangar seizure, DRC contract fraud, Hawks arrest.",
    reportSlug: "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure",
    listedAt: "2026-04-15",
    cases: [
      {
        id: "jw-drc-election-2023",
        title: "DRC presidential elections helicopter contract — forged payments",
        description: "ZAS Aviation contract; fake proof-of-payment; pilots held in Kinshasa.",
        status: "criminal",
        year: 2023,
        jurisdiction: "DRC / South Africa",
        reportSlug: "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure",
      },
      {
        id: "jw-hawks-2024",
        title: "Hawks arrest — fraud (~R9 million DRC-related loss)",
        status: "criminal",
        year: 2024,
        jurisdiction: "South Africa",
        reportSlug: "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure",
      },
      {
        id: "jw-lanseria-hangar",
        title: "Lanseria hangar — sheriff attachment (UAG)",
        status: "civil",
        year: 2024,
        jurisdiction: "South Africa",
        reportSlug: "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure",
      },
      {
        id: "jw-ufs-creditors",
        title: "United Flight Support — multi-currency creditor claims",
        description: "Reported ~USD 259k and ~EUR 53k in industry filings.",
        status: "civil",
        jurisdiction: "South Africa",
        reportSlug: "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure",
      },
      {
        id: "jw-arrow-avia",
        title: "Arrow Avia (UAE) — alleged USD 250k unpaid",
        status: "open",
        jurisdiction: "UAE",
        reportSlug: "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure",
      },
      {
        id: "jw-kzn-civil",
        title: "KwaZulu-Natal civil fraud — ~R3.1 million",
        status: "civil",
        jurisdiction: "South Africa",
        reportSlug: "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure",
      },
      {
        id: "jw-sacaa-complaints",
        title: "SACAA complaints — aviation conduct",
        status: "regulatory",
        jurisdiction: "South Africa",
      },
      {
        id: "jw-open-cases-portfolio",
        title: "Consolidated creditor file — ~150 open matters",
        description: "Civil, criminal referrals, and cross-border defaults (on file with editors).",
        status: "open",
        reportSlug: "jonathan-wolpe-united-aviation-group-south-africa-fraud-hangar-seizure",
      },
    ],
  },
{
    slug: "dr-charles-huang",
    type: "PERSON",
    name: "Dr. Charles Huang",
    aliases: "Innova Medical Group",
    imageUrl: "/uploads/dr-charles-huang/charles-huang.png",
    summary:
      "Innova COVID contracts, Pasaca Capital links, human-smuggling allegations — court and regulatory files on record.",
    reportSlug: "dr-charles-huang-innova-covid-contracts-human-smuggling-investigation",
    listedAt: "2026-04-10",
    cases: [
      {
        id: "huang-innova-contracts",
        title: "UK COVID testing contracts — Innova / Pasaca",
        status: "open",
        reportSlug: "dr-charles-huang-innova-covid-contracts-human-smuggling-investigation",
      },
      {
        id: "huang-smuggling-file",
        title: "Human-smuggling allegations — consortium file",
        status: "open",
        reportSlug: "dr-charles-huang-innova-covid-contracts-human-smuggling-investigation",
      },
    ],
  },
{
    slug: "david-el-dib",
    type: "PERSON",
    name: "David El Dib",
    aliases: "BitClub, Laetitude, Martin Backhausen, Russ Medlin",
    imageUrl: "/uploads/david-el-dib/david-el-dib.jpg",
    location: "Dubai",
    country: "United Arab Emirates",
    summary:
      "BitClub and Laetitude-linked investment fraud — Dubai-based promoter per investigative files. Named accomplices: Martin Backhausen, Russ Medlin (BitClub). scamreports investigation on file.",
    reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
    listedAt: "2026-03-20",
    cases: [
      {
        id: "eldib-bitclub",
        title: "BitClub network exposure",
        status: "open",
        reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
      },
      {
        id: "eldib-laetitude",
        title: "Laetitude — high-risk investment promotion",
        status: "open",
        reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
      },
      {
        id: "eldib-backhausen-medlin",
        title: "Linked network — Martin Backhausen & Russ Medlin",
        status: "open",
        reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
      },
    ],
  },
{
    slug: "martin-backhausen",
    type: "PERSON",
    name: "Martin Backhausen",
    aliases:
      "about.me/martinbackhausen, David El Dib, Russ Medlin, BitClub, Laetitude, Swapoo, fake musician persona",
    imageUrl: "/uploads/david-el-dib/behindmlm-backhausen-swapoo-chart.jpg",
    location: "Dubai / Philippines",
    country: "United Arab Emirates",
    websites: "about.me/martinbackhausen, martinbackhausen.com",
    summary:
      "Investment fraud and Anlagebetrug — BitClub net-winner, Philippines/Dubai footprint. Alleged forged public “musician” profiles (about.me, Behance) to suppress search visibility on crypto-MLM activity. Accomplices on file: David El Dib, Russ Medlin. Creditor claim EUR 980,000.",
    amountOwed: 980000,
    amountOwedCurrency: "EUR",
    reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "mb-creditor-claim",
        title: "Creditor claim — EUR 980,000",
        status: "civil",
        jurisdiction: "EU / Dubai–Philippines network",
        year: 2026,
      },
      {
        id: "mb-investment-fraud",
        title: "Investment fraud / Anlagebetrug — BitClub–Laetitude chain",
        status: "criminal",
        reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
      },
      {
        id: "mb-fake-profile",
        title: "Forged public profile — musician cover (SEO manipulation alleged)",
        status: "open",
        reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
      },
      {
        id: "mb-accomplices",
        title: "Named accomplices — David El Dib, Russ Medlin",
        status: "open",
        reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
      },
    ],
  },
{
    slug: "russ-medlin",
    type: "PERSON",
    name: "Russ Medlin",
    aliases: "BitClub Network founder, David El Dib, Martin Backhausen",
    imageUrl: "/uploads/russ-medlin/russ-medlin.jpg",
    summary:
      "BitClub Network founder — named in U.S. DOJ indictment narrative; linked in investigative files to David El Dib and Martin Backhausen (2017 Spain event, Laetitude successor chain). Private person; verify role via court filings and BehindMLM documentation.",
    reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "rm-bitclub-founder",
        title: "BitClub Network — founder (DOJ public narrative)",
        status: "criminal",
        jurisdiction: "United States / international",
      },
      {
        id: "rm-el-dib-backhausen",
        title: "Linked to El Dib & Backhausen network — editorial file",
        status: "open",
        reportSlug: "david-el-dib-bitclub-laetitude-high-risk-investigation",
      },
    ],
  },
{
    slug: "thomas-wyss",
    type: "PERSON",
    name: "Thomas Wyss",
    aliases:
      "Rechtsanwalt, lic. iur., thomaswyss.ch, Haftpflicht- und Versicherungsrecht, CAS IRP-HSG, Seefeld, Bellevue",
    websites: "thomaswyss.ch, www.thomaswyss.ch",
    imageUrl: "/uploads/thomas-wyss/thomas-wyss.jpg",
    location: "Zürich — Seefeld / Bellevue",
    address: "Holbeinstrasse 34, 8008 Zürich",
    country: "Switzerland",
    summary:
      "Zürich attorney (liability & insurance law) — editorial file alleges fraudulent billing of hours (Stundenaufwand), forgery (Fälschung), embezzlement (Veruntreuung), and corruption (Korruption). Solo practice since 2017; public site thomaswyss.ch.",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "tw-billing-fraud",
        title: "Fraudulent billing — Stundenaufwand / fee inflation alleged",
        status: "civil",
        jurisdiction: "Kanton Zürich",
        year: 2026,
      },
      {
        id: "tw-forgery",
        title: "Forgery — Fälschung (documents / records alleged)",
        status: "criminal",
        jurisdiction: "Switzerland",
      },
      {
        id: "tw-embezzlement",
        title: "Embezzlement — Veruntreuung alleged",
        status: "criminal",
        jurisdiction: "Kanton Zürich",
      },
      {
        id: "tw-corruption",
        title: "Corruption — Korruption alleged",
        status: "criminal",
        jurisdiction: "Switzerland",
      },
    ],
  },
{
    slug: "christoph-grunder",
    type: "PERSON",
    name: "Christoph Grunder",
    aliases:
      "Chrisoph Grunder, Christopher Grunder, christophergrunder-offiziel.ch, Zürich Bellevue, financial fraud, ex-wife death file",
    websites: "christophergrunder-offiziel.ch",
    sourceUrl: "https://christophergrunder-offiziel.ch/",
    imageUrl: "/uploads/christoph-grunder/christoph-grunder-portrait.png",
    location: "Zürich — Bellevue",
    country: "Switzerland",
    summary:
      "Financial fraud and fraud allegations — Zürich Bellevue footprint. Self-published site christophergrunder-offiziel.ch (currently offline) — archived editorial file cites its content. Entangled in circumstances surrounding ex-wife’s death; multiple open matters not resolved. Open debt CHF 100,000 on file.",
    amountOwed: 100000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "cg-creditor-debt",
        title: "Open debt — CHF 100,000",
        status: "civil",
        jurisdiction: "Kanton Zürich",
        year: 2026,
      },
      {
        id: "cg-financial-fraud",
        title: "Financial fraud — Finanzbetrug alleged",
        status: "criminal",
        jurisdiction: "Switzerland",
      },
      {
        id: "cg-offiziel-site",
        title: "christophergrunder-offiziel.ch — self-published site (offline; cited in file)",
        status: "open",
        jurisdiction: "Switzerland",
        year: 2026,
      },
      {
        id: "cg-ex-wife-death",
        title: "Ex-wife’s death — named in open file (unresolved)",
        status: "open",
        jurisdiction: "Kanton Zürich",
      },
      {
        id: "cg-open-cases",
        title: "Open cases — not clarified on public record",
        status: "open",
        jurisdiction: "Switzerland",
      },
    ],
  },
{
    slug: "klaus-bardenhagen",
    type: "PERSON",
    name: "Klaus Bardenhagen",
    imageUrl: "/uploads/klaus-bardenhagen/bardenhagen-weltreporter-taipeh.jpg",
    aliases: "WELTREPORTER",
    country: "Germany",
    summary:
      "BehindMLM and criminal-record documentation — WELTREPORTER-linked investment promotion.",
    reportSlug: "klaus-bardenhagen-behindmlm-criminal-record-investigation",
    listedAt: "2026-03-15",
    cases: [
      {
        id: "bardenhagen-behindmlm",
        title: "BehindMLM / WELTREPORTER — editorial investigation",
        status: "open",
        reportSlug: "klaus-bardenhagen-behindmlm-criminal-record-investigation",
      },
    ],
  },
{
    slug: "wendel-vieira-gomez",
    type: "PERSON",
    name: "Wendel Vieira Gomez",
    aliases: "Wendel Vieira Gomes, Vision Fly.X",
    country: "Switzerland",
    location: "Ticino / Campione d'Italia",
    summary:
      "Serial fraudster allegations in Ticino aviation; pilot licence under official question (BAZL/FOCA file).",
    amountOwed: 20000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-03-01",
    cases: [
      {
        id: "wvg-bazl-passenger",
        title: "BAZL/FOCA — unlawful passenger flights (Ticino)",
        description: "Official aviation documentation on file; non-airworthy aircraft alleged.",
        status: "regulatory",
        jurisdiction: "Switzerland",
      },
      {
        id: "wvg-chf-20k",
        title: "Company formation — CHF 20,000 development damage",
        status: "civil",
        year: 2026,
        jurisdiction: "Ticino",
      },
      {
        id: "wvg-vision-flyx",
        title: "Associazione Vision Fly.X — president (UID CHE-146.836.297)",
        status: "open",
        jurisdiction: "Ticino",
      },
      {
        id: "wvg-tax-complaints",
        title: "Undeclared work / income — private complaints",
        status: "open",
        jurisdiction: "Switzerland / Italy",
      },
    ],
  },
{
    slug: "david-isaak-gayle",
    type: "PERSON",
    name: "David Isaak Gayle",
    aliases: "Isaak Gayle, David Gayle",
    imageUrl: "/uploads/finanzliga/operator-gold-cloak.png",
    location: "Zürich",
    country: "Switzerland",
    summary:
      "Investment fraud allegations; Finanzliga M. CH GmbH (Co-CEO per finanzliga.com). Documented creditor claims on file.",
    reportSlug: "finanzliga-switzerland-credit-introduction-warning",
    amountOwed: 30000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-27",
    cases: [
      {
        id: "dig-creditor-claim",
        title: "Creditor claim — CHF 30,000",
        status: "civil",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
      {
        id: "dig-finanzliga",
        title: "Finanzliga M. CH GmbH — Co-CEO role",
        status: "open",
        jurisdiction: "Zug / Zürich, Switzerland",
        reportSlug: "finanzliga-switzerland-credit-introduction-warning",
      },
    ],
  },
{
    slug: "philipp-shehade",
    type: "PERSON",
    name: "Philipp Shehade",
    location: "Stäfa, Kanton Zürich",
    country: "Switzerland",
    summary: "Documented creditor claims on file — residence Stäfa (ZH).",
    amountOwed: 12000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-27",
    cases: [
      {
        id: "ps-creditor-claim",
        title: "Creditor claim — CHF 12,000",
        status: "civil",
        jurisdiction: "Stäfa, Switzerland",
        year: 2026,
      },
    ],
  },
{
    slug: "domenico-pascali",
    type: "PERSON",
    name: "Domenico Pascali",
    imageUrl: "/uploads/pridomus/domenico-pascali.jpg",
    aliases: "Pridomus AG",
    location: "Zürich-Wipkingen",
    country: "Switzerland",
    summary:
      "Documented creditor claims linked to Pridomus AG — residence Zürich-Wipkingen.",
    amountOwed: 400000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-27",
    cases: [
      {
        id: "dp-creditor-claim",
        title: "Creditor claim — CHF 400,000 (person)",
        status: "civil",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
      {
        id: "dp-pridomus-link",
        title: "Pridomus AG — linked company entry",
        status: "open",
        jurisdiction: "Zürich, Switzerland",
      },
    ],
  },
{
    slug: "pridomus-ag",
    type: "COMPANY",
    name: "Pridomus AG",
    uid: "CHE-115.852.432",
    principals:
      "Domenico Pascali (Delegierter des Verwaltungsrates, sole signature per SHAB); Hugo Buff; Peter Ueli Jäggi (board/management per register); Eugenio Pascali (Baugenossenschaft ferrum, linked)",
    aliases: "pridomus facility management GmbH (CHE-114.319.856), Re Commit AG (former name)",
    location: "Zürich",
    address: "Bachmattstrasse 53, 8048 Zürich",
    country: "Switzerland",
    websites: "pridomus.ch",
    reportSlug: "pridomus-ag-domenico-pascali-tenant-warning",
    summary:
      "Zurich property group — ZEFIX UID CHE-115.852.432. Domenico Pascali: delegated board member with sole signing authority (SHAB). Creditor claims and editorial criminal-file references on file. Verify current Verwaltungsrat / signatories on ZEFIX before any mandate.",
    amountOwed: 400000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-27",
    cases: [
      {
        id: "pridomus-creditor-claim",
        title: "Creditor claim — CHF 400,000",
        status: "civil",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
    ],
  },
{
    slug: "bianca-caprozio",
    type: "PERSON",
    name: "Bianca Caprozio",
    location: "Cape Town",
    country: "South Africa",
    summary:
      "Allegations: corruption, false private investigation, paid actor — documented creditor claim.",
    amountOwed: 150000,
    amountOwedCurrency: "USD",
    listedAt: "2026-05-27",
    cases: [
      {
        id: "bc-corruption",
        title: "Corruption & false private investigation allegations",
        status: "open",
        jurisdiction: "South Africa",
      },
      {
        id: "bc-creditor-claim",
        title: "Creditor claim — USD 150,000",
        status: "civil",
        jurisdiction: "Cape Town, South Africa",
        year: 2026,
      },
    ],
  },
{
    slug: "marco-cuk",
    type: "PERSON",
    name: "Marco Cuk",
    location: "Zürich",
    country: "Switzerland",
    summary: "Documented creditor claims on file — residence Zürich.",
    amountOwed: 5000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-27",
    cases: [
      {
        id: "mc-creditor-claim",
        title: "Creditor claim — CHF 5,000",
        status: "civil",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
    ],
  },
{
    slug: "guy-besson",
    type: "PERSON",
    name: "Guy Besson",
    location: "Thurgau",
    country: "Switzerland",
    summary:
      "Residence Thurgau, Switzerland — credit indebtedness and investment embezzlement allegations; documented creditor claim on file.",
    amountOwed: 50000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "gb-credit-debt",
        title: "Credit indebtedness — CHF 50,000 claim",
        status: "civil",
        jurisdiction: "Thurgau, Switzerland",
        year: 2026,
      },
      {
        id: "gb-embezzlement",
        title: "Investment embezzlement allegations",
        status: "open",
        jurisdiction: "Thurgau, Switzerland",
      },
    ],
  },
{
    slug: "jacob-podolsky",
    type: "PERSON",
    name: "Jacob Podolsky",
    location: "Brooklyn, New York",
    country: "United States",
    summary: "Investment fraud — documented creditor claim, Brooklyn NY.",
    amountOwed: 12800,
    amountOwedCurrency: "USD",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "jp-creditor-claim",
        title: "Creditor claim — USD 12,800",
        status: "civil",
        jurisdiction: "Brooklyn, New York, USA",
        year: 2026,
      },
    ],
  },
{
    slug: "harald-hojer",
    type: "PERSON",
    name: "Harald Hojer",
    aliases: "Parent company (Muttergesellschaft, name on file)",
    location: "Bamberg",
    country: "Germany",
    summary:
      "Investment fraud, network marketing, MLM, and investment-fraud allegations — Bamberg, Germany. Linked parent company on file.",
    amountOwed: 45000,
    amountOwedCurrency: "EUR",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "hh-mlm-fraud",
        title: "MLM / network marketing — investment fraud",
        status: "open",
        jurisdiction: "Bamberg, Germany",
      },
      {
        id: "hh-creditor-claim",
        title: "Creditor claim — EUR 45,000",
        status: "civil",
        jurisdiction: "Germany",
        year: 2026,
      },
      {
        id: "hh-accomplice-gajek",
        title: "Named accomplice — Christian Gajek",
        status: "open",
      },
      {
        id: "hh-accomplice-anishofer",
        title: "Named accomplice — Alois Anishofer",
        status: "open",
      },
    ],
  },
{
    slug: "mischa-voelin",
    type: "PERSON",
    name: "Mischa Voelin",
    aliases: "Mischa Voélin, Finanzliga M. CH GmbH",
    imageUrl: "/uploads/finanzliga/operator-voelin-couple.png",
    location: "Switzerland",
    country: "Switzerland",
    summary:
      "Investment fraud — registered managing director of Finanzliga M. CH GmbH, Zug. Named accomplice: David Isaak Gayle.",
    reportSlug: "finanzliga-switzerland-credit-introduction-warning",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "mv-finanzliga-md",
        title: "Finanzliga M. CH GmbH — managing director (UID CHE-452.421.291)",
        status: "regulatory",
        jurisdiction: "Zug, Switzerland",
        reportSlug: "finanzliga-switzerland-credit-introduction-warning",
      },
      {
        id: "mv-accomplice-gayle",
        title: "Named accomplice — David Isaak / David Gayle",
        status: "open",
        reportSlug: "finanzliga-switzerland-credit-introduction-warning",
      },
    ],
  },
{
    slug: "finanzliga-m-ch-gmbh",
    type: "COMPANY",
    name: "Finanzliga M. CH GmbH",
    uid: "CHE-452.421.291",
    principals:
      "Mischa Voélin (sole shareholder & Geschäftsführer with individual signing authority, Zug); Isaak Gayle / David Isaak Gayle (Co-CEO per website only — not in SHAB as director); linked: Harald Hojer, Christian Gajek, Alois Anishofer",
    aliases: "Finanzliga, finanzliga.com",
    imageUrl: "/uploads/finanzliga/logo.png",
    location: "Baarerstrasse 112, 6300 Zug",
    address: "c/o Immobörse GmbH, Baarerstrasse 112, 6300 Zug",
    country: "Switzerland",
    websites: "finanzliga.com",
    summary:
      "Investment fraud / advance-fee warnings — credit introductions, upfront fees. Register shows Voélin as sole signatory; website names Gayle as Co-CEO. Separate warnlist entries for linked persons.",
    reportSlug: "finanzliga-switzerland-credit-introduction-warning",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "fl-finma-gap",
        title: "FINMA licensing gap — editorial due-diligence file",
        status: "regulatory",
        jurisdiction: "Switzerland",
        reportSlug: "finanzliga-switzerland-credit-introduction-warning",
      },
    ],
  },
{
    slug: "christian-gajek",
    type: "PERSON",
    name: "Christian Gajek",
    summary:
      "Named accomplice in Harald Hojer / Finanzliga reader files — verify linkage with signed contracts.",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "cg-hojer-link",
        title: "Named in Harald Hojer network — accomplice file",
        status: "open",
        reportSlug: "finanzliga-switzerland-credit-introduction-warning",
      },
    ],
  },
{
    slug: "alois-anishofer",
    type: "PERSON",
    name: "Alois Anishofer",
    aliases: "Alois Anichhofer",
    summary:
      "Named accomplice in Harald Hojer / Finanzliga reader files — verify linkage with signed contracts.",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "aa-hojer-link",
        title: "Named in Harald Hojer network — accomplice file",
        status: "open",
        reportSlug: "finanzliga-switzerland-credit-introduction-warning",
      },
    ],
  },
{
    slug: "globeair-ag",
    type: "COMPANY",
    name: "GlobeAir AG",
    principals:
      "No individual named in creditor submission — dispute filed against legal entity GlobeAir AG (Austria); management not identified on file",
    websites: "globeair.com",
    country: "Austria",
    location: "Hörsching — EU charter operator (Swiss creditor files)",
    summary:
      "Creditor file: alleged extortion attempt after non-performance and a cancelled aircraft repositioning; counterparty allegedly insisted on contract performance despite service failure — written correspondence on file. Third-party debt-collection pressure by telephone demanding CHF 15,000. Editorial documentation; not a court judgment.",
    amountOwed: 15000,
    amountOwedCurrency: "CHF",
    sourceLabel: "Creditor / charter-party file",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "ga-repositioning",
        title: "Cancelled aircraft repositioning — non-performance dispute",
        status: "civil",
        jurisdiction: "Switzerland / EU charter",
        year: 2026,
      },
      {
        id: "ga-debt-collector",
        title: "Alleged debt-collector calls — CHF 15,000 demand",
        status: "open",
        year: 2026,
      },
      {
        id: "ga-contract-insistence",
        title: "Written file — insistence on contract despite non-performance",
        status: "open",
      },
    ],
  },
{
    slug: "capitals-holding-sa",
    type: "COMPANY",
    name: "Capitals Holding SA",
    principals: "Not named in FINMA warning (May 2026) — operator unidentified on public record",
    websites: "holding-capitals.com",
    country: "Switzerland",
    summary:
      "FINMA warning (May 2026): suspected unauthorised investment / financial services — clone-style holding platform. No natural person named in the regulator’s publication.",
    sourceLabel: "FINMA warning list",
    sourceUrl: FINMA_URL,
    listedAt: "2026-05-22",
    cases: [
      {
        id: "chs-finma-2026",
        title: "FINMA warning — Capitals Holding SA",
        status: "regulatory",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
{
    slug: "unison-investment",
    type: "COMPANY",
    name: "Unison Investment",
    principals: "Not named in FINMA warning (May 2026) — operator unidentified on public record",
    websites: "unisoninvestment.com",
    country: "Switzerland",
    summary:
      "FINMA warning (May 2026): suspected unauthorised financial-market activity — investment fraud pattern. No natural person named in the regulator’s publication.",
    sourceLabel: "FINMA warning list",
    sourceUrl: FINMA_URL,
    listedAt: "2026-05-22",
    cases: [
      {
        id: "ui-finma-2026",
        title: "FINMA warning — unisoninvestment.com",
        status: "regulatory",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
{
    slug: "macro-venture-geneva",
    type: "COMPANY",
    name: "Macro Venture",
    principals: "Not named in FINMA warning — clone broker; no verified Swiss register entry for operators",
    aliases: "macroventuregroup.com",
    location: "Rue du Rhône 42, 1204 Geneva (claimed)",
    country: "Switzerland",
    websites: "macroventuregroup.com",
    summary:
      "Clone-broker / investment fraud — FINMA and international warnings: not entered in the Swiss commercial register, no authorisation for financial services. Public victim reporting cites ~CHF 210,000 loss (Geneva). Operator not identified on file.",
    amountOwed: 210000,
    amountOwedCurrency: "CHF",
    sourceLabel: "FINMA warning list (pattern)",
    sourceUrl: FINMA_URL,
    listedAt: "2026-05-28",
    cases: [
      {
        id: "mv-finma-clone",
        title: "FINMA-style clone firm — Geneva address misuse",
        status: "regulatory",
        jurisdiction: "Geneva, Switzerland",
        year: 2026,
      },
      {
        id: "mv-victim-210k",
        title: "Victim file — ~CHF 210,000 (public reporting)",
        status: "civil",
        jurisdiction: "Geneva",
      },
    ],
  },
{
    slug: "lugano-digital-yield-ag",
    type: "COMPANY",
    name: "Lugano Digital Yield AG",
    principals: "Not named on file — editorial composite (victim-file pattern, Ticino)",
    aliases: "LDY Capital",
    location: "Lugano",
    country: "Switzerland",
    sourceLabel: "Editorial composite",
    summary:
      "Investment fraud — FX/crypto yield platform marketed from Lugano; victim statements on file describe blocked withdrawals and pressure for further “tax” payments. No named operator identified; pattern-based editorial entry.",
    amountOwed: 92000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "ldy-lugano-fx",
        title: "FX / crypto yield — Lugano promotion",
        status: "open",
        jurisdiction: "Lugano, Ticino",
        year: 2026,
      },
      {
        id: "ldy-withdrawal-block",
        title: "Withdrawal blocks — advance fee demands",
        status: "open",
      },
    ],
  },
{
    slug: "locarno-lakefront-capital",
    type: "COMPANY",
    name: "Locarno Lakefront Capital",
    principals: "Not named on file — editorial composite (victim-file pattern, Ticino)",
    location: "Locarno",
    country: "Switzerland",
    sourceLabel: "Editorial composite",
    summary:
      "Investment fraud — boutique “wealth” offers targeting Ticino and cross-border retirees; cold calls, fake portfolio dashboards, recovery-scam follow-ups per NCSC/FINMA patterns. No named operator identified; pattern-based editorial entry.",
    amountOwed: 67000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "llc-locarno-promo",
        title: "Locarno-facing investment promotion",
        status: "open",
        jurisdiction: "Locarno, Ticino",
      },
      {
        id: "llc-recovery-scam",
        title: "Recovery-scam follow-up (second loss)",
        status: "open",
        jurisdiction: "Switzerland",
        year: 2026,
      },
    ],
  },
{
    slug: "bellinzona-private-credit-circle",
    type: "COMPANY",
    name: "Bellinzona Private Credit Circle",
    principals: "Not named on file — editorial composite (victim-file pattern, Ticino)",
    location: "Bellinzona / Lugano corridor",
    country: "Switzerland",
    sourceLabel: "Editorial composite",
    summary:
      "Investment fraud — private credit / bridge-loan circle operating in Ticino; promised fixed returns, no FINMA authorisation on file, creditor claims documented. No named operator identified; pattern-based editorial entry.",
    amountOwed: 145000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "bpcc-ticino-credit",
        title: "Private credit circle — Ticino investors",
        status: "civil",
        jurisdiction: "Ticino",
        year: 2026,
      },
    ],
  },
{
    slug: "zurich-limmat-crypto-desk",
    type: "COMPANY",
    name: "Zurich Limmat Crypto Desk",
    principals: "Not named on file — editorial composite (victim-file pattern, Zürich)",
    aliases: "ZLCD Trading",
    location: "Zürich",
    country: "Switzerland",
    sourceLabel: "Editorial composite",
    summary:
      "Investment fraud — crypto/FX desk marketed from Zurich; fake dashboards, withdrawal blocks, and advance “compliance” fees. No named operator identified; pattern-based editorial entry.",
    amountOwed: 48000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "zlcd-zurich-fx",
        title: "FX/crypto desk — Zurich city promotion",
        status: "open",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
    ],
  },
{
    slug: "zurich-seefeld-capital-partners",
    type: "COMPANY",
    name: "Zurich Seefeld Capital Partners",
    principals: "Not named on file — editorial composite (victim-file pattern, Zürich)",
    location: "Seefeld, Zürich",
    country: "Switzerland",
    sourceLabel: "Editorial composite",
    summary:
      "Investment fraud — boutique “capital partners” targeting Zurich professionals; cold calls, forged portfolio statements, pressure to recruit family members. No named operator identified; pattern-based editorial entry.",
    amountOwed: 118000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "zscp-seefeld",
        title: "Seefeld / Zürich investment promotion",
        status: "civil",
        jurisdiction: "Zürich",
        year: 2026,
      },
    ],
  },
{
    slug: "zurich-enge-wealth-network",
    type: "COMPANY",
    name: "Zurich Enge Wealth Network",
    principals: "Not named on file — editorial composite (victim-file pattern, Zürich)",
    location: "Enge, Zürich",
    country: "Switzerland",
    sourceLabel: "Editorial composite",
    summary:
      "Investment fraud / network-marketing hybrid — Enge district outreach, promised fixed yields, no FINMA licence on file. No named operator identified; pattern-based editorial entry.",
    amountOwed: 76000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "zewn-enge",
        title: "Network wealth offers — Zurich Enge",
        status: "open",
        jurisdiction: "Zürich",
      },
    ],
  },
{
    slug: "zurich-ochsen-corner-finance",
    type: "COMPANY",
    name: "Zurich Ochsen Corner Finance",
    principals: "Not named on file — editorial composite (victim-file pattern, Zürich)",
    location: "Zürich (city centre)",
    country: "Switzerland",
    sourceLabel: "Editorial composite",
    summary:
      "Investment fraud — short-term “bridge finance” sold to Zurich SMEs and retail investors; contracts on file, payouts never materialised. No named operator identified; pattern-based editorial entry.",
    amountOwed: 203000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "zocf-bridge",
        title: "Bridge finance — Zurich creditor claims",
        status: "civil",
        jurisdiction: "Zürich, Switzerland",
        year: 2026,
      },
    ],
  },
{
    slug: "wesendit-media-ag",
    type: "COMPANY",
    name: "WeSendit Media AG",
    imageUrl: "/uploads/wesendit-media-ag/wesendit-logo.png",
    aliases:
      "WeSendit, wesendit.com, wesendit.io, Secure Swiss File Transfer, decentralized storage, Web3 file transfer",
    uid: "CHE-444.692.656",
    principals:
      "Jens Herbst (founder / former CEO & board — public imprint); Thomas Hippin (editorial file — Savendis / Balluun network; WeSendit linkage)",
    websites: "wesendit.com, wesendit.io, discover.wesendit.com",
    location: "Zug",
    address: "Baarerstrasse 8, 6300 Zug",
    country: "Switzerland",
    summary:
      "WeSendit — secure Swiss file transfer & decentralized storage (wesendit.com). Editorial file links WeSendit Media AG to Thomas Hippin and Jens Herbst. All Hippin-linked exposures on this register are assessed severely alarming.",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "ws-hippin-herbst",
        title: "Thomas Hippin & Jens Herbst — linked network (editorial file)",
        status: "open",
        jurisdiction: "Switzerland / international",
        year: 2026,
      },
      {
        id: "ws-hippin-severity",
        title: "Hippin-linked exposure — severely alarming (editorial assessment)",
        status: "open",
        jurisdiction: "Switzerland",
      },
      {
        id: "ws-file-transfer",
        title: "Secure file transfer / Web3 storage — due-diligence file",
        status: "open",
        jurisdiction: "Zug, Switzerland",
      },
    ],
  },
{
    slug: "thomas-hippin",
    type: "PERSON",
    name: "Thomas Hippin",
    aliases:
      "Thomas André Hippin, Savendis AG, Balluun, WeSendit, Jens Herbst, Bulgaria, severely alarming",
    location: "Bulgaria",
    country: "Bulgaria",
    summary:
      "Investment fraud, forgery, embezzlement, and fraud allegations — residence Bulgaria. Savendis / Balluun-era cold-call network; linked to WeSendit Media AG and Jens Herbst on file. All Hippin-linked matters assessed severely alarming.",
    amountOwed: 600000,
    amountOwedCurrency: "CHF",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "th-investment-fraud",
        title: "Investment fraud — creditor claims on file",
        status: "criminal",
        jurisdiction: "Switzerland / Bulgaria",
      },
      {
        id: "th-savendis-balluun",
        title: "Savendis AG / Balluun — phone brokerage network",
        status: "open",
        jurisdiction: "Zürich / Switzerland",
      },
      {
        id: "th-wesendit-herbst",
        title: "WeSendit Media AG & Jens Herbst — linked exposure",
        status: "open",
        jurisdiction: "Zug, Switzerland",
        year: 2026,
      },
      {
        id: "th-severity",
        title: "Hippin-linked network — severely alarming (editorial assessment)",
        status: "open",
        jurisdiction: "International",
      },
    ],
  },
{
    slug: "jens-herbst",
    type: "PERSON",
    name: "Jens Herbst",
    imageUrl: "/uploads/jens-herbst/jens-herbst-photo.jpg",
    aliases:
      "WeSendit, WeSendit Media AG, Thomas Hippin, wesendit.com, Zug, Crypto Valley, severely alarming",
    location: "Zug",
    country: "Switzerland",
    summary:
      "WeSendit Media AG founder and former CEO (public company imprint) — linked in editorial file to Thomas Hippin. Hippin-linked network assessed severely alarming.",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "jh-wesendit-media",
        title: "WeSendit Media AG — founder / former CEO (public register)",
        status: "open",
        jurisdiction: "Zug, Switzerland",
      },
      {
        id: "jh-hippin-link",
        title: "Thomas Hippin — linked network (severely alarming assessment)",
        status: "open",
        jurisdiction: "Switzerland / international",
        year: 2026,
      },
    ],
  },
{
    slug: "joana-figueiredo",
    type: "PERSON",
    name: "Joana Figeureido",
    imageUrl: "/uploads/joana-figueiredo/joana-figueiredo-cosplay.png",
    aliases:
      "Joana Figueiredo, janesilver_art, janesilver, cosplay, Patreon, ANIFEST, private jet charter, born 18 February, Lisbon, Sydney",
    location: "Sydney, Australia (reported); born Lisbon, Portugal",
    country: "Australia",
    websites: "ko-fi.com/janesilver, Patreon (cosplay — on file)",
    summary:
      "Cosplay-heavy online persona (costume / disguise; described on file as operating in a detached “parallel universe” from aviation reality). Public monetization via Patreon and Ko-fi for cosplay content. Separately presents as able to book private flights. Editorial files allege a pattern of accusing aircraft operators, owners, coordination teams, and management of intending to defraud her, while submitting unrealistic charter requests that waste industry time and resources. On file: conduct may align with extortion-style pressure (reputation threats / false fraud claims to extract concessions). Strongly advised: no professional or private dealings — verify identity, funding, and mandate before any engagement.",
    sourceLabel: "Public profiles (Ko-fi / Patreon) + editorial file",
    sourceUrl: "https://ko-fi.com/janesilver",
    listedAt: "2026-05-31",
    cases: [
      {
        id: "jf-cosplay-persona",
        title: "Cosplay persona — identity / presentation mismatch with charter broker role (on file)",
        status: "open",
        jurisdiction: "Australia / international",
        year: 2026,
      },
      {
        id: "jf-patreon-monetization",
        title: "Patreon / Ko-fi — cosplay funding (public profiles on file)",
        status: "open",
        jurisdiction: "International",
        year: 2026,
      },
      {
        id: "jf-extortion-tactics",
        title: "Possible extortion-style tactics — false fraud accusations alleged (on file)",
        status: "open",
        jurisdiction: "International",
        year: 2026,
      },
      {
        id: "jf-aviation-pretence",
        title: "Private flight booking — authority / mandate questioned (on file)",
        status: "open",
        jurisdiction: "Australia / international",
        year: 2026,
      },
      {
        id: "jf-false-accusations",
        title: "Accusations against operators, owners, and management — defraud intent alleged (on file)",
        status: "open",
        jurisdiction: "International",
        year: 2026,
      },
      {
        id: "jf-unrealistic-requests",
        title: "Unrealistic charter enquiries — industry time / cost burden alleged",
        status: "open",
        jurisdiction: "International",
        year: 2026,
      },
      {
        id: "jf-avoid-engagement",
        title: "Counterparty warning — avoid professional and private engagement (editorial)",
        status: "open",
        jurisdiction: "International",
        year: 2026,
      },
    ],
  },
{
    slug: "rajiv-sahni",
    type: "PERSON",
    name: "Gen Rajiv Sahni",
    imageUrl: "/uploads/rajiv-sahni/rajiv-sahni.png",
    aliases:
      "Rajiv Sahni, Director General EME, DG EME, Indian Army, Corps of EME, Phuket incident",
    location: "Phuket, Thailand (incident, 27 May 2026); India (service)",
    country: "India",
    summary:
      "Indian Army officer — Director General, Corps of Electronics and Mechanical Engineers (DG EME), per title on file. Editorial file: on or about 27 May 2026 in Phuket, Thailand, public street altercation following alleged harassment, insults, and disrespect toward Thai nationals and transgender women (local interaction context). Alleged: sought sexual services without payment; subsequently physically attacked on the street by six women, witnessed publicly. Conduct on file assessed as serious reputational and discipline matter for a flag-rank-equivalent engineering general officer. Verify through official Indian Army / MOD channels before any professional engagement.",
    sourceLabel: "Mr Nikhil Kumar (Facebook)",
    videoUrl: "https://streamable.com/78ucje",
    listedAt: "2026-05-31",
    cases: [
      {
        id: "rs-phuket-incident-2026",
        title: "Phuket public incident — 27 May 2026 (on file)",
        status: "open",
        jurisdiction: "Phuket, Thailand",
        year: 2026,
      },
      {
        id: "rs-harassment-disrespect",
        title: "Harassment / insults toward Thai citizens and transgender women alleged",
        status: "open",
        jurisdiction: "Thailand",
        year: 2026,
      },
      {
        id: "rs-non-payment-alleged",
        title: "Sexual services sought without payment — allegation (on file)",
        status: "open",
        jurisdiction: "Phuket, Thailand",
        year: 2026,
      },
      {
        id: "rs-physical-altercation",
        title: "Physical attack by six women — public street (on file)",
        status: "criminal",
        jurisdiction: "Phuket, Thailand",
        year: 2026,
      },
      {
        id: "rs-dg-eme-reputation",
        title: "DG EME — senior Indian Army conduct / reputational warning (editorial)",
        status: "open",
        jurisdiction: "India / international",
        year: 2026,
      },
    ],
  },
{
    slug: "pegasos-finance-zurich",
    type: "COMPANY",
    name: "Pegasos Finance GmbH",
    uid: "CHE-452.507.509",
    aliases: "Pegasos Finance, pegasosfinance.com",
    location: "Geroldswil",
    address: "Steinhaldenring 8, 8954 Geroldswil",
    country: "Switzerland",
    websites: "pegasosfinance.com",
    summary:
      "Swiss Life terminated the brokerage mandate with Pegasos Finance GmbH (Geroldswil). Listed for due-diligence reference only — no named individuals on this entry.",
    sourceLabel: "Industry / mandate notice",
    listedAt: "2026-05-28",
    cases: [
      {
        id: "peg-swiss-life-mandate",
        title: "Swiss Life — brokerage mandate terminated",
        status: "regulatory",
        jurisdiction: "Switzerland",
        year: 2026,
      },
    ],
  },
{
    slug: "prime-host-dxb",
    type: "COMPANY",
    name: "Prime Host Vacation Homes",
    aliases:
      "Prime Host, PrimeHost DXB, primehostdxb.com, Prime Host Dubai, vacation homes Dubai",
    principals: "Operators not named on public homepage impressum (editorial file)",
    location: "Dubai (listings across Marina, JBR, Business Bay, Palm, JVC and other areas)",
    country: "United Arab Emirates",
    websites: "primehostdxb.com",
    imageUrl: "/uploads/primehost-dxb/logo.png",
    summary:
      "Dubai vacation-rental / short-stay brand (primehostdxb.com). Consumer complaint on file: disputed and opaque invoicing, alleged lack of working capital to sustain the operation as marketed, poor treatment of guests/users, and accommodation described as unhealthy / unfit. Documented claim USD 3,800. High consumer risk — verify escrow, property licence, and inspection before any transfer.",
    sourceLabel: "Consumer complaint + public website review (editorial file)",
    sourceUrl: "https://primehostdxb.com/",
    reportSlug: "primehost-dxb-dubai-vacation-rental-invoice-scam-alert",
    amountOwed: 3800,
    amountOwedCurrency: "USD",
    listedAt: "2026-07-21",
    cases: [
      {
        id: "phd-invoice-dispute",
        title: "Disputed / aggressive invoicing — consumer complaint (on file)",
        status: "open",
        jurisdiction: "United Arab Emirates / Dubai",
        year: 2026,
        reportSlug: "primehost-dxb-dubai-vacation-rental-invoice-scam-alert",
      },
      {
        id: "phd-accommodation-quality",
        title: "Alleged unhealthy / unfit short-stay accommodation (on file)",
        status: "open",
        jurisdiction: "Dubai, UAE",
        year: 2026,
        reportSlug: "primehost-dxb-dubai-vacation-rental-invoice-scam-alert",
      },
      {
        id: "phd-claim-3800",
        title: "Documented claim — USD 3,800",
        status: "open",
        jurisdiction: "International / UAE",
        year: 2026,
        reportSlug: "primehost-dxb-dubai-vacation-rental-invoice-scam-alert",
      },
    ],
  },
{
    slug: "robert-kennedy-college",
    type: "COMPANY",
    name: "Robert Kennedy College",
    aliases:
      "RKC, Robert Kennedy College AG, Robert Kennedy Institute, rkc.swiss, rkc.edu, college.ch",
    principals:
      "David Costa (david.costa@rkc.edu); Chitra (chitra@rkc.swiss); Gopika Rajendran (gopika.rajendran@rkc.edu); Akhil Rajeswary (akhil.rajeswary@rkc.edu); University of Cumbria validation contact Signy Henderson (signy.henderson@cumbria.ac.uk)",
    location: "Freienbach (HQ) / Zürich branch",
    address:
      "Kantonsstrasse 25, 8807 Freienbach; Zürich branch: Technoparkstrasse 1, 8005 Zürich",
    country: "Switzerland",
    websites: "rkc.swiss, rkc.edu, college.ch",
    imageUrl: "/uploads/robert-kennedy-college/logo.webp",
    summary:
      "Private Swiss online college marketing UK-validated MBA/MSc/LLM programmes (University of Cumbria partnership on public record). Former-student complaint on file: thin lecture quality, opaque grading with refusal of independent external re-mark, non-responsive student services, Dean non-reply, and an agreed tuition refund still unpaid after more than a month. Prospective students should demand written accreditation scope, appeals rules, and refund terms before paying.",
    sourceLabel: "Former-student consumer complaint + public RKC / Cumbria partnership materials (editorial file)",
    sourceUrl: "https://rkc.swiss/",
    reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
    listedAt: "2026-07-21",
    relatedSlugs: [
      "david-costa-rkc",
      "chitra-rkc",
      "gopika-rajendran",
      "akhil-rajeswary",
      "signy-henderson",
    ],
    cases: [
      {
        id: "rkc-mba-quality-complaint",
        title: "Former student — cancelled online MBA; poor teaching / opaque grading (on file)",
        status: "open",
        jurisdiction: "Switzerland / UK",
        year: 2026,
        reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
      },
      {
        id: "rkc-refund-delay",
        title: "Agreed tuition refund unpaid — student services / Dean non-response (on file)",
        status: "open",
        jurisdiction: "Switzerland",
        year: 2026,
        reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
      },
      {
        id: "rkc-cumbria-validation",
        title: "Degree validation via University of Cumbria — verify accreditation scope before enrolment",
        status: "open",
        jurisdiction: "United Kingdom / Switzerland",
        year: 2026,
        reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
      },
    ],
  },
{
    slug: "david-costa-rkc",
    type: "PERSON",
    name: "David Costa",
    aliases: "david.costa@rkc.edu, Robert Kennedy College",
    location: "Robert Kennedy College (Switzerland)",
    country: "Switzerland",
    summary:
      "RKC contact on complainant correspondence (david.costa@rkc.edu). Linked to Robert Kennedy College online MBA consumer complaint — verify role and authority before relying on any refund or academic assurance.",
    sourceLabel: "Complainant email trail (editorial file)",
    reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
    listedAt: "2026-07-21",
    relatedSlugs: ["robert-kennedy-college"],
    cases: [
      {
        id: "dc-rkc-contact",
        title: "Named RKC contact — MBA cancellation / refund correspondence (on file)",
        status: "open",
        jurisdiction: "Switzerland",
        year: 2026,
        reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
      },
    ],
  },
{
    slug: "chitra-rkc",
    type: "PERSON",
    name: "Chitra (RKC)",
    aliases: "chitra@rkc.swiss, Robert Kennedy College",
    location: "Robert Kennedy College (Switzerland)",
    country: "Switzerland",
    summary:
      "RKC contact on complainant correspondence (chitra@rkc.swiss). Linked to Robert Kennedy College online MBA consumer complaint file.",
    sourceLabel: "Complainant email trail (editorial file)",
    reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
    listedAt: "2026-07-21",
    relatedSlugs: ["robert-kennedy-college"],
    cases: [
      {
        id: "ch-rkc-contact",
        title: "Named RKC contact — student services correspondence (on file)",
        status: "open",
        jurisdiction: "Switzerland",
        year: 2026,
        reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
      },
    ],
  },
{
    slug: "gopika-rajendran",
    type: "PERSON",
    name: "Gopika Rajendran",
    aliases: "gopika.rajendran@rkc.edu, Robert Kennedy College",
    location: "Robert Kennedy College (Switzerland)",
    country: "Switzerland",
    summary:
      "RKC contact on complainant correspondence (gopika.rajendran@rkc.edu). Linked to Robert Kennedy College online MBA consumer complaint file.",
    sourceLabel: "Complainant email trail (editorial file)",
    reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
    listedAt: "2026-07-21",
    relatedSlugs: ["robert-kennedy-college"],
    cases: [
      {
        id: "gr-rkc-contact",
        title: "Named RKC contact — student correspondence (on file)",
        status: "open",
        jurisdiction: "Switzerland",
        year: 2026,
        reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
      },
    ],
  },
{
    slug: "akhil-rajeswary",
    type: "PERSON",
    name: "Akhil Rajeswary",
    aliases: "akhil.rajeswary@rkc.edu, Robert Kennedy College",
    location: "Robert Kennedy College (Switzerland)",
    country: "Switzerland",
    summary:
      "RKC contact on complainant correspondence (akhil.rajeswary@rkc.edu). Linked to Robert Kennedy College online MBA consumer complaint file.",
    sourceLabel: "Complainant email trail (editorial file)",
    reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
    listedAt: "2026-07-21",
    relatedSlugs: ["robert-kennedy-college"],
    cases: [
      {
        id: "ar-rkc-contact",
        title: "Named RKC contact — student correspondence (on file)",
        status: "open",
        jurisdiction: "Switzerland",
        year: 2026,
        reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
      },
    ],
  },
{
    slug: "signy-henderson",
    type: "PERSON",
    name: "Signy Henderson",
    aliases: "signy.henderson@cumbria.ac.uk, University of Cumbria, Robert Kennedy College partnership",
    location: "University of Cumbria (UK)",
    country: "United Kingdom",
    summary:
      "University of Cumbria contact on complainant correspondence (signy.henderson@cumbria.ac.uk). RKC markets online programmes validated through Cumbria — prospective students should confirm with the university what is accredited, by whom, and how academic appeals / refunds are handled when delivery is via RKC.",
    sourceLabel: "Complainant email trail (editorial file)",
    reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
    listedAt: "2026-07-21",
    relatedSlugs: ["robert-kennedy-college"],
    cases: [
      {
        id: "sh-cumbria-rkc",
        title: "Cumbria contact — RKC-validated programme complaint trail (on file)",
        status: "open",
        jurisdiction: "United Kingdom",
        year: 2026,
        reportSlug: "robert-kennedy-college-switzerland-mba-scam-alert",
      },
    ],
  },
  {
    slug: "peter-clark-forward-media",
    type: "PERSON",
    name: "Peter Clark",
    aliases:
      "pclark@allforward.co, Forward Media, Forward Studio, Forward Media USA, CEO Forward Media, +1-917-686-2633",
    location: "New York, NY",
    address: "245 8th Avenue #312, New York, NY 10011",
    country: "United States",
    websites: "forward-studio.co, forward-studio.cc, allforward.co",
    summary:
      "CEO / Partner of Forward Media / Forward Studio (airline, aerospace and space public relations / branding), publicly listed at 245 8th Ave #312, New York, NY 10011; contact pclark@allforward.co / +1-917-686-2633. Public team page: forward-studio.co. Complainant file (19+ user reports): alleged use of AI-powered internet scraping tools to harvest emails — including sensitive addresses — without consent, followed by mass outreach / “email bombing” of individuals and companies. Complainants describe the pattern as untrustworthy, greedy, and unlawful cold outreach. Documented claim total on file: USD 15,000. Treat unsolicited contact from this identity as high-risk until independent consent and data-source proof are verified.",
    listedAt: "2026-07-30",
    amountOwed: 15000,
    amountOwedCurrency: "USD",
    cases: [
      {
        id: "pc-email-scrape-mass-outreach",
        title:
          "Alleged AI-assisted email scraping + mass outreach without consent (19+ user reports)",
        description:
          "Complainants allege illegal scraping of emails (including sensitive addresses) and mass bombing of users/companies without permission. Claim total USD 15,000 on file.",
        status: "open",
        year: 2026,
        jurisdiction: "United States",
      },
      {
        id: "pc-forward-media-identity",
        title: "Public identity — CEO Forward Media / Forward Studio (NY)",
        description:
          "Airline / aerospace / space PR positioning; address and phone match public Forward Studio materials.",
        status: "open",
        year: 2026,
        jurisdiction: "New York, United States",
      },
    ],
  },
  {
    slug: "josephine-valenzuela-transportation-review",
    type: "PERSON",
    name: "Josephine Valenzuela",
    aliases:
      "josephine.valenzuela@transportationreview.com, Senior Relationship Associate, Transportation Review, +1-510-558-2274",
    location: "Fort Lauderdale, FL",
    address: "600 S Andrews Ave Suite 405, Fort Lauderdale, FL 33301",
    country: "United States",
    websites: "transportationreview.com",
    summary:
      "Presented as Senior Relationship Associate linked to Transportation Review (industry magazine; editorial offices include Fort Lauderdale, FL). Contact on complainant file: josephine.valenzuela@transportationreview.com / +1-510-558-2274; address 600 S Andrews Ave Suite 405, Fort Lauderdale, FL 33301. Public staff listing under this exact name was not independently confirmed on the magazine’s about/contributors pages at time of listing. Complainant file (22+ user reports): alleged use of illegal AI-powered scraping tools to obtain sensitive emails from the open web, then aggressive outreach. Documented claim total on file: USD 15,000. Verify employment and opt-in before any engagement.",
    listedAt: "2026-07-30",
    amountOwed: 15000,
    amountOwedCurrency: "USD",
    cases: [
      {
        id: "jv-email-scrape-outreach",
        title:
          "Alleged AI-assisted scraping of sensitive emails + unwanted outreach (22+ user reports)",
        description:
          "Complainants allege illegal AI/web scraping of sensitive emails. Claim total USD 15,000 on file.",
        status: "open",
        year: 2026,
        jurisdiction: "United States",
      },
      {
        id: "jv-transportation-review-contact",
        title: "Transportation Review contact trail — Fort Lauderdale address on file",
        status: "open",
        year: 2026,
        jurisdiction: "Florida, United States",
      },
    ],
  },
  {
    slug: "ashley-rushing-kbkg",
    type: "PERSON",
    name: "Ashley Rushing",
    aliases:
      "ashley.rushing@kbkg.com, KBKG, Account Director KBKG, Tax Credits Incentives Cost Recovery",
    location: "Southeast / Tampa area (KBKG Account Director — public bio)",
    country: "United States",
    websites: "kbkg.com",
    summary:
      "Publicly listed as Account Director (Southeast) at KBKG — Tax Credits, Incentives & Cost Recovery (kbkg.com; ashley.rushing@kbkg.com). Markets R&D tax credits, cost segregation and related incentives. Complainant file: alleged illegal email scraping using AI and other tools; alleged purchase of email lists on illegal markets; mass “bombing” of companies without legitimate reason — including targets not based in the United States — creating unnecessary administrative burden (Mehraufwand) around tax-credit / incentive pitches. Treat unsolicited KBKG-linked outreach as high-risk until consent, data provenance, and engagement mandate are verified in writing.",
    listedAt: "2026-07-30",
    cases: [
      {
        id: "ar-kbkg-email-scrape",
        title:
          "Alleged illegal email scraping / list purchases + mass company outreach (on file)",
        description:
          "Complainants allege AI tools and illegal-market email purchases; outreach to non-US companies; tax-credit pitches creating avoidable overhead.",
        status: "open",
        year: 2026,
        jurisdiction: "United States / International",
      },
      {
        id: "ar-kbkg-public-role",
        title: "Public role — KBKG Account Director (tax credits / incentives / cost recovery)",
        status: "open",
        year: 2026,
        jurisdiction: "United States",
      },
    ],
  },
  {
    slug: "sean-chi-growth-partnerships",
    type: "PERSON",
    name: "Sean Chi",
    aliases:
      "Growth Partnerships Specialist, meetings.hubspot.com/schi, +1-904-559-1808, Reliance Jet website claim",
    location: "United States (phone +1-904 area)",
    country: "United States",
    websites: "meetings.hubspot.com/schi, reliancejets.com",
    summary:
      "Growth Partnerships Specialist on complainant file; booking calendar meetings.hubspot.com/schi; phone +1-904-559-1808. Complainant file (44+ user reports against this outreach / company pattern): alleged scamming and high-pressure sales; alleged use of target companies’ names without mandate; alleged scraping of emails and company data via illegal AI tools; reputational pressure on targets to force a sale. Subject has claimed involvement in design/development of the Reliance Jet website — treat that claim as unverified self-attribution unless Reliance Jet confirms in writing. Stay aware: high volume of similar reports on file.",
    listedAt: "2026-07-30",
    cases: [
      {
        id: "sc-pressure-scrape-sales",
        title:
          "Alleged pressure sales, name misuse, and AI-assisted scrape outreach (44+ user reports)",
        description:
          "Complainants allege scamming / pressure tactics, using target company names, illegal AI scraping of emails/companies, and reputational leverage to force sales.",
        status: "open",
        year: 2026,
        jurisdiction: "United States / International",
      },
      {
        id: "sc-reliance-jet-claim",
        title: "Self-claimed Reliance Jet website design/development (unverified)",
        description:
          "Complainants report the subject claims to have designed/developed reliancejets.com — not independently confirmed with the operator.",
        status: "open",
        year: 2026,
        jurisdiction: "United States",
      },
    ],
  },
  {
    slug: "chalina-frei",
    type: "PERSON",
    name: "Chalina Frei",
    aliases: "Chalina Frei Facebook",
    country: "Switzerland",
    location: "Switzerland (social media)",
    summary:
      "Complainant file (22 user reports): subject allegedly engages in abusive / inflammatory conduct on Facebook and other social media — including statements complainants characterise as disloyal to the public interest and as demonstrating impaired judgment in public discourse. Strong left-leaning political messaging on social media is on the complaint trail. Listed for complainant documentation of repeated social-media misconduct reports; not a finding of criminal conviction.",
    listedAt: "2026-07-30",
    relatedSlugs: ["gabriella-patricia-braendli", "moni-schelm"],
    cases: [
      {
        id: "cf-sm-misconduct-22",
        title: "Social-media misconduct / abusive public posts — 22 user reports on file",
        status: "open",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
  {
    slug: "gabriella-patricia-braendli",
    type: "PERSON",
    name: "Gabriella Patricia Brändli",
    aliases: "Gabriella Patricia Braendli, Gabi Brändli, Gabriella Brändli Facebook",
    country: "Switzerland",
    location: "Switzerland (social media)",
    summary:
      "Complainant file (22 user reports): same pattern as related social-media misconduct dossiers — alleged hate speech and abusive / inflammatory Facebook posts. Listed on the basis of repeated user reports of smear-style public behaviour online; not a court judgment.",
    listedAt: "2026-07-30",
    relatedSlugs: ["chalina-frei", "moni-schelm"],
    cases: [
      {
        id: "gpb-fb-hate-22",
        title: "Alleged Facebook hate speech / abusive posts — 22 user reports on file",
        status: "open",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
  {
    slug: "moni-schelm",
    type: "PERSON",
    name: "Moni Schelm",
    aliases: "Moni Schelm Bäuerin, Monika Schelm",
    country: "Switzerland",
    location: "Switzerland (farmer / public appearances)",
    summary:
      "Described on complainant file as a farmer. Complainant file (22 user reports): alleged unstable public conduct, including reports of appearing intoxicated in public and of smear-style / abusive behaviour on the internet and social media. Listed for repeated user reports; psychiatric or medical conclusions are not independently verified by editors.",
    listedAt: "2026-07-30",
    relatedSlugs: ["chalina-frei", "gabriella-patricia-braendli"],
    cases: [
      {
        id: "ms-public-sm-22",
        title: "Alleged public / online misconduct — 22 user reports on file",
        status: "open",
        year: 2026,
        jurisdiction: "Switzerland",
      },
    ],
  },
  {
    slug: "hunziker-stadtpolizei-uster",
    type: "PERSON",
    name: "Hunziker (Stadtpolizei Uster)",
    aliases: "Polizist Hunziker, Herr Hunziker, Stadtpolizei Uster Hunziker",
    country: "Switzerland",
    location: "Uster, ZH",
    summary:
      "Police officer associated with Stadtpolizei Uster on complainant file. Allegations on file: abuse of office (Amtsmissbrauch) and deception (Täuschung) — including public camera appearances promoting narcotics enforcement / prohibition messaging while private conversations on file allegedly contradict that stance. Cross-linked to Stadtpolizei Uster communications dossier. Open complainant matters; not a criminal conviction.",
    listedAt: "2026-07-30",
    relatedSlugs: ["stadtpolizei-uster"],
    cases: [
      {
        id: "hz-amtsmissbrauch-taeuschung",
        title: "Alleged Amtsmissbrauch and Täuschung — complainant file",
        status: "open",
        year: 2026,
        jurisdiction: "Uster, Zürich, Switzerland",
      },
      {
        id: "hz-camera-vs-private",
        title: "Alleged contradiction between public camera stance and private conversations (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "Uster, Switzerland",
      },
    ],
  },
  {
    slug: "stadtpolizei-uster",
    type: "COMPANY",
    name: "Stadtpolizei Uster",
    aliases: "Stadtpolizei Schweiz Uster, Polizei Uster Facebook",
    country: "Switzerland",
    location: "Uster, ZH",
    websites: "uster.ch, facebook.com (Stadtpolizei Uster)",
    summary:
      "Municipal police of Uster (ZH). Complainant file: Facebook communications described as coercive / paternalistic toward residents; typographical errors in official comments noted by complainants. Separately, Stadt Uster / Stadtpolizei channels communicated absolute outdoor fire bans including grilling with wood or charcoal (drought / wildfire risk — e.g. public notices 2022 and July 2026); complainants characterise the communications and enforcement tone as overreaching / “police-state” style. Related officer dossier: Hunziker. Listed for complainant documentation — not a finding that lawful fire-safety measures are unlawful.",
    listedAt: "2026-07-30",
    relatedSlugs: ["hunziker-stadtpolizei-uster"],
    cases: [
      {
        id: "spu-facebook-comms",
        title: "Facebook communications — complainant allegations of coercive / inaccurate messaging",
        status: "open",
        year: 2026,
        jurisdiction: "Uster, Switzerland",
      },
      {
        id: "spu-grill-feuerverbot",
        title: "Outdoor fire / wood-charcoal grilling bans — public notices (complainant dispute of tone/scope)",
        description:
          "Public drought-related Feuerverbote in Uster covered open fire and grilling with wood/charcoal; gas grilling often still allowed. Complainants dispute communications style and scope.",
        status: "open",
        year: 2026,
        jurisdiction: "Uster, Switzerland",
      },
    ],
  },
  {
    slug: "ursula-von-der-leyen",
    type: "PERSON",
    name: "Ursula von der Leyen",
    aliases:
      "VdL, President of the European Commission, Pfizergate, EU Commission President, Wetstraat 200",
    country: "European Union / Germany",
    location: "Brussels (European Commission)",
    address: "Rue de la Loi 200 / Wetstraat 200, 1040 Bruxelles, Belgium",
    websites: "commission.europa.eu",
    summary:
      "President of the European Commission; official work address Rue de la Loi 200 / Wetstraat 200, 1040 Brussels. Counsel / complainant consortium file: 922 proceedings / Klage matters on file (editorial count — verify dockets with counsel). Public record: “Pfizergate” private texts with Pfizer CEO Albert Bourla on multi-billion COVID vaccine procurement; EU General Court criticism of Commission transparency failures; Austrian parliamentary Anfrage XXVII/J/18650 (Mag. Gerald Hauser, 15 May 2024) citing EPPO-related scrutiny and lack of transparency toward national governments. Has daughters (public biographical fact). Counsel file further asserts: subordination to Klaus Schwab / WEF networks; orders from high-ranking Freemason channels; New World Order (NWO) alignment; residence in a political compound allegedly outside ordinary Brussels municipal law; policies alleged to impoverish the continent; alleged facilitation of black-money flows toward Ukraine; alleged promotion of contested LGBTQ activist agendas. Those counsel strands are contested allegations, not court findings. Cross-linked to Eva Kaili (Qatargate / Greek EU politician corruption cluster).",
    listedAt: "2026-07-30",
    relatedSlugs: ["eva-kaili", "pier-antonio-panzeri", "francesco-giorgi"],
    cases: [
      {
        id: "vdl-922-klagen",
        title: "Counsel file — 922 Klage / proceedings count against von der Leyen (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "EU / multi-jurisdiction",
      },
      {
        id: "vdl-pfizergate-transparency",
        title: "Pfizergate — vaccine procurement texts / transparency (public court & press record)",
        description:
          "NYT / EU General Court transparency litigation; Commission criticism for failing to retain/explain SMS with Pfizer CEO. Separate EPPO interest in procurement reported in press. Austrian Nationalrat Anfrage XXVII/J/18650 (Hauser, 15.05.2024).",
        status: "open",
        year: 2025,
        jurisdiction: "European Union / Austria",
      },
      {
        id: "vdl-belgian-complaints",
        title: "Belgian criminal complaints (Pfizergate cluster) — admissibility contested / closed in part",
        description:
          "Complaints alleged interference, destruction of SMS, corruption, conflict of interest; Belgian supreme court ended a lead case as inadmissible (press 2025) while political/EPPO controversy continued.",
        status: "open",
        year: 2025,
        jurisdiction: "Belgium / EU",
      },
      {
        id: "vdl-counsel-networks-nwo",
        title:
          "Counsel allegations — Schwab/WEF, Freemason channels, NWO, extraterritorial political residence (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "International",
      },
      {
        id: "vdl-counsel-ukraine-lgbtq-poverty",
        title:
          "Counsel allegations — Ukraine black-money facilitation, LGBTQ agenda promotion, continental impoverishment (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "European Union / International",
      },
      {
        id: "vdl-counsel-cash-greek",
        title:
          "Counsel allegations — cash transactions & Greek foreign-policy / EU politician strand (see Eva Kaili / Qatargate cluster)",
        status: "open",
        year: 2026,
        jurisdiction: "International",
      },
    ],
  },
  {
    slug: "eva-kaili",
    type: "PERSON",
    name: "Eva Kaili",
    aliases:
      "Εύα Καϊλή, Eva Kaïli, former European Parliament Vice-President, Qatargate, PASOK",
    country: "Greece / European Union",
    location: "Brussels / Thessaloniki (born 26 Oct 1978, Thessaloniki)",
    websites: "europarl.europa.eu (historical mandate)",
    summary:
      "Greek politician; former Vice-President of the European Parliament; born 26 October 1978 in Thessaloniki. Central public figure in the EU Parliament “Qatargate” corruption probe (alleged cash-for-influence involving Qatar/Morocco networks). Arrested early December 2022 with partner and others; removed as EP Vice-President; lost PASOK mandate in Greece. Charged in Belgian proceedings with participation in a criminal organisation, corruption and money laundering (denies charges). After ~4 months in custody, released 12–14 April 2023 to house arrest with electronic ankle monitor (Tagesschau / Reuters / AP). Counsel / witness file further alleges: undeclared “repair works” used as cover; claimants silenced in Marbella and paid in cash for silence; millions received tied to refugee-policy bribery — those witness strands remain counsel-asserted pending exhibits. Cross-linked to Ursula von der Leyen dossier (Greek EU-politician / cash cluster on counsel file). Catastrophic optics for EU institutions while such figures sat near the top of the Parliament hierarchy.",
    listedAt: "2026-07-30",
    relatedSlugs: [...qatargateLinks("eva-kaili"), "ursula-von-der-leyen"],
    cases: [
      {
        id: "ek-qatargate-public",
        title: "Qatargate — EU Parliament corruption / money-laundering probe (public record)",
        description:
          "Arrest Dec 2022; EP VP removal; PASOK mandate lost; charged with criminal organisation, corruption, money laundering (denies). ~€1.5m cash seized in related raids (press).",
        status: "criminal",
        year: 2022,
        jurisdiction: "Belgium / European Parliament",
      },
      {
        id: "ek-house-arrest-2023",
        title: "Released to house arrest after ~4 months — electronic monitoring (Apr 2023)",
        description:
          "Brussels prosecutor: further pre-trial detention under house arrest with ankle tag (Tagesschau 12.04.2023; Reuters 14.04.2023).",
        status: "criminal",
        year: 2023,
        jurisdiction: "Belgium",
      },
      {
        id: "ek-counsel-marbella-silence",
        title:
          "Counsel/witness allegations — Marbella silence payments & undeclared “repair” cover (on file)",
        description:
          "Witnesses on counsel file allege claimants were silenced in Marbella and paid in black cash; “repair works” never performed as cover story.",
        status: "open",
        year: 2026,
        jurisdiction: "Spain / International",
      },
      {
        id: "ek-counsel-refugee-bribes",
        title:
          "Counsel/witness allegations — millions for refugee-policy bribery (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "European Union / International",
      },
    ],
  },
  {
    slug: "pier-antonio-panzeri",
    type: "PERSON",
    name: "Pier Antonio Panzeri",
    aliases:
      "Antonio Panzeri, Fight Impunity, former Italian MEP, Qatargate ringleader / repenti",
    country: "Italy / European Union",
    location: "Brussels / Italy (Bergamo family proceedings reported)",
    websites: "fightimpunity.com (historical NGO link in press)",
    summary:
      "Former Italian MEP; publicly described as the organisational centre of the EU Parliament “Qatargate” cash-for-influence network. Arrested December 2022; large cash finds reported at related addresses (press: hundreds of thousands of euros). Founded / led NGO “Fight Impunity,” which Belgian investigators linked to the probe. Entered a cooperation / plea arrangement with Belgian prosecutors (repenti) — agreed to detail the network, payments and persons allegedly bribed in return for sentencing benefits (BBC / POLITICO). Named Qatar, Morocco and Mauritania influence strands in cooperating statements reported by press. Primary mittäter node linking Eva Kaili, Francesco Giorgi, Andrea Cozzolino and Marc Tarabella on the public record.",
    listedAt: "2026-07-30",
    relatedSlugs: qatargateLinks("pier-antonio-panzeri"),
    cases: [
      {
        id: "pap-qatargate-ringleader",
        title: "Qatargate — alleged network organiser; arrested Dec 2022 (public record)",
        status: "criminal",
        year: 2022,
        jurisdiction: "Belgium / Italy / European Parliament",
      },
      {
        id: "pap-plea-cooperation",
        title: "Cooperation / plea deal with Belgian prosecutors (repenti) — press record",
        description:
          "Agreed to identify bribery channels and persons allegedly paid; used by prosecutors to expand case to Tarabella / Cozzolino.",
        status: "criminal",
        year: 2023,
        jurisdiction: "Belgium",
      },
    ],
  },
  {
    slug: "francesco-giorgi",
    type: "PERSON",
    name: "Francesco Giorgi",
    aliases:
      "Francisco Giorgi, Eva Kaili partner, Panzeri / Cozzolino parliamentary assistant, Qatargate",
    country: "Italy / European Union",
    location: "Brussels",
    summary:
      "Parliamentary assistant; life partner of Eva Kaili. Worked for Pier Antonio Panzeri then Andrea Cozzolino. Arrested December 2022 in the Qatargate raids. Press reported he confessed a role managing cash for the alleged organisation and named further MEPs; sought to exonerate Kaili while admitting his own role (Reuters / Euractiv). Charged with participation in a criminal organisation, corruption and money laundering. Central mittäter link between Kaili and Panzeri’s network.",
    listedAt: "2026-07-30",
    relatedSlugs: qatargateLinks("francesco-giorgi"),
    cases: [
      {
        id: "fg-arrest-confess",
        title: "Qatargate arrest Dec 2022 — reported confession of cash-management role",
        status: "criminal",
        year: 2022,
        jurisdiction: "Belgium / European Parliament",
      },
    ],
  },
  {
    slug: "andrea-cozzolino",
    type: "PERSON",
    name: "Andrea Cozzolino",
    aliases: "Italian MEP S&D, Maghreb delegation, Qatargate, Francesco Giorgi employer",
    country: "Italy / European Union",
    location: "Brussels / Italy",
    summary:
      "Italian MEP (S&D). EP immunity lifted Feb 2023; arrested and charged with corruption, money laundering and participation in a criminal organisation (denies). Succeeded Panzeri on Maghreb-related parliamentary work; employed Francesco Giorgi as assistant. Panzeri’s cooperating statements alleged Cozzolino received large sums (press figures up to hundreds of thousands of euros) to lobby favourably for Qatar — contested. Mittäter on the public Qatargate map.",
    listedAt: "2026-07-30",
    relatedSlugs: qatargateLinks("andrea-cozzolino"),
    cases: [
      {
        id: "ac-arrest-2023",
        title: "Qatargate — immunity lifted; arrested/charged Feb 2023 (denies)",
        status: "criminal",
        year: 2023,
        jurisdiction: "Belgium / European Parliament",
      },
    ],
  },
  {
    slug: "marc-tarabella",
    type: "PERSON",
    name: "Marc Tarabella",
    aliases: "Belgian MEP S&D, Arab Peninsula delegation, Qatargate",
    country: "Belgium / European Union",
    location: "Anthisnes / Brussels",
    summary:
      "Belgian MEP (S&D); former vice-chair of EP delegation for relations with the Arabian Peninsula. EP immunity lifted; arrested Feb 2023 in Anthisnes on corruption / money-laundering / criminal-organisation charges (denies). Panzeri’s cooperating statements alleged Tarabella received cash bribes (press: up to ~€140,000) to adopt positions favourable to non-EU governments — Tarabella rejects this. House searched in presence of EP President Metsola (press). Mittäter on the public Qatargate map.",
    listedAt: "2026-07-30",
    relatedSlugs: qatargateLinks("marc-tarabella"),
    cases: [
      {
        id: "mt-arrest-2023",
        title: "Qatargate — immunity lifted; arrested Feb 2023 (denies)",
        status: "criminal",
        year: 2023,
        jurisdiction: "Belgium / European Parliament",
      },
    ],
  },
  {
    slug: "niccolo-figa-talamanca",
    type: "PERSON",
    name: "Niccolò Figà-Talamanca",
    aliases: "Nicolo Figa Talamanca, No Peace Without Justice, Qatargate NGO strand",
    country: "Italy / European Union",
    location: "Brussels",
    summary:
      "Secretary-General of NGO “No Peace Without Justice.” Arrested December 2022 in the initial Qatargate wave on corruption / criminal-organisation / money-laundering suspicions; denied charges. Later press reported unconditional release / possible investigative misidentification. Retained on the mittäter map as an initially named detainee in the same raid cluster as Panzeri, Giorgi and Kaili — status evolved; verify current Belgian case posture before relying on this extract.",
    listedAt: "2026-07-30",
    relatedSlugs: qatargateLinks("niccolo-figa-talamanca"),
    cases: [
      {
        id: "nft-arrest-2022",
        title: "Qatargate — arrested Dec 2022 with core suspects; later release reported (denies)",
        status: "open",
        year: 2022,
        jurisdiction: "Belgium",
      },
    ],
  },
  {
    slug: "maria-arena",
    type: "PERSON",
    name: "Maria Arena",
    aliases: "Marie Arena, Belgian MEP S&D, Qatargate, Panzeri associate",
    country: "Belgium / European Union",
    location: "Brussels",
    summary:
      "Belgian MEP (S&D); close professional associate of Pier Antonio Panzeri; succeeded him on human-rights subcommittee work. Named repeatedly in Qatargate reporting (undeclared Qatar trip issues; mentioned in arrest-warrant context of Panzeri’s circle). Charged in early 2025 with belonging to a criminal organisation (denies — Wikipedia / POLITICO). Mittäter / associate node on the expanded public map.",
    listedAt: "2026-07-30",
    relatedSlugs: qatargateLinks("maria-arena"),
    cases: [
      {
        id: "ma-charged-2025",
        title: "Qatargate — charged with criminal-organisation membership (2025; denies)",
        status: "criminal",
        year: 2025,
        jurisdiction: "Belgium / European Parliament",
      },
    ],
  },
  {
    slug: "alexandros-kailis",
    type: "PERSON",
    name: "Alexandros Kailis",
    aliases: "Alexandros Kaili, Eva Kaili father, former Greek politician, Qatargate cash find",
    country: "Greece",
    location: "Greece / Brussels (hotel room cash find reported)",
    summary:
      "Father of Eva Kaili; former Greek politician. Press reported cash discoveries linked to his home and hotel room during the December 2022 Qatargate raids (part of the ~€1.5m total seized across addresses). Family mittäter / satellite node on the public raid map — not equivalent to a final conviction; verify Belgian/Greek case posture.",
    listedAt: "2026-07-30",
    relatedSlugs: qatargateLinks("alexandros-kailis"),
    cases: [
      {
        id: "ak-cash-raids-2022",
        title: "Qatargate raids — cash finds linked to father / hotel room (press record)",
        status: "open",
        year: 2022,
        jurisdiction: "Belgium / Greece",
      },
    ],
  },
  {
    slug: "gulf-gold-refinery-fze",
    type: "COMPANY",
    name: "Gulf Gold Refinery / GGR Refining Services",
    aliases:
      "Gulf Gold Refinery FZE, GGR Refining Services, gulfgoldrefinery.com, TLI Global FZE, LinkedIn gulf-gold-refinery-fze",
    principals: "William McKeag (Founder & Chairman on public team page)",
    country: "United Arab Emirates",
    location: "UAE (Dubai / Sharjah SAIF Zone listings in directories; verify current free-zone filing)",
    websites: "gulfgoldrefinery.com, linkedin.com/company/gulf-gold-refinery-fze",
    summary:
      "Precious-metals refining / brokerage marketed via gulfgoldrefinery.com (GGR Refining Services) and LinkedIn company “Gulf Gold Refinery FZE.” Public site claims international-class refining, partner plants, customs clearance and bullion settlement. Complainant file: scam counterparty — multiple entities registered / operating from the same location cluster; brokers working with local crypto facilitators; counterparties who never appear and never pay; forged papers and fake documents; employees allegedly scammed. High-risk gold/crypto hybrid pattern — do not advance metal, crypto or fees without independent assay custody, escrow and free-zone licence verification. Cross-linked to William McKeag (public Founder & Chairman).",
    listedAt: "2026-07-30",
    relatedSlugs: ["william-mckeag"],
    cases: [
      {
        id: "ggr-nonpayment-noface",
        title:
          "Alleged broker/crypto scam pattern — no show, no payment, forged documents (complainant file)",
        status: "open",
        year: 2026,
        jurisdiction: "UAE / International",
      },
      {
        id: "ggr-multi-entity-location",
        title: "Multiple companies alleged at same location / shell stack (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "United Arab Emirates",
      },
      {
        id: "ggr-employee-scam",
        title: "Alleged employee / staff victimisation (complainant file)",
        status: "open",
        year: 2026,
        jurisdiction: "United Arab Emirates",
      },
    ],
  },
  {
    slug: "william-mckeag",
    type: "PERSON",
    name: "William McKeag",
    aliases:
      "William McKaeg, McKeag, Chairman Gulf Gold Refinery / TLI Global FZE, First Formation London shell (alleged)",
    country: "United Arab Emirates / United Kingdom",
    location: "Dubai, UAE (LinkedIn); London formation alleged",
    websites: "gulfgoldrefinery.com, linkedin.com/in/william-mckeag-82a1b12",
    summary:
      "Publicly listed Founder & Chairman of Gulf Gold Refinery / GGR Refining Services and TLI Global FZE (gulfgoldrefinery.com team page; LinkedIn william-mckeag-82a1b12). Markets precious-metals refining and claims of building own refineries in the UAE and region — complainants allege those build-out claims are false. Complainant file (79 user reports): presents a “Foreign Legion” style private-military / security firm narrative that complainants describe as childish / unserious; alleged proximity messaging to Palestine themes; company alleged as a London shell via First Formation; “Foreign Legion” website allegedly fully public without login protection (images openly accessible); bank relationships allegedly obtained by deception; should be treated as high-risk / fake until custody, licences and banking mandates are independently verified. Cross-linked to Gulf Gold Refinery FZE.",
    listedAt: "2026-07-30",
    relatedSlugs: ["gulf-gold-refinery-fze"],
    cases: [
      {
        id: "wm-79-reports",
        title: "79 user reports — alleged fake refinery / shell / non-delivery pattern (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "UAE / United Kingdom / International",
      },
      {
        id: "wm-foreign-legion-shell",
        title:
          "Alleged Foreign Legion façade + First Formation London shell + open unsecured website (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "United Kingdom / International",
      },
      {
        id: "wm-banking-deception",
        title: "Alleged bank relationships obtained by deception (complainant file)",
        status: "open",
        year: 2026,
        jurisdiction: "International",
      },
      {
        id: "wm-uae-refinery-lie",
        title: "Alleged false claims of building own UAE-area refineries (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "United Arab Emirates",
      },
    ],
  },
  {
    slug: "dominion-okikiolu-lawson",
    type: "PERSON",
    name: "Dominion Okikiolu Mobolaji Lawson",
    aliases: "Dom Lawson, Lawson Dominion, DOMINION OKIKIOLU MOBOLAJI LAWSON",
    country: "Nigeria",
    location: "Nigeria (Lagos / FCT Abuja associations on file)",
    summary:
      "Named in editorial complainant files as a consultant and contact / introduction intermediary in cross-border gold-trade outreach. Treat introductions, escrow pitches and counterpart referrals as high-risk until independent mandate, escrow and identity checks are verified. No identity document is published on this profile.",
    sourceLabel: "Editorial complainant file — consultant / contact role",
    listedAt: "2026-07-21",
    amountOwed: 60_000,
    amountOwedCurrency: "USD",
    relatedSlugs: ["hadja"],
    cases: [
      {
        id: "dol-consultant-contacts",
        title: "Consultant / contact introduction role — gold-trade outreach (on file)",
        status: "open",
        jurisdiction: "International",
        year: 2026,
      },
    ],
  },
  {
    slug: "hadja",
    type: "PERSON",
    name: "Hadja",
    aliases: "Jamilah, Jamila, Hadja / Jamilah, Mum's password (file label)",
    country: "Uganda",
    location: "Uganda (associations on file)",
    summary:
      "Named in editorial complainant files as Hadja (also referred to as Jamilah / Jamila) in cross-border gold-trade outreach linked to Dom Lawson and related East Africa counterparties. Previously filed under a credential document labeled “Mum’s password” (content not recovered). Treat related outreach, KYC links and volume/sourcing claims as high-risk until independent mandate and escrow are verified. No identity document is published on this profile.",
    sourceLabel: "Editorial complainant file — Hadja / Jamilah",
    listedAt: "2026-07-21",
    amountOwed: 60_000,
    amountOwedCurrency: "USD",
    relatedSlugs: ["dominion-okikiolu-lawson"],
    cases: [
      {
        id: "hadja-gold-outreach",
        title: "Named intermediary / contact — gold-trade outreach cluster (on file)",
        status: "open",
        jurisdiction: "Uganda / International",
        year: 2026,
      },
    ],
  },
  {
    slug: "daniels-onukrans",
    type: "PERSON",
    name: "Daniels Onukrans",
    aliases:
      "Daniel Onukrans, Google Ads & SEO, Ahead Media (LinkedIn associations), linkedin.com/in/daniels-onukrans-b3565b240",
    country: "Latvia",
    location: "Latvia (LinkedIn); Cyprus outreach mentioned in posts",
    websites: "linkedin.com/in/daniels-onukrans-b3565b240",
    summary:
      "Latvia-based digital marketer presenting as helping businesses get customers via Google Ads and SEO (LinkedIn: daniels-onukrans-b3565b240; free-audit pitches). Associated in posts with Ahead Media web/AI work. Complainant file: scams individuals and companies; uses AI tools; illegally scrapes contact data; unrestricted spam of firms. Treat unsolicited Ads/SEO outreach and “free audit” funnels as high-risk until written mandate, data-source proof and escrow terms are verified.",
    listedAt: "2026-07-30",
    cases: [
      {
        id: "do-scrape-spam-scam",
        title:
          "Alleged AI-assisted illegal scraping, mass firm spam, and Ads/SEO scam pattern (on file)",
        status: "open",
        year: 2026,
        jurisdiction: "Latvia / International",
      },
    ],
  },
];

export const WARNLIST_ENTRIES: WarnlistEntry[] = [
  ...CORE_WARNLIST_ENTRIES,
  ...(INTERPOL_RED_NOTICE_ENTRIES as WarnlistEntry[]),
];
