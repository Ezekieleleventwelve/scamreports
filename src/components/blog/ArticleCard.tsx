import Link from "next/link";
import PostCoverImage from "@/components/blog/PostCoverImage";
import { formatDate } from "@/lib/utils";
import { t } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: { name: string; slug: string } | null;
  publishedAt: Date | null;
  readingTime: number;
  commentCount?: number;
  dict?: Dictionary;
}

export default function ArticleCard({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  publishedAt,
  readingTime,
  commentCount = 0,
  dict = {},
}: ArticleCardProps) {
  const catLabel = category ? (t(dict, `cat.${category.slug}`) !== `cat.${category.slug}` ? t(dict, `cat.${category.slug}`) : category.name) : null;

  return (
    <article className="article-card group">
      <Link href={`/${slug}`}>
        <div className="aspect-[3/2] overflow-hidden bg-muted mb-3">
          <PostCoverImage src={featuredImage} alt={title} className="h-full w-full object-cover" />
        </div>
      </Link>
      <div>
        <div className="flex items-center gap-2 mb-2">
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
            >
              {catLabel}
            </Link>
          )}
          <span className="text-[11px] text-muted-foreground">
            {publishedAt ? formatDate(publishedAt) : t(dict, "article.draft")}
          </span>
        </div>

        <Link href={`/${slug}`}>
          <h2 className="text-[17px] font-bold leading-snug mb-1.5 tracking-[-0.02em] group-hover:text-muted-foreground transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>

        {excerpt && (
          <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3 mb-3">
            {excerpt}
          </p>
        )}

        <span className="text-[11px] text-muted-foreground">
          {readingTime} {t(dict, "article.minRead")}
        </span>
      </div>
    </article>
  );
}
