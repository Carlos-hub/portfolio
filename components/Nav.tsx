import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import LocaleSwitch from "./LocaleSwitch";

export default function Nav({ locale }: { locale: Locale }) {
  const t = dict(locale);
  const links: [string, string][] = [
    [t.nav.projects, `#${t.ids.projects}`],
    [t.nav.services, `#${t.ids.services}`],
    [t.nav.about, `#${t.ids.about}`],
    [t.nav.faq, `#${t.ids.faq}`],
    [t.nav.contact, `#${t.ids.contact}`],
  ];
  return (
    <nav
      aria-label={t.nav.ariaLabel}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-bg/70 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href={`/${locale}`}
          aria-label={t.nav.homeAriaLabel}
          className="font-black tracking-tight"
        >
          CL<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-3 text-sm text-muted sm:gap-6">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-accent">
              {label}
            </a>
          ))}
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </nav>
  );
}
