import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { majorPostFeedWhere } from "@/lib/post-feed";
import ArticleGrid from "@/components/blog/ArticleGrid";
import AdBanner from "@/components/ads/AdBanner";
import { generateSiteMetadata } from "@/lib/seo";
import type { PostWithAuthor } from "@/types";
import { getLocale, getDictionary, t } from "@/lib/i18n";
import Link from "next/link";

const POSTS_PER_PAGE = 12;

interface PageProps {
  params: Promise<{ cat: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { cat } = await params;
  const category = await prisma.category.findUnique({
    where: { slug: cat },
  });
  if (!category) return { title: "Category Not Found" };
  return generateSiteMetadata(
    category.name,
    `Browse all ${category.name} scam reports. ${category.description || ""}`
  );
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { cat } = await params;
  const sp = await searchParams;
  const currentPage = Math.max(1, parseInt(sp.page || "1", 10));

  const category = await prisma.category.findUnique({
    where: { slug: cat },
  });
  if (!category) notFound();

  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const catName = t(dict, `cat.${category.slug}`) !== `cat.${category.slug}` ? t(dict, `cat.${category.slug}`) : category.name;

  const categoryWhere = { ...majorPostFeedWhere, categoryId: category.id };
  const totalPosts = await prisma.post.count({
    where: categoryWhere,
  });
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  const posts = (await prisma.post.findMany({
    where: categoryWhere,
    orderBy: { publishedAt: "desc" },
    skip: (currentPage - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: { select: { id: true, name: true, slug: true } },
      _count: { select: { comments: true } },
    },
  })) as PostWithAuthor[];

  const baseUrl = `/category/${cat}`;

  return (
    <div className="mx-auto max-w-[1200px] px-5 lg:px-8 py-8">
      <AdBanner
        slot="category-top"
        format="horizontal"
        className="mb-8 min-h-[90px]"
      />

      <ArticleGrid posts={posts} locale={locale} />

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 pt-8 mt-8 border-t border-border">
          {currentPage > 1 && (
            <Link
              href={currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`}
              className="px-4 py-2 text-[12px] font-bold uppercase tracking-wider border border-border hover:border-foreground transition-colors"
            >
              &larr; Previous
            </Link>
          )}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;
                return (
                  <span key={p} className="flex items-center">
                    {showEllipsis && <span className="px-1 text-muted-foreground">...</span>}
                    <Link
                      href={p === 1 ? baseUrl : `${baseUrl}?page=${p}`}
                      className={`w-9 h-9 flex items-center justify-center text-[12px] font-medium transition-colors ${
                        p === currentPage
                          ? "bg-foreground text-background"
                          : "hover:bg-muted"
                      }`}
                    >
                      {p}
                    </Link>
                  </span>
                );
              })}
          </div>
          {currentPage < totalPages && (
            <Link
              href={`${baseUrl}?page=${currentPage + 1}`}
              className="px-4 py-2 text-[12px] font-bold uppercase tracking-wider border border-border hover:border-foreground transition-colors"
            >
              Next &rarr;
            </Link>
          )}
        </nav>
      )}

      <AdBanner
        slot="category-bottom"
        format="horizontal"
        className="mt-8 min-h-[90px]"
      />
    </div>
  );
}
