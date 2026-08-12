import { PrismaClient } from "@prisma/client";
import { data as batch1 } from "./translations/batch1";
import { data as batch2a } from "./translations/batch2a";
import { data as batch2b } from "./translations/batch2b";
import { data as batch3 } from "./translations/batch3";
import { data as batch4a } from "./translations/batch4a";
import { data as batch4b } from "./translations/batch4b";

const prisma = new PrismaClient();
const all = { ...batch1, ...batch2a, ...batch2b, ...batch3, ...batch4a, ...batch4b };

async function main() {
  let count = 0;
  for (const [slug, translations] of Object.entries(all)) {
    await prisma.post.update({
      where: { slug },
      data: { translations: JSON.stringify(translations) },
    });
    count++;
    console.log(`[${count}/${Object.keys(all).length}] Updated: ${slug}`);
  }
  console.log(`\nDone! Updated translations for ${count} posts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
