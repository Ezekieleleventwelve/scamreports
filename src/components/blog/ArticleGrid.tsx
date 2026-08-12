import ArticleCard from "./ArticleCard";
import Link from "next/link";
import type { PostWithAuthor } from "@/types";
import { getDictionary, t } from "@/lib/i18n";
import { getPostTranslation } from "@/lib/i18n/post";
import type { Locale } from "@/lib/i18n/types";

interface ArticleGridProps {
  posts: PostWithAuthor[];
  locale?: Locale;
}

export default async function ArticleGrid({ posts, locale }: ArticleGridProps) {
  const dict = await getDictionary(locale);
  const l = locale || "en";

  if (posts.length === 0) {
    return (
      <div className="border border-border p-12 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-muted mb-4">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-[15px] font-bold tracking-[-0.01em] mb-1">
          {t(dict, "home.noReports")}
        </h3>
        <p className="text-[13px] text-muted-foreground mb-4">
          {t(dict, "home.noReports")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      {posts.map((post) => {
        const translated = getPostTranslation(post, l);
        return (
          <div key={post.id} className="pb-6 border-b border-border lg:border-b-0">
            <ArticleCard
              title={translated.title}
              slug={post.slug}
              excerpt={translated.excerpt}
              featuredImage={post.featuredImage}
              category={post.category}
              publishedAt={post.publishedAt}
              readingTime={post.readingTime}
              commentCount={post._count?.comments || 0}
              dict={dict}
            />
          </div>
        );
      })}
    </div>
  );
}
