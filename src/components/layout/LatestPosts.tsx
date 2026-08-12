import Link from "next/link";
import prisma from "@/lib/prisma";
import { publishedPostFeedWhere } from "@/lib/post-feed";

export default async function LatestPosts() {
  const posts = await prisma.post.findMany({
    where: publishedPostFeedWhere,
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true },
  });

  if (posts.length === 0) return null;

  return (
    <section className="pt-10 mt-8 border-t-2 border-foreground">
      <div className="mx-auto max-w-[1200px] w-full">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
          Latest posts
        </h2>
        <ul className="divide-y divide-border border border-border">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="block px-4 py-2.5 text-[13px] font-medium leading-snug hover:bg-muted/50 transition-colors"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
