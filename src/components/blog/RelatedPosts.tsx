import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface RelatedPost {
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: Date | null;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-bold mb-6">Related Reports</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="block rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-medium text-sm line-clamp-2 mb-2">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {post.excerpt}
              </p>
            )}
            <time className="text-xs text-muted-foreground">
              {post.publishedAt ? formatDate(post.publishedAt) : ""}
            </time>
          </Link>
        ))}
      </div>
    </section>
  );
}
