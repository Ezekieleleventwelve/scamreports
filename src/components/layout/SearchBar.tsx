"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: { name: string; slug: string } | null;
}

export default function SearchBar() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.posts);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  function handleToggle() {
    setOpen((prev) => {
      if (!prev) setTimeout(() => inputRef.current?.focus(), 0);
      return !prev;
    });
    setQuery("");
    setResults([]);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={handleToggle}
        className="p-2 hover:bg-muted transition-colors rounded-md"
        aria-label={t("search.placeholder")}
      >
        <svg className="w-[18px] h-[18px] text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="m21 21-4.35-4.35" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[340px] sm:w-[400px] bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="flex items-center border-b border-border px-3">
            <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => { setQuery(""); setResults([]); }} className="text-muted-foreground hover:text-foreground p-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {loading && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                {t("search.searching")}
              </div>
            )}

            {!loading && query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                {t("search.noResults")}
              </div>
            )}

            {results.map((post) => (
              <Link
                key={post.id}
                href={`/article/${post.slug}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-0"
              >
                <div className="text-sm font-medium leading-snug line-clamp-1">
                  {post.title}
                </div>
                {post.excerpt && (
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {post.excerpt}
                  </div>
                )}
                {post.category && (
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-wider text-primary font-medium">
                    {post.category.name}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
