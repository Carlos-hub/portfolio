export interface CuratedProject {
  name: string; // repo name on GitHub
  title: string; // display title
  description: string; // curated copy
  fallbackLanguage: string;
  fallbackDemoUrl: string | null;
  codeUrl: string;
  fallbackPushedAt: string; // used only if API is down
}

// Order defines display order. PlanejAI first.
export const FEATURED: CuratedProject[] = [
  {
    name: "planejai-trilha",
    title: "PlanejAI + Trilha",
    description:
      "Planejador de aulas alinhado à BNCC com IA — gera plano de aula e trilha de estudo gamificada (quiz autocorrigido, acesso por código) num clique. MVP do Hackathon FIAP.",
    fallbackLanguage: "Go",
    fallbackDemoUrl: null,
    codeUrl: "https://github.com/Carlos-hub/planejai-trilha",
    fallbackPushedAt: "2026-07-17T00:00:00Z",
  },
  {
    name: "ignite-lab-eventPlatform",
    title: "Ignite Lab Event",
    description:
      "Plataforma de evento online: inscrição, agenda dinâmica e player de vídeo integrado.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl:
      "https://ignite-lab-event-platform-oxcfjgybl-carlos-hub.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/ignite-lab-eventPlatform",
    fallbackPushedAt: "2022-09-14T00:00:00Z",
  },
  {
    name: "Pouca-carne",
    title: "Pouca Carne",
    description:
      "Sistema fullstack para restaurante vegano (TCC): pedidos, clientes, entregadores e painel administrativo.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://pouca-carne.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/Pouca-carne",
    fallbackPushedAt: "2023-01-20T00:00:00Z",
  },
  {
    name: "codeFlix-front",
    title: "CodeFlix",
    description:
      "Interface estilo streaming (Netflix-like) construída em Next.js.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://code-flix-front.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/codeFlix-front",
    fallbackPushedAt: "2024-03-15T00:00:00Z",
  },
  {
    name: "devEvolution",
    title: "devEvolution",
    description:
      "API de delivery de produtos e pedidos, com todas as rotas documentadas em Swagger.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://devevolution-production.up.railway.app",
    codeUrl: "https://github.com/Carlos-hub/devEvolution",
    fallbackPushedAt: "2023-03-27T00:00:00Z",
  },
  {
    name: "nlw-return",
    title: "NLW Return",
    description:
      "Widget de feedback (bug, ideia ou elogio) com captura de screenshot integrada.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://nlw-return-portifolio.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/nlw-return",
    fallbackPushedAt: "2022-06-02T00:00:00Z",
  },
];
