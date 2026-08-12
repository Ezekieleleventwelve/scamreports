"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Locale, Dictionary } from "./types";
import { DEFAULT_LOCALE } from "./types";
import enDict from "./dictionaries/en";

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
  initialDict,
}: {
  children: ReactNode;
  initialLocale: Locale;
  initialDict: Dictionary;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [dict, setDict] = useState<Dictionary>(initialDict);
  const router = useRouter();

  const setLocale = useCallback(
    async (newLocale: Locale) => {
      document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
      setLocaleState(newLocale);
      // Load new dictionary
      try {
        const en = (await import("./dictionaries/en")).default;
        const mod = await import(`./dictionaries/${newLocale}`);
        setDict({ ...en, ...mod.default });
      } catch {}
      router.refresh();
    },
    [router]
  );

  const t = useCallback(
    (key: string, replacements?: Record<string, string | number>) => {
      let text = dict[key] ?? enDict[key] ?? key;
      if (replacements) {
        for (const [k, v] of Object.entries(replacements)) {
          text = text.replace(`{${k}}`, String(v));
        }
      }
      return text;
    },
    [dict]
  );

  return (
    <LocaleContext.Provider value={{ locale, dict, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) return { locale: DEFAULT_LOCALE, setLocale: () => {}, t: (k: string) => k, dict: {} as Dictionary };
  return ctx;
}
