import type { Localized } from "./i18n";

export interface CuratedProject {
  name: string; // repo name on GitHub
  title: string; // display title (same in both languages)
  description: Localized<string>; // curated copy
  fallbackLanguage: string;
  fallbackDemoUrl: string | null;
  codeUrl: string | null; // null = private repo
  fallbackPushedAt: string; // used only if API is down
}

// Order defines display order. PlanejAI first.
export const FEATURED: CuratedProject[] = [
  {
    name: "planejai-trilha",
    title: "PlanejAI + Trilha",
    description: {
      pt: "Planejador de aulas alinhado à BNCC com IA — gera plano de aula e trilha de estudo gamificada (quiz autocorrigido, acesso por código) num clique. MVP do Hackathon FIAP.",
      en: "AI lesson planner aligned to the Brazilian national curriculum (BNCC) — generates a lesson plan and a gamified study track (self-grading quiz, code-based access) in one click. FIAP Hackathon MVP.",
    },
    fallbackLanguage: "Go",
    fallbackDemoUrl: null,
    codeUrl: "https://github.com/Carlos-hub/planejai-trilha",
    fallbackPushedAt: "2026-07-17T00:00:00Z",
  },
  {
    name: "central-assinante",
    title: "Central do Assinante",
    description: {
      pt: "SaaS multi-tenant para provedores de internet integrados ao IXC: central do assinante com faturas, PIX e boleto, PWA instalável com push segmentado, assistente com IA, cadastro self-service e cobrança recorrente via Asaas. Go + Next.js + Postgres.",
      en: "Multi-tenant SaaS for internet service providers running IXC: a subscriber portal with invoices, PIX and bank slips, an installable PWA with segmented push, an AI assistant, self-service signup and recurring billing via Asaas. Go + Next.js + Postgres.",
    },
    fallbackLanguage: "Go",
    fallbackDemoUrl: "https://plataforma.central.carlosmiguel.dev.br/",
    codeUrl: null,
    fallbackPushedAt: "2026-09-24T00:00:00Z",
  },
  {
    name: "ignite-lab-eventPlatform",
    title: "Ignite Lab Event",
    description: {
      pt: "Plataforma de evento online: inscrição, agenda dinâmica e player de vídeo integrado.",
      en: "Online event platform: sign-up, dynamic schedule and an embedded video player.",
    },
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl:
      "https://ignite-lab-event-platform-oxcfjgybl-carlos-hub.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/ignite-lab-eventPlatform",
    fallbackPushedAt: "2022-09-14T00:00:00Z",
  },
  {
    name: "Pouca-carne",
    title: "Pouca Carne",
    description: {
      pt: "Sistema fullstack para restaurante vegano (TCC): pedidos, clientes, entregadores e painel administrativo.",
      en: "Fullstack system for a vegan restaurant (final-year project): orders, customers, delivery drivers and an admin dashboard.",
    },
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://pouca-carne.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/Pouca-carne",
    fallbackPushedAt: "2023-01-20T00:00:00Z",
  },
  {
    name: "codeFlix-front",
    title: "CodeFlix",
    description: {
      pt: "Interface estilo streaming (Netflix-like) construída em Next.js.",
      en: "Netflix-like streaming interface built with Next.js.",
    },
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://code-flix-front.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/codeFlix-front",
    fallbackPushedAt: "2024-03-15T00:00:00Z",
  },
  {
    name: "devEvolution",
    title: "devEvolution",
    description: {
      pt: "API de delivery de produtos e pedidos, com todas as rotas documentadas em Swagger.",
      en: "Delivery API for products and orders, with every route documented in Swagger.",
    },
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://devevolution-production.up.railway.app",
    codeUrl: "https://github.com/Carlos-hub/devEvolution",
    fallbackPushedAt: "2023-03-27T00:00:00Z",
  },
  {
    name: "nlw-return",
    title: "NLW Return",
    description: {
      pt: "Widget de feedback (bug, ideia ou elogio) com captura de screenshot integrada.",
      en: "Feedback widget (bug, idea or praise) with built-in screenshot capture.",
    },
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://nlw-return-portifolio.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/nlw-return",
    fallbackPushedAt: "2022-06-02T00:00:00Z",
  },
];
