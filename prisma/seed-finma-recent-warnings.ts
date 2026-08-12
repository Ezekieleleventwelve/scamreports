/**
 * FINMA roundup belongs on /warnlist only — remove from blog posts.
 * Run: npx tsx prisma/seed-finma-recent-warnings.ts
 */
import { PrismaClient } from "@prisma/client";
import { WARNLIST_REGISTRY_POST_SLUGS } from "../src/lib/post-feed";

const prisma = new PrismaClient();

async function main() {
  const { count } = await prisma.post.deleteMany({
    where: { slug: { in: [...WARNLIST_REGISTRY_POST_SLUGS] } },
  });
  console.log(`Removed ${count} warnlist registry post(s) from blog feed.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
