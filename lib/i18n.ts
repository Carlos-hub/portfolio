export const LOCALES = ["pt", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";

/** BCP-47 tag used in <html lang>, hreflang and schema.org inLanguage. */
export const HTML_LANG: Record<Locale, string> = { pt: "pt-BR", en: "en-US" };

/** Open Graph wants the underscore form. */
export const OG_LOCALE: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };

export type Localized<T> = Record<Locale, T>;

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

/**
 * Picks the best locale from an Accept-Language header. Anything that isn't
 * clearly English falls back to Portuguese, since that's the primary audience.
 */
export function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((l) => l.tag && !Number.isNaN(l.q) && l.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag === "*") return DEFAULT_LOCALE;
    const primary = tag.split("-")[0];
    if (primary === "pt") return "pt";
    if (primary === "en") return "en";
  }
  return DEFAULT_LOCALE;
}
