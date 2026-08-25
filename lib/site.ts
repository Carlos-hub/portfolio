// Single source of truth for identity/SEO data. Used by metadata, JSON-LD,
// sitemap, robots and the llms.txt route so they can never drift apart.
// Everything that is language-dependent lives in SITE_COPY, keyed by locale.

import type { Locale, Localized } from "./i18n";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.carlosmiguel.dev.br";

export const AUTHOR = "Carlos Miguel de Lara";
export const AUTHOR_SHORT = "Carlos de Lara";

export const EMAIL = "delaracarlosmiguel@gmail.com";
export const PHONE_E164 = "+5549991117061";

export const SAME_AS = [
  "https://github.com/Carlos-hub",
  "https://www.linkedin.com/in/carlos-hub/",
];

export interface SiteCopy {
  jobTitle: string;
  siteName: string;
  /** Used as the <title> suffix on the homepage. */
  titleSuffix: string;
  tagline: string;
  description: string;
  /** Kept under ~160 chars so Google shows it whole instead of truncating. */
  metaDescription: string;
  /** Capabilities, not languages: the stack is a detail chosen per project. */
  skills: string[];
  keywords: string[];
}

export const SITE_COPY: Localized<SiteCopy> = {
  pt: {
    jobTitle: "Desenvolvedor Fullstack Freelancer",
    siteName: `${AUTHOR_SHORT} — Desenvolvedor Fullstack Freelancer`,
    titleSuffix: "Sites, Sistemas e Apps sob Medida",
    tagline:
      "Desenvolvedor fullstack freelancer no Brasil. Crio sites, sistemas web, landing pages e aplicativos sob medida — na linguagem e stack que o projeto pedir.",
    description:
      "Carlos de Lara é desenvolvedor fullstack freelancer no Brasil. Sites, sistemas web, landing pages e apps mobile sob medida, em qualquer linguagem ou stack — com projetos reais no ar e código aberto no GitHub. Orçamento direto pelo WhatsApp.",
    metaDescription:
      "Desenvolvedor fullstack freelancer: sites, sistemas web, landing pages e apps sob medida, em qualquer linguagem. Orçamento direto pelo WhatsApp.",
    skills: [
      "Desenvolvimento web fullstack",
      "Sistemas sob medida",
      "Landing pages",
      "Aplicativos mobile",
      "APIs e integrações",
      "Bancos de dados",
      "Arquitetura de software",
      "Performance e otimização",
      "SEO técnico",
      "Deploy e infraestrutura",
      "Consultoria técnica",
    ],
    keywords: [
      "desenvolvedor fullstack",
      "desenvolvedor freelancer",
      "programador freelancer Brasil",
      "criação de sites",
      "desenvolvimento de sistemas web",
      "sistema sob medida",
      "landing page de alta conversão",
      "desenvolvimento de aplicativo",
      "desenvolvedor web remoto",
      "consultoria de software",
      "Carlos de Lara desenvolvedor",
    ],
  },
  en: {
    jobTitle: "Freelance Fullstack Developer",
    siteName: `${AUTHOR_SHORT} — Freelance Fullstack Developer`,
    titleSuffix: "Custom Websites, Systems and Apps",
    tagline:
      "Freelance fullstack developer based in Brazil. I build websites, web systems, landing pages and custom apps — in whatever language and stack the project calls for.",
    description:
      "Carlos de Lara is a freelance fullstack developer based in Brazil, working remotely worldwide. Custom websites, web systems, landing pages and mobile apps in any language or stack — with real projects live and open source on GitHub. Quotes straight over WhatsApp.",
    metaDescription:
      "Freelance fullstack developer: custom websites, web systems, landing pages and apps, in any language. Get a quote straight over WhatsApp.",
    skills: [
      "Fullstack web development",
      "Custom software",
      "Landing pages",
      "Mobile apps",
      "APIs and integrations",
      "Databases",
      "Software architecture",
      "Performance optimization",
      "Technical SEO",
      "Deployment and infrastructure",
      "Technical consulting",
    ],
    keywords: [
      "fullstack developer",
      "freelance developer",
      "freelance programmer Brazil",
      "website development",
      "web system development",
      "custom software development",
      "high converting landing page",
      "mobile app development",
      "remote web developer",
      "software consulting",
      "Carlos de Lara developer",
    ],
  },
};

export function siteCopy(locale: Locale): SiteCopy {
  return SITE_COPY[locale];
}
