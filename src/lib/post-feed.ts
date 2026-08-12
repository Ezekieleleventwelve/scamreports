import type { Prisma } from "@prisma/client";

/**
 * FINMA firm website dossiers belong on /warnlist only — not as separate blog posts.
 */
export const FINMA_WARNLIST_ONLY_POST_SLUGS = [
  "immostich-sa-finma-warning-wealth-management-investigation",
  "ruetli-finanz-holding-finma-warning-investigation",
  "alpenstark-bank-finma-warning-fake-digital-bank-investigation",
  "finosio-finma-warning-revolut-clone-bank-investigation",
  "eisenberg-bank-ag-finma-warning-fake-festgeld-investigation",
] as const;

/** Registry / roundup posts — content lives on /warnlist, not the main feed. */
export const WARNLIST_REGISTRY_POST_SLUGS = [
  "finma-warning-list-five-recent-unauthorised-firms-may-2026",
] as const;

export const EXCLUDED_FROM_POST_FEED_SLUGS = [
  ...FINMA_WARNLIST_ONLY_POST_SLUGS,
  ...WARNLIST_REGISTRY_POST_SLUGS,
] as const;

export const POST_SLUG_TO_WARNLIST_SLUG: Record<string, string> = {
  "immostich-sa-finma-warning-wealth-management-investigation": "immostich-sa",
  "ruetli-finanz-holding-finma-warning-investigation": "ruetli-finanz-holding-ag",
  "alpenstark-bank-finma-warning-fake-digital-bank-investigation": "alpenstark-bank",
  "finosio-finma-warning-revolut-clone-bank-investigation": "finosio",
  "eisenberg-bank-ag-finma-warning-fake-festgeld-investigation": "eisenberg-bank-ag",
};

const featuredImageRequired: Prisma.PostWhereInput = {
  featuredImage: { not: null },
  NOT: { featuredImage: "" },
};

/** Published investigations for blog feeds (no warnlist/registry posts). */
export const publishedPostFeedWhere: Prisma.PostWhereInput = {
  status: "PUBLISHED",
  slug: { notIn: [...EXCLUDED_FROM_POST_FEED_SLUGS] },
};

/** Homepage & hero: investigations only, each with an Anzeigebild. */
export const majorPostFeedWhere: Prisma.PostWhereInput = {
  ...publishedPostFeedWhere,
  ...featuredImageRequired,
};
