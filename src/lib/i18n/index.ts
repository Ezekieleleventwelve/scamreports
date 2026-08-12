import { cookies } from "next/headers";
import type { Locale, Dictionary } from "./types";
import { DEFAULT_LOCALE } from "./types";
import enDict from "./dictionaries/en";

const dictionaries: Record<string, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./dictionaries/en"),
  de: () => import("./dictionaries/de"),
  fr: () => import("./dictionaries/fr"),
  it: () => import("./dictionaries/it"),
  es: () => import("./dictionaries/es"),
  ru: () => import("./dictionaries/ru"),
  zh: () => import("./dictionaries/zh"),
  pt: () => import("./dictionaries/pt"),
};

export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value;
    if (locale && locale in dictionaries) return locale as Locale;
  } catch {}
  return DEFAULT_LOCALE;
}

export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  const l = locale || (await getLocale());
  const en = (await dictionaries.en()).default;
  if (l === "en") return en;
  const loader = dictionaries[l] || dictionaries[DEFAULT_LOCALE];
  const mod = await loader();
  return { ...en, ...mod.default };
}

export function t(dict: Dictionary, key: string, replacements?: Record<string, string | number>): string {
  let text = dict[key] ?? enDict[key] ?? key;
  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}
