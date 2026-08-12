"use client";

import { useState } from "react";
import Link from "next/link";
import PostCoverImage from "@/components/blog/PostCoverImage";
import type { Dictionary } from "@/lib/i18n/types";

interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  category: { name: string; slug: string } | null;
  publishedAt: string | null;
  readingTime: number;
  commentCount: number;
}

interface Props {
  posts: PostData[];
  dict: Dictionary;
}

function t(dict: Dictionary, key: string, params?: Record<string, unknown>): string {
  const keys = key.split(".");
  let val: unknown = dict;
  for (const k of keys) {
    if (val && typeof val === "object") val = (val as Record<string, unknown>)[k];
    else return key;
  }
  if (typeof val !== "string") return key;
  if (params) {
    return val.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
  }
  return val;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostListWithToggle({ posts, dict }: Props) {
  const [view, setView] = useState<"list" | "grid">("list");

  if (posts.length === 0) {
    return (
      <div className="border border-border p-12 text-center">
        <h3 className="text-[15px] font-bold tracking-[-0.01em] mb-1">
          {t(dict, "home.noReports")}
        </h3>
        <p className="text-[13px] text-muted-foreground mt-4">
          {t(dict, "home.noReports")}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex items-center gap-1 mb-6">
        <button
          onClick={() => setView("list")}
          className={`p-2 border transition-colors ${
            view === "list"
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-muted-foreground border-border hover:text-foreground"
          }`}
          title="List view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="1" y1="3" x2="15" y2="3" />
            <line x1="1" y1="8" x2="15" y2="8" />
            <line x1="1" y1="13" x2="15" y2="13" />
          </svg>
        </button>
        <button
          onClick={() => setView("grid")}
          className={`p-2 border transition-colors ${
            view === "grid"
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-muted-foreground border-border hover:text-foreground"
          }`}
          title="Grid view"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="5.5" height="5.5" />
            <rect x="9.5" y="1" width="5.5" height="5.5" />
            <rect x="1" y="9.5" width="5.5" height="5.5" />
            <rect x="9.5" y="9.5" width="5.5" height="5.5" />
          </svg>
        </button>
      </div>

      {view === "grid" ? (
        /* Grid view */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => {
            const catLabel = post.category
              ? t(dict, `cat.${post.category.slug}`) !== `cat.${post.category.slug}`
                ? t(dict, `cat.${post.category.slug}`)
                : post.category.name
              : null;

            return (
              <article
                key={post.id}
                className="article-card group border border-border bg-card overflow-hidden"
              >
                <Link href={`/${post.slug}`}>
                  <div className="aspect-[2/1] overflow-hidden bg-muted">
                    <PostCoverImage
                      src={post.featuredImage}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    {post.category && (
                      <Link
                        href={`/category/${post.category.slug}`}
                        className="official-badge hover:bg-primary hover:text-white transition-colors"
                      >
                        {catLabel}
                      </Link>
                    )}
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                      {post.publishedAt ? formatDate(post.publishedAt) : t(dict, "article.draft")}
                    </span>
                  </div>
                  <Link href={`/${post.slug}`}>
                    <h2 className="text-[17px] font-bold leading-snug mb-2 tracking-[-0.02em] group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  {post.excerpt && (
                    <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-[11px] text-muted-foreground tracking-wide">
                      {post.readingTime} {t(dict, "article.minRead")}
                    </span>
                    <Link
                      href={`/${post.slug}`}
                      className="text-[11px] font-bold text-primary tracking-wide uppercase hover:underline"
                    >
                      {t(dict, "article.readReport")} &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* List view — one row per article */
        <div className="divide-y divide-border border border-border">
          {posts.map((post) => {
            const catLabel = post.category
              ? t(dict, `cat.${post.category.slug}`) !== `cat.${post.category.slug}`
                ? t(dict, `cat.${post.category.slug}`)
                : post.category.name
              : null;

            return (
              <article
                key={post.id}
                className="group flex items-center gap-5 p-4 hover:bg-muted/50 transition-colors"
              >
                {/* Thumbnail */}
                <Link href={`/${post.slug}`} className="shrink-0">
                  <div className="w-[120px] h-[72px] overflow-hidden bg-muted border border-border">
                    <PostCoverImage
                      src={post.featuredImage}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {post.category && (
                      <Link
                        href={`/category/${post.category.slug}`}
                        className="official-badge hover:bg-primary hover:text-white transition-colors"
                      >
                        {catLabel}
                      </Link>
                    )}
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                      {post.publishedAt ? formatDate(post.publishedAt) : t(dict, "article.draft")}
                    </span>
                  </div>
                  <Link href={`/${post.slug}`}>
                    <h2 className="text-[15px] font-bold leading-snug tracking-[-0.02em] group-hover:text-primary transition-colors truncate">
                      {post.title}
                    </h2>
                  </Link>
                  {post.excerpt && (
                    <p className="text-[12px] text-muted-foreground leading-relaxed truncate mt-1">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* Meta */}
                <div className="shrink-0 hidden sm:flex items-center gap-4">
                  <span className="text-[11px] text-muted-foreground tracking-wide whitespace-nowrap">
                    {post.readingTime} {t(dict, "article.minRead")}
                  </span>
                  <Link
                    href={`/${post.slug}`}
                    className="text-[11px] font-bold text-primary tracking-wide uppercase hover:underline whitespace-nowrap"
                  >
                    {t(dict, "article.readReport")} &rarr;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
