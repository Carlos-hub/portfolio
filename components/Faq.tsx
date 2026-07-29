import { FAQ } from "@/lib/faq";
import Section from "./Section";

export default function Faq() {
  return (
    <Section id="faq" eyebrow="Antes de perguntar" title="Perguntas frequentes">
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {FAQ.map((f) => (
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
