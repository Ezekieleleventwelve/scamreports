/**
 * FINMA firm websites are warnlist-only — no separate blog posts.
 * Run: npx tsx prisma/seed-finma-firm-reports.ts
 */
import { PrismaClient } from "@prisma/client";
import { FINMA_WARNLIST_ONLY_POST_SLUGS } from "../src/lib/post-feed";

const prisma = new PrismaClient();

async function main() {
  const { count } = await prisma.post.deleteMany({
    where: { slug: { in: [...FINMA_WARNLIST_ONLY_POST_SLUGS] } },
  });
  console.log(
    `Removed ${count} FINMA website post(s). Entries remain on /warnlist — run: npx tsx prisma/seed-warnlist.ts`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
