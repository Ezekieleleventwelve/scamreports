import type { OsintScanResult, RegisterCompany, RegisterPerson } from "./types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function draftWarnlistStub(company: RegisterCompany, person?: RegisterPerson): string {
  const name = person?.name || company.name;
  const type = person ? "PERSON" : "COMPANY";
  const slug = slugify(
    person ? `${person.name}-${company.registryId || company.name}` : company.name
  );
  const today = new Date().toISOString().slice(0, 10);
  const role = person?.role ? ` Role: ${person.role}.` : "";
  const summary = [
    `OSINT register draft — ${name}.${role}`,
    `Linked company: ${company.name}${company.registryId ? ` (${company.registryId})` : ""}.`,
    `Jurisdiction: ${company.jurisdiction}. Source: ${company.source}.`,
    company.sourceUrl ? `Register: ${company.sourceUrl}.` : "",
    "Status: DRAFT — verify officers, news hits, and complainant file before publishing.",
  ]
    .filter(Boolean)
    .join(" ");

  return `  {
    slug: "${slug}",
    type: "${type}",
    name: ${JSON.stringify(name)},
    aliases: ${JSON.stringify(
      [company.name, company.registryId, company.number, person?.role].filter(Boolean).join(", ")
    )},
    country: ${JSON.stringify(countryGuess(company))},
    location: ${JSON.stringify(company.address || company.jurisdiction)},
    ${company.jurisdiction === "CH" && company.registryId ? `uid: ${JSON.stringify(company.registryId)},` : ""}
    websites: "",
    summary:
      ${JSON.stringify(summary)},
    listedAt: "${today}",
    cases: [
      {
        id: "${slug}-osint-draft",
        title: "OSINT register draft — pending editorial verification",
        status: "open",
        year: ${new Date().getFullYear()},
        jurisdiction: ${JSON.stringify(company.jurisdiction)},
      },
    ],
  },`;
}

function countryGuess(c: RegisterCompany): string {
  const map: Record<string, string> = {
    CH: "Switzerland",
    UK: "United Kingdom",
    US: "United States",
    DE: "Germany",
    FR: "France",
    AT: "Austria",
    NL: "Netherlands",
    IE: "Ireland",
    AU: "Australia",
    CA: "Canada",
    SG: "Singapore",
  };
  return map[c.jurisdiction] || c.jurisdiction;
}

export function draftArticleMarkdown(scan: OsintScanResult): string {
  const lines: string[] = [];
  lines.push(`# OSINT register scan: ${scan.query}`);
  lines.push("");
  lines.push(`Scanned at: ${scan.scannedAt}`);
  lines.push("");
  lines.push(`> **DRAFT — do not publish without counsel/editorial review.**`);
  lines.push("");
  if (scan.notes.length) {
    lines.push("## Notes");
    for (const n of scan.notes) lines.push(`- ${n}`);
    lines.push("");
  }
  lines.push("## Companies");
  for (const c of scan.companies) {
    lines.push(`### ${c.name}`);
    lines.push(`- Jurisdiction: **${c.jurisdiction}**`);
    if (c.registryId || c.number) lines.push(`- Registry ID: \`${c.registryId || c.number}\``);
    if (c.status) lines.push(`- Status: ${c.status}`);
    if (c.address) lines.push(`- Address: ${c.address}`);
    if (c.sourceUrl) lines.push(`- Source: [${c.source}](${c.sourceUrl})`);
    else lines.push(`- Source: ${c.source}`);
    if (c.persons.length) {
      lines.push(`- Officers / persons (${c.persons.length}):`);
      for (const p of c.persons) {
        lines.push(`  - **${p.name}**${p.role ? ` — ${p.role}` : ""}${p.appointedOn ? ` (from ${p.appointedOn})` : ""}`);
      }
    } else {
      lines.push(`- Officers: _open register UI / enable API key to extract_`);
    }
    lines.push("");
  }
  lines.push("## Suggested web searches (open manually)");
  const seen = new Set<string>();
  for (const ph of scan.personHits) {
    for (const s of ph.searches) {
      if (seen.has(s.href)) continue;
      seen.add(s.href);
      lines.push(`- [${ph.person.name} / ${ph.companyName}](${s.href})`);
    }
  }
  lines.push("");
  lines.push("## Next steps");
  lines.push("1. Open register deep links and confirm officers.");
  lines.push("2. Review news / warning hits from the search pack.");
  lines.push("3. Attach complainant file amounts / case IDs.");
  lines.push("4. Promote selected stubs from `osint-drafts/*.ts` into `src/data/warnlist.ts`.");
  lines.push("");
  return lines.join("\n");
}
