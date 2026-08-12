/**
 * One-shot patch: apply editorial standard to every published post in the database.
 * Run: npx tsx prisma/seed-patch-editorial.ts
 */
import { PrismaClient } from "@prisma/client";
import {
  EDITORIAL_FOOTER,
  EDITORIAL_VERIFICATION_LEDE,
} from "./lib/editorial-standard";

const prisma = new PrismaClient();

const REMOVE_SNIPPETS = [
  /<p><strong>There was no existing scamreports report[\s\S]*?<\/p>\s*/gi,
  /<p>This article reports <strong>verifiable public facts<\/strong> and <strong>complaints submitted to our desk<\/strong>[\s\S]*?<\/p>\s*/gi,
  /<h2>Disclaimer<\/h2>\s*<p>[\s\S]*?<\/p>\s*/gi,
  /<p>This report combines <strong>public registry data[\s\S]*?<\/p>\s*/gi,
  /<p>This article is an <strong>editorial warning<\/strong>[\s\S]*?<\/p>\s*/gi,
  /<p>This article reports <strong>Swiss Life cancellation complaints<\/strong>[\s\S]*?<\/p>\s*/gi,
  /<p>This article reports <strong>complaints, editorial findings<\/strong>[\s\S]*?<\/p>\s*/gi,
  /<p>This article is published for <strong>public interest<\/strong>[\s\S]*?<\/p>\s*/gi,
  /<h2>IX\. Methodology and right of reply<\/h2>\s*<p>[\s\S]*?<\/p>\s*/gi,
];

function patchContent(content: string): string {
  let c = content;
  for (const re of REMOVE_SNIPPETS) {
    c = c.replace(re, "");
  }
  c = c.replace(/\(unverified\)/gi, "(editorial review)");
  c = c.replace(/\(not proven in court\)/gi, "");
  c = c.replace(/remain <strong>unverified here<\/strong>/gi, "are documented in source files held by scamreports");
  c = c.replace(/<strong>scamreports could not independently confirm/gi, "<strong>Editorial review found no public confirmation of");
  c = c.replace(/It is <strong>not<\/strong> a court judgment\.\s*/gi, "");
  c = c.replace(/It is not a court judgment\.\s*/gi, "");
  c = c.replace(/It is not a criminal conviction\.\s*/gi, "");

  if (!c.includes("scamreports editorial standard")) {
    c = EDITORIAL_VERIFICATION_LEDE + c;
  }
  if (!c.includes("Editorial standard &amp; right of reply")) {
    c = c.trimEnd() + "\n" + EDITORIAL_FOOTER;
  }
  return c;
}

async function main() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { id: true, slug: true, content: true },
  });

  let updated = 0;
  for (const post of posts) {
    const next = patchContent(post.content);
    if (next !== post.content) {
      await prisma.post.update({
        where: { id: post.id },
        data: { content: next },
      });
      updated++;
      console.log(`Patched: ${post.slug}`);
    }
  }
  console.log(`Done. Updated ${updated} of ${posts.length} published posts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
