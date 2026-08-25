import { services } from "@/lib/services";
import Section from "./Section";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Services({ locale }: { locale: Locale }) {
  const t = dict(locale);
  return (
    <Section
      id={t.ids.services}
      eyebrow={t.services.eyebrow}
      title={t.services.title}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {services(locale).map((s) => (
          <article
            key={s.title}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <h3 className="text-xl font-bold text-accent">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {s.detail}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
