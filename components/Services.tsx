import Section from "./Section";

const SERVICES = [
  {
    title: "Sites & sistemas sob medida",
    desc: "Aplicações web fullstack, do banco de dados à interface.",
  },
  {
    title: "Landing pages de alta conversão",
    desc: "Páginas rápidas e persuasivas focadas em resultado.",
  },
  {
    title: "Apps mobile",
    desc: "Aplicativos Android e iOS com React Native.",
  },
  {
    title: "Consultoria técnica",
    desc: "Otimização, arquitetura e resolução de gargalos.",
  },
];

export default function Services() {
  return (
    <Section id="servicos" eyebrow="Como posso ajudar" title="Serviços">
      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <h3 className="text-xl font-bold text-accent">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
