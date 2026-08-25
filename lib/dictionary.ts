import type { Localized } from "./i18n";

/**
 * Every string rendered by a component. Section ids are localized too, so the
 * anchors read naturally in each language (#projetos vs #projects) — they are
 * part of the URL and therefore part of the translation.
 */
export interface Dictionary {
  ids: {
    projects: string;
    activity: string;
    about: string;
    services: string;
    faq: string;
    contact: string;
  };
  nav: {
    ariaLabel: string;
    homeAriaLabel: string;
    projects: string;
    services: string;
    about: string;
    faq: string;
    contact: string;
    /** Label of the link that switches to the other language. */
    switchLabel: string;
    switchAriaLabel: string;
  };
  skipToContent: string;
  hero: {
    eyebrow: string;
    lead: string;
    cta: string;
    ctaMessage: string;
  };
  pulse: {
    eyebrow: string;
    title: string;
    repos: string;
    liveProjects: string;
    lastCommit: string;
    topLanguages: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    demo: string;
    code: string;
  };
  activity: {
    eyebrow: string;
    title: string;
    fallbackDescription: string;
  };
  about: {
    eyebrow: string;
    title: string;
    p1: { before: string; name: string; after: string };
    p2: { lead: string; rest: string };
    p3: string;
  };
  services: {
    eyebrow: string;
    title: string;
  };
  faq: {
    eyebrow: string;
    title: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    ctaMessage: string;
  };
  footer: {
    location: string;
    madeWith: string;
  };
}

export const DICTIONARY: Localized<Dictionary> = {
  pt: {
    ids: {
      projects: "projetos",
      activity: "atividade",
      about: "sobre",
      services: "servicos",
      faq: "faq",
      contact: "contato",
    },
    nav: {
      ariaLabel: "Navegação principal",
      homeAriaLabel: "Carlos de Lara — início",
      projects: "Projetos",
      services: "Serviços",
      about: "Sobre",
      faq: "FAQ",
      contact: "Contato",
      switchLabel: "EN",
      switchAriaLabel: "Switch to English",
    },
    skipToContent: "Pular para o conteúdo",
    hero: {
      eyebrow: "Desenvolvedor Fullstack · Freelancer",
      lead: "Transformo ideias em produtos digitais no ar. Sites, sistemas web, landing pages e apps sob medida — do back-end ao pixel final, na linguagem que o projeto pedir.",
      cta: "Vamos conversar →",
      ctaMessage:
        "Olá Carlos! Vi seu portfolio e quero conversar sobre um projeto.",
    },
    pulse: {
      eyebrow: "Ao vivo do GitHub",
      title: "Sempre codando",
      repos: "repositórios públicos",
      liveProjects: "projetos no ar",
      lastCommit: "último commit",
      topLanguages: "Linguagens mais usadas",
    },
    featured: {
      eyebrow: "Selecionados",
      title: "Projetos em destaque",
      demo: "Demo ao vivo",
      code: "Código",
    },
    activity: {
      eyebrow: "Direto da esteira",
      title: "Atividade recente",
      fallbackDescription: "Projeto em evolução.",
    },
    about: {
      eyebrow: "Quem faz",
      title: "Sobre mim",
      p1: {
        before: "Sou ",
        name: "Carlos Miguel de Lara",
        after: ", desenvolvedor fullstack freelancer no Brasil. Trabalho 100% remoto para clientes de qualquer cidade — construindo sites, sistemas web sob medida, landing pages e aplicativos mobile.",
      },
      p2: {
        lead: "Não sou preso a uma linguagem.",
        rest: " A stack é escolhida pelo que o projeto precisa — front-end, back-end, banco de dados, API, mobile ou continuidade de um código que já existe. Cada entrega vem com código-fonte, deploy configurado e documentação.",
      },
      p3: "Os projetos abaixo não são mockups: são repositórios públicos e demos no ar, com data do último commit puxada ao vivo da API do GitHub.",
    },
    services: { eyebrow: "Como posso ajudar", title: "Serviços" },
    faq: { eyebrow: "Antes de perguntar", title: "Perguntas frequentes" },
    contact: {
      eyebrow: "Bora começar",
      title: "Vamos conversar?",
      lead: "Tem um projeto em mente? Me chama no WhatsApp — respondo rápido e a primeira conversa é sem compromisso.",
      cta: "Chamar no WhatsApp →",
      ctaMessage: "Olá Carlos! Quero conversar sobre um projeto.",
    },
    footer: {
      location: "Brasil · atendimento remoto",
      madeWith: "Feito com Next.js",
    },
  },
  en: {
    ids: {
      projects: "projects",
      activity: "activity",
      about: "about",
      services: "services",
      faq: "faq",
      contact: "contact",
    },
    nav: {
      ariaLabel: "Main navigation",
      homeAriaLabel: "Carlos de Lara — home",
      projects: "Projects",
      services: "Services",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      switchLabel: "PT",
      switchAriaLabel: "Mudar para português",
    },
    skipToContent: "Skip to content",
    hero: {
      eyebrow: "Fullstack Developer · Freelancer",
      lead: "I turn ideas into digital products that actually ship. Websites, web systems, landing pages and custom apps — from the back end to the last pixel, in whatever language the project calls for.",
      cta: "Let's talk →",
      ctaMessage:
        "Hi Carlos! I found your portfolio and I'd like to talk about a project.",
    },
    pulse: {
      eyebrow: "Live from GitHub",
      title: "Always shipping",
      repos: "public repositories",
      liveProjects: "projects live",
      lastCommit: "last commit",
      topLanguages: "Most used languages",
    },
    featured: {
      eyebrow: "Selected work",
      title: "Featured projects",
      demo: "Live demo",
      code: "Source",
    },
    activity: {
      eyebrow: "Straight off the bench",
      title: "Recent activity",
      fallbackDescription: "Work in progress.",
    },
    about: {
      eyebrow: "Who builds it",
      title: "About me",
      p1: {
        before: "I'm ",
        name: "Carlos Miguel de Lara",
        after: ", a freelance fullstack developer based in Brazil. I work 100% remotely for clients anywhere — building websites, custom web systems, landing pages and mobile apps.",
      },
      p2: {
        lead: "I'm not tied to one language.",
        rest: " The stack follows what the project needs — front end, back end, database, API, mobile, or picking up a codebase that already exists. Every delivery ships with the source code, a configured deploy and documentation.",
      },
      p3: "The projects below aren't mockups: they're public repositories and live demos, with the last commit date pulled straight from the GitHub API.",
    },
    services: { eyebrow: "How I can help", title: "Services" },
    faq: { eyebrow: "Before you ask", title: "Frequently asked questions" },
    contact: {
      eyebrow: "Let's start",
      title: "Want to talk?",
      lead: "Got a project in mind? Message me on WhatsApp — I reply fast and the first conversation comes with no strings attached.",
      cta: "Message on WhatsApp →",
      ctaMessage: "Hi Carlos! I'd like to talk about a project.",
    },
    footer: {
      location: "Brazil · working remotely",
      madeWith: "Built with Next.js",
    },
  },
};

export function dict(locale: keyof typeof DICTIONARY): Dictionary {
  return DICTIONARY[locale];
}
