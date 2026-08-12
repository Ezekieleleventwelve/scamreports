/**
 * Backfill featuredImage from image1 when missing.
 * Run: npx tsx prisma/seed-fix-featured-images.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    select: { id: true, slug: true, featuredImage: true, image1: true },
  });

  let fixed = 0;
  for (const post of posts) {
    if (post.featuredImage?.trim()) continue;
    const fallback = post.image1?.trim();
    if (!fallback) continue;
    await prisma.post.update({
      where: { id: post.id },
      data: { featuredImage: fallback },
    });
    console.log(`featuredImage ← image1: ${post.slug}`);
    fixed++;
  }
  console.log(`Done. Updated ${fixed} post(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
