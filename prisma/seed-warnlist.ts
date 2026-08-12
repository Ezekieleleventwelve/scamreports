/**
 * Optional: sync static warnlist → database (for admin/claims legacy).
 * Public pages read from src/data/warnlist.ts only.
 */
import { PrismaClient } from "@prisma/client";
import { WARNLIST_ENTRIES } from "../src/data/warnlist";

const prisma = new PrismaClient();

async function main() {
  for (const e of WARNLIST_ENTRIES) {
    await prisma.warnlistEntry.upsert({
      where: { slug: e.slug },
      create: {
        slug: e.slug,
        type: e.type,
        name: e.name,
        aliases: e.aliases ?? "",
        websites: e.websites ?? "",
        country: e.country ?? null,
        location: e.location ?? null,
        summary: e.summary,
        sourceLabel: e.sourceLabel ?? null,
        sourceUrl: e.sourceUrl ?? null,
        reportSlug: e.reportSlug ?? null,
        amountOwed: e.amountOwed ?? null,
        amountOwedCurrency: e.amountOwedCurrency ?? "CHF",
        listedAt: new Date(e.listedAt),
        status: "ACTIVE",
      },
      update: {
        type: e.type,
        name: e.name,
        aliases: e.aliases ?? "",
        websites: e.websites ?? "",
        country: e.country ?? null,
        location: e.location ?? null,
        summary: e.summary,
        sourceLabel: e.sourceLabel ?? null,
        sourceUrl: e.sourceUrl ?? null,
        reportSlug: e.reportSlug ?? null,
        amountOwed: e.amountOwed ?? null,
        amountOwedCurrency: e.amountOwedCurrency ?? "CHF",
        listedAt: new Date(e.listedAt),
        status: "ACTIVE",
      },
    });
    console.log(`Warnlist DB sync: ${e.name} (${e.cases.length} cases in static file)`);
  }
  console.log(`Done — ${WARNLIST_ENTRIES.length} entries. Public site uses src/data/warnlist.ts`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
