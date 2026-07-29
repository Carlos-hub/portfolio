import { SERVICES } from "@/lib/services";
import Section from "./Section";

export default function Services() {
  return (
    <Section id="servicos" eyebrow="Como posso ajudar" title="Serviços">
      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((s) => (
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
