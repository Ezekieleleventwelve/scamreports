/**
 * Wendel Vieira Gomez — warnlist only (no blog post).
 * Run: npx tsx prisma/seed-wendel-vieira-gomez.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const POST_SLUG = "wendel-vieira-gomez-tessin-luftfahrt-firmengruendung-vorwuerfe";

async function main() {
  const { count } = await prisma.post.deleteMany({ where: { slug: POST_SLUG } });
  console.log(
    count
      ? `Deleted blog post /${POST_SLUG}. Entry is on /warnlist/wendel-vieira-gomez only.`
      : `No blog post found for ${POST_SLUG} (already removed).`
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
