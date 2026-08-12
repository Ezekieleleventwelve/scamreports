"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";
import { LOCALES } from "@/lib/i18n/types";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) || LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider hover:bg-muted transition-colors border border-transparent hover:border-border"
        aria-label="Select language"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {current.flag}
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 border border-border bg-card shadow-lg z-50">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-[12px] hover:bg-muted transition-colors flex items-center justify-between ${
                locale === l.code ? "font-bold text-primary bg-primary/5" : "text-foreground"
              }`}
            >
              <span>{l.name}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{l.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
