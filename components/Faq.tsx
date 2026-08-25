import { faq } from "@/lib/faq";
import Section from "./Section";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Faq({ locale }: { locale: Locale }) {
  const t = dict(locale);
  return (
    <Section id={t.ids.faq} eyebrow={t.faq.eyebrow} title={t.faq.title}>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {faq(locale).map((f) => (
          <details key={f.q} className="group p-6 open:pb-7">
            <summary className="cursor-pointer list-none text-lg font-bold marker:content-none">
              <span className="mr-3 text-accent transition-transform group-open:rotate-90 inline-block">
                ▸
              </span>
              {f.q}
            </summary>
            <p className="mt-3 pl-7 text-sm leading-relaxed text-muted">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
