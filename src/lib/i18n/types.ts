export type Locale = "en" | "de" | "fr" | "it" | "es" | "ru" | "zh" | "pt";

export interface LocaleConfig {
  code: Locale;
  name: string;
  flag: string;
}

export const LOCALES: LocaleConfig[] = [
  { code: "de", name: "Deutsch", flag: "DE" },
  { code: "en", name: "English", flag: "EN" },
  { code: "fr", name: "Français", flag: "FR" },
  { code: "it", name: "Italiano", flag: "IT" },
  { code: "es", name: "Español", flag: "ES" },
  { code: "ru", name: "Русский", flag: "RU" },
  { code: "zh", name: "中文", flag: "ZH" },
  { code: "pt", name: "Português", flag: "PT" },
];

export const DEFAULT_LOCALE: Locale = "en";

export type Dictionary = Record<string, string>;
