import type { Locale, Dictionary } from "./types";
import { DEFAULT_LOCALE } from "./types";
import enDict from "./dictionaries/en";

export async function getLocale(): Promise<Locale> {
  return DEFAULT_LOCALE;
}

export async function getDictionary(_locale?: Locale): Promise<Dictionary> {
  return enDict;
}

export function t(
  dict: Dictionary,
  key: string,
  replacements?: Record<string, string | number>
): string {
  let text = dict[key] ?? enDict[key] ?? key;
  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}
