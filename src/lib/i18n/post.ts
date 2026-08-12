import type { Locale } from "./types";

interface PostTranslation {
  title?: string;
  excerpt?: string;
  content?: string;
}

type TranslationsMap = Record<string, PostTranslation>;

export function getPostTranslation(
  post: { title: string; excerpt: string | null; content: string; translations?: string | null },
  locale: Locale
): { title: string; excerpt: string | null; content: string } {
  if (locale === "en") {
    return { title: post.title, excerpt: post.excerpt, content: post.content };
  }

  try {
    const map: TranslationsMap = JSON.parse(post.translations || "{}");
    const t = map[locale];
    if (!t) return { title: post.title, excerpt: post.excerpt, content: post.content };
    return {
      title: t.title || post.title,
      excerpt: t.excerpt || post.excerpt,
      content: t.content || post.content,
    };
  } catch {
    return { title: post.title, excerpt: post.excerpt, content: post.content };
  }
}
