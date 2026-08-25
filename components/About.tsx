import { siteCopy } from "@/lib/site";
import Section from "./Section";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function About({ locale }: { locale: Locale }) {
  const t = dict(locale);
  return (
    <Section id={t.ids.about} eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            {t.about.p1.before}
            <strong className="text-fg">{t.about.p1.name}</strong>
            {t.about.p1.after}
          </p>
          <p>
            <strong className="text-fg">{t.about.p2.lead}</strong>
            {t.about.p2.rest}
          </p>
          <p>{t.about.p3}</p>
        </div>
        <ul className="flex flex-wrap content-start gap-2">
          {siteCopy(locale).skills.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs text-accent"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
