// Single source of truth for identity/SEO data. Used by metadata, JSON-LD,
// sitemap, robots and the llms.txt route so they can never drift apart.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.carlosmiguel.dev.br";

export const AUTHOR = "Carlos Miguel de Lara";
export const AUTHOR_SHORT = "Carlos de Lara";
export const JOB_TITLE = "Desenvolvedor Fullstack Freelancer";

export const SITE_NAME = `${AUTHOR_SHORT} — ${JOB_TITLE}`;

export const TAGLINE =
  "Desenvolvedor fullstack freelancer no Brasil. Crio sites, sistemas web, landing pages e aplicativos sob medida — na linguagem e stack que o projeto pedir.";

export const DESCRIPTION =
  "Carlos de Lara é desenvolvedor fullstack freelancer no Brasil. Sites, sistemas web, landing pages e apps mobile sob medida, em qualquer linguagem ou stack — com projetos reais no ar e código aberto no GitHub. Orçamento direto pelo WhatsApp.";

/** Kept under ~160 chars so Google shows it whole instead of truncating. */
export const META_DESCRIPTION =
  "Desenvolvedor fullstack freelancer: sites, sistemas web, landing pages e apps sob medida, em qualquer linguagem. Orçamento direto pelo WhatsApp.";

export const EMAIL = "delaracarlosmiguel@gmail.com";
export const PHONE_E164 = "+5549991117061";

export const SAME_AS = [
  "https://github.com/Carlos-hub",
  "https://www.linkedin.com/in/carlos-hub/",
];

// Capabilities, not languages: the pitch is "resolvo o problema", the stack is
// a detail chosen per project.
export const SKILLS = [
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
];

export const KEYWORDS = [
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
];
