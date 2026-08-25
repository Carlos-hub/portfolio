import { dict } from "@/lib/dictionary";
import { LOCALES, type Locale } from "@/lib/i18n";

/**
 * Plain links, not a client-side toggle: each language is its own indexable
 * URL, so the switch has to be a real navigation for crawlers to follow it.
 */
export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const other = LOCALES.find((l) => l !== locale) as Locale;
  const t = dict(locale);

  return (
    <a
      href={`/${other}`}
      hrefLang={other}
      aria-label={t.nav.switchAriaLabel}
      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-accent transition-colors hover:border-accent"
    >
      {t.nav.switchLabel}
    </a>
  );
}
