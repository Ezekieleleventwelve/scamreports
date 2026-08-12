import Link from "next/link";
import SidebarAd from "@/components/ads/SidebarAd";
import prisma from "@/lib/prisma";
import { publishedPostFeedWhere } from "@/lib/post-feed";

export default async function Sidebar() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: "asc" },
  });

  const recentPosts = await prisma.post.findMany({
    where: publishedPostFeedWhere,
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: { title: true, slug: true, publishedAt: true },
  });

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div className="rounded-xl border border-border p-5">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/category/${cat.slug}`}
                className="flex items-center justify-between text-sm hover:text-primary transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                  {cat._count.posts}
                </span>
              </Link>
            </li>
          ))}
          {categories.length === 0 && (
            <li className="text-sm text-muted-foreground">
              No categories yet
            </li>
          )}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="rounded-xl border border-border p-5">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
          Recent Reports
        </h3>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/${post.slug}`}
                className="block text-sm hover:text-primary transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
            </li>
          ))}
          {recentPosts.length === 0 && (
            <li className="text-sm text-muted-foreground">No reports yet</li>
          )}
        </ul>
      </div>

      {/* Ad Slot */}
      <SidebarAd />
    </aside>
  );
}
