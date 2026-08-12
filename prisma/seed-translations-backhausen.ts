import { PrismaClient } from "@prisma/client";
import { data as batch1 } from "./translations/backhausen-batch1";
import { data as batch2 } from "./translations/backhausen-batch2";
import { data as batch3 } from "./translations/backhausen-batch3";

const prisma = new PrismaClient();
const all = { ...batch1, ...batch2, ...batch3 };

const slug = "alleged-fraudulent-operations-martin-backhausen-david-el-dib-bitclub-laetitude-swapoo";

async function main() {
  await prisma.post.update({
    where: { slug },
    data: { translations: JSON.stringify(all) },
  });
  console.log(`Updated translations for: ${slug}`);
  console.log(`Languages: ${Object.keys(all).join(", ")}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
