/** Fallback when a post has no featured image (should be rare after editorial rules). */
export const DEFAULT_POST_COVER = "/images/default-post-cover.svg";

export function hasFeaturedImage(url: string | null | undefined): boolean {
  return Boolean(url?.trim());
}

export function resolveFeaturedImage(url: string | null | undefined): string {
  const trimmed = url?.trim();
  return trimmed || DEFAULT_POST_COVER;
}
