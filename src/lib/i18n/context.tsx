"use client";

import { createContext, useContext, useCallback, ReactNode } from "react";
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
  initialDict,
}: {
  children: ReactNode;
  initialLocale?: Locale;
  initialDict?: Dictionary;
}) {
  const dict = initialDict ?? enDict;

  const setLocale = useCallback((_locale: Locale) => {
    // English-only site — locale switching disabled
  }, []);

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
    <LocaleContext.Provider
      value={{ locale: DEFAULT_LOCALE, dict, setLocale, t }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (k: string) => k,
      dict: enDict,
    };
  }
  return ctx;
}
