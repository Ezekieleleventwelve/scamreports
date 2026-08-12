export type Locale = "en";

export interface LocaleConfig {
  code: Locale;
  name: string;
  flag: string;
}

export const LOCALES: LocaleConfig[] = [
  { code: "en", name: "English", flag: "EN" },
];

export const DEFAULT_LOCALE: Locale = "en";

export type Dictionary = Record<string, string>;
