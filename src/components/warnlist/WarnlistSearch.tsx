"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { parseWarnlistQuery, warnlistHref } from "@/lib/warnlist-query";
import { FormEvent, useState } from "react";

interface WarnlistSearchProps {
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    clearSearch: string;
    searchAction?: string;
  };
}

export default function WarnlistSearch({ labels }: WarnlistSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  function buildUrl(nextQ: string) {
    const current = parseWarnlistQuery({
      type: searchParams.get("type") ?? undefined,
    });
    return warnlistHref({ ...current, q: nextQ.trim(), page: 1 });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(buildUrl(q));
  }

  function clearSearch() {
    setQ("");
    router.push(buildUrl(""));
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <label className="sr-only" htmlFor="warnlist-search">
        {labels.searchLabel}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3 h-11 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] focus-within:border-foreground/25 focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.06)] dark:focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]">
        <svg
          className="w-4 h-4 text-muted-foreground shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="m21 21-4.35-4.35" />
        </svg>
        <input
          id="warnlist-search"
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.searchPlaceholder}
          className="flex-1 min-w-0 h-full !border-0 !bg-transparent !px-0 !shadow-none text-[13px] placeholder:text-muted-foreground focus:!outline-none focus:!ring-0 focus:!shadow-none focus:!border-0"
          autoComplete="off"
          spellCheck={false}
        />
        {q ? (
          <button
            type="button"
            onClick={clearSearch}
            className="shrink-0 h-7 w-7 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            aria-label={labels.clearSearch}
          >
            ×
          </button>
        ) : null}
        <button
          type="submit"
          className="shrink-0 h-8 w-8 inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          aria-label={labels.searchAction ?? "Search"}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>
    </form>
  );
}
