import type { Locale, Localized } from "./i18n";

export interface Service {
  title: string;
  desc: string;
  /** Longer copy used only in structured data / llms.txt. */
  detail: string;
}

export const SERVICES: Localized<Service[]> = {
  pt: [
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
  ],
  en: [
    {
      title: "Custom websites & systems",
      desc: "Fullstack web applications, from the database to the interface.",
      detail:
        "Custom fullstack web application development: database modelling, API, admin dashboard and interface. The language and stack are picked by what the project needs, not by what I happen to prefer.",
    },
    {
      title: "High-converting landing pages",
      desc: "Fast, persuasive pages built around results.",
      detail:
        "Fast landing pages (Core Web Vitals in the green), optimized for SEO and for conversion, with results-driven copy and WhatsApp, email and analytics integration.",
    },
    {
      title: "Mobile apps",
      desc: "Android and iOS applications.",
      detail:
        "Android and iOS mobile apps — store publishing, API integration and push notifications.",
    },
    {
      title: "Technical consulting",
      desc: "Optimization, architecture and unblocking bottlenecks.",
      detail:
        "One-off technical consulting: architecture review, performance work, technical SEO optimization and clearing bottlenecks in existing projects, in any stack.",
    },
  ],
};

export function services(locale: Locale): Service[] {
  return SERVICES[locale];
}
