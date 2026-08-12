#!/usr/bin/env npx tsx
/**
 * Multi-register OSINT scan (CH ZEFIX links, UK Companies House, OpenCorporates).
 *
 * Usage:
 *   npx tsx scripts/osint-register-scan.ts --query "Swiss Capital Club" --scope ALL
 *   npx tsx scripts/osint-register-scan.ts --query "01234567" --scope UK
 *   npx tsx scripts/osint-register-scan.ts --query "CHE-115.852.432" --scope CH
 *   npx tsx scripts/osint-register-scan.ts --catalog
 *
 * Writes drafts to osint-drafts/ (gitignored). Does NOT auto-publish to warnlist.
 */
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import {
  PUBLIC_REGISTER_CATALOG,
  runRegisterOsintScan,
} from "../src/lib/osint/registers";
import { draftArticleMarkdown, draftWarnlistStub } from "../src/lib/osint/draft";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  if (i === -1) return undefined;
  return process.argv[i + 1];
}

function hasFlag(name: string): boolean {
  return process.argv.includes(name);
}

async function main() {
  if (hasFlag("--catalog") || hasFlag("-c")) {
    console.log("Public register catalogue:\n");
    for (const r of PUBLIC_REGISTER_CATALOG) {
      console.log(`- [${r.jurisdiction}] ${r.name}`);
      console.log(`  ${r.homeUrl}`);
      console.log(`  ${r.notes}`);
      if (r.liveAdapter) console.log(`  live adapter: ${r.liveAdapter}`);
      console.log("");
    }
    return;
  }

  const query = arg("--query") || arg("-q");
  if (!query) {
    console.error(
      "Usage: npx tsx scripts/osint-register-scan.ts --query \"Company Name\" [--scope CH|UK|ALL]"
    );
    process.exit(1);
  }
  const scope = (arg("--scope") || arg("-s") || "ALL").toUpperCase();

  console.log(`Scanning registers for "${query}" (scope=${scope})…`);
  const scan = await runRegisterOsintScan(query, scope as "CH" | "UK" | "ALL");

  const outDir = join(process.cwd(), "osint-drafts");
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const base = `${stamp}-${query.replace(/[^\w.-]+/g, "-").slice(0, 40)}`;

  const jsonPath = join(outDir, `${base}.json`);
  const mdPath = join(outDir, `${base}.md`);
  const tsPath = join(outDir, `${base}.warnlist-stubs.ts`);

  writeFileSync(jsonPath, JSON.stringify(scan, null, 2));
  writeFileSync(mdPath, draftArticleMarkdown(scan));

  const stubs: string[] = [
    "/** AUTO-DRAFT — review before copying into src/data/warnlist.ts */",
    "",
  ];
  for (const co of scan.companies) {
    stubs.push(draftWarnlistStub(co));
    for (const p of co.persons.slice(0, 12)) {
      stubs.push(draftWarnlistStub(co, p));
    }
  }
  writeFileSync(tsPath, stubs.join("\n") + "\n");

  console.log(`Companies: ${scan.companies.length}`);
  console.log(`Person search packs: ${scan.personHits.length}`);
  for (const n of scan.notes) console.log(`Note: ${n}`);
  console.log(`Wrote:\n  ${jsonPath}\n  ${mdPath}\n  ${tsPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
