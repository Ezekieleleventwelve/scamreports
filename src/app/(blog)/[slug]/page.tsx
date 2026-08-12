import { notFound, redirect } from "next/navigation";
import {
  POST_SLUG_TO_WARNLIST_SLUG,
  publishedPostFeedWhere,
  WARNLIST_REGISTRY_POST_SLUGS,
} from "@/lib/post-feed";
import PostCoverImage from "@/components/blog/PostCoverImage";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { generatePostMetadata, generateArticleJsonLd } from "@/lib/seo";
import { formatDate, parseTags } from "@/lib/utils";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CommentSection from "@/components/blog/CommentSection";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";
import InArticleAd from "@/components/ads/InArticleAd";
import AdBanner from "@/components/ads/AdBanner";
import Link from "next/link";
import { getLocale, getDictionary, t } from "@/lib/i18n";
import { getPostTranslation } from "@/lib/i18n/post";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });
  return post;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return generatePostMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if ((WARNLIST_REGISTRY_POST_SLUGS as readonly string[]).includes(slug)) {
    redirect("/scamreport/warnlist");
  }
  const warnlistSlug = POST_SLUG_TO_WARNLIST_SLUG[slug];
  if (warnlistSlug) redirect(`/scamreport/warnlist/${warnlistSlug}`);

  const post = await getPost(slug);
  if (!post) notFound();

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  // Increment view count
  await prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  });

  // Get related posts
  const relatedPosts = await prisma.post.findMany({
    where: {
      ...publishedPostFeedWhere,
      id: { not: post.id },
      categoryId: post.categoryId || undefined,
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  });

  const translated = getPostTranslation(post, locale);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const postUrl = `${siteUrl}/${post.slug}`;
  const tags = parseTags(post.tags);
  const keywords = parseTags(post.keywords);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...(post.category
      ? [{ name: post.category.name, href: `/category/${post.category.slug}` }]
      : []),
  ];

  // Split content into 4 sections for image + ad insertion at fixed positions
  const contentParts = translated.content.split("</p>").filter(Boolean);
  const total = contentParts.length;
  const p1 = Math.max(1, Math.floor(total * 0.25));  // after intro (~25%)
  const p2 = Math.floor(total * 0.5);                  // mid-article (~50%)
  const p3 = Math.floor(total * 0.75);                 // near end (~75%)

  const section1 = contentParts.slice(0, p1).join("</p>") + "</p>";
  const section2 = contentParts.slice(p1, p2).join("</p>") + "</p>";
  const section3 = contentParts.slice(p2, p3).join("</p>") + "</p>";
  const section4 = contentParts.slice(p3).join("</p>");

  const articleImages = [post.image1, post.image2, post.image3];

  return (
    <>
      <JsonLd data={generateArticleJsonLd(post)} />

      <div className="mx-auto max-w-[1200px] w-full px-5 lg:px-8 py-10">
          <article className="w-full max-w-none">
            {/* Article header */}
            <div className="mb-8 pb-8 border-b border-border">
              <Breadcrumbs items={breadcrumbs} />

              <header className="mt-6">
                {post.category && (
                  <Link
                    href={`/category/${post.category.slug}`}
                    className="text-[11px] font-bold text-primary uppercase tracking-widest hover:underline"
                  >
                    {post.category.name}
                  </Link>
                )}
                <h1 className="text-[30px] sm:text-[40px] font-black tracking-[-0.015em] leading-[1.1] mt-3 mb-4">
                  {translated.title}
                </h1>
                {post.excerpt && (
                  <p className="text-[16px] text-muted-foreground leading-relaxed mb-5">
                    {translated.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground pt-4 border-t border-border">
                  <time dateTime={post.publishedAt?.toISOString()}>
                    {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
                  </time>
                  <span className="w-px h-3 bg-border" />
                  <span>{post.readingTime} {t(dict, "article.readingTime")}</span>
                  <span className="w-px h-3 bg-border" />
                  <span>{post.viewCount} {t(dict, "article.views")}</span>
                </div>
              </header>
            </div>
        <div className="mb-10 overflow-hidden border border-border">
          <PostCoverImage
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto max-h-[520px] object-cover"
            loading="eager"
          />
        </div>

        {/* Ad before content */}
        <AdBanner
          slot="above-content"
          format="horizontal"
          className="mb-10 min-h-[90px]"
        />

        {/* Section 1 — intro */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: section1 }}
        />

        {/* Image 1 — after intro */}
        {articleImages[0] && (
          <figure className="my-8 overflow-hidden border border-border">
            <img src={articleImages[0]} alt="" className="w-full h-auto" loading="lazy" />
          </figure>
        )}

        {/* Section 2 */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: section2 }}
        />

        {/* Image 2 — mid-article */}
        {articleImages[1] && (
          <figure className="my-8 overflow-hidden border border-border">
            <img src={articleImages[1]} alt="" className="w-full h-auto" loading="lazy" />
          </figure>
        )}

        <InArticleAd />

        {/* Section 3 */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: section3 }}
        />

        {/* Image 3 — near end */}
        {articleImages[2] && (
          <figure className="my-8 overflow-hidden border border-border">
            <img src={articleImages[2]} alt="" className="w-full h-auto" loading="lazy" />
          </figure>
        )}

        {/* Section 4 — conclusion */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: section4 }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-border">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-muted px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="mb-8 pb-8 border-b border-border">
          <ShareButtons url={postUrl} title={post.title} />
        </div>

        {/* Claim — identity required */}
        <div className="mb-10 pb-8 border-b border-border">
          <div className="border-2 border-foreground p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider mb-2">
                  Named in this report?
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed max-w-lg">
                  To request a review, correction, or removal, you must identify
                  yourself with your full legal name, contact details, and postal
                  address. False claims may have legal consequences.
                </p>
              </div>
              <Link
                href={`/claim/${post.id}`}
                className="shrink-0 px-6 py-3 text-[12px] font-bold uppercase tracking-wider border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors text-center"
              >
                File a claim &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />

        {/* Comments */}
        <CommentSection postId={post.id} />

        {/* Bottom Ad */}
        <AdBanner
          slot="below-comments"
          format="horizontal"
          className="mt-10 min-h-[90px]"
        />
          </article>
      </div>

      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
    </>
  );
}
