export interface Service {
  title: string;
  desc: string;
  /** Longer copy used only in structured data / llms.txt. */
  detail: string;
}

export const SERVICES: Service[] = [
  {
    title: "Sites & sistemas sob medida",
    desc: "Aplicações web fullstack, do banco de dados à interface.",
    detail:
      "Desenvolvimento de aplicações web fullstack sob medida: modelagem de banco de dados, API, painel administrativo e interface. A linguagem e a stack são escolhidas pelo que o projeto pede, não pelo que eu prefiro.",
  },
  {
    title: "Landing pages de alta conversão",
    desc: "Páginas rápidas e persuasivas focadas em resultado.",
    detail:
      "Landing pages rápidas (Core Web Vitals no verde), otimizadas para SEO e para conversão, com copy focada em resultado e integração com WhatsApp, e-mail e analytics.",
  },
  {
    title: "Apps mobile",
    desc: "Aplicativos Android e iOS.",
    detail:
      "Aplicativos mobile Android e iOS — publicação nas lojas, integração com APIs e notificações push.",
  },
  {
    title: "Consultoria técnica",
    desc: "Otimização, arquitetura e resolução de gargalos.",
    detail:
      "Consultoria técnica pontual: revisão de arquitetura, performance, otimização de SEO técnico e resolução de gargalos em projetos existentes, em qualquer stack.",
  },
];
