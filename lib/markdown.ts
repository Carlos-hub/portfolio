import { faq } from "./faq";
import { buildFeatured, fetchRepos } from "./github";
import { services } from "./services";
import { dict } from "./dictionary";
import type { Locale } from "./i18n";
import {
  AUTHOR,
  EMAIL,
  PHONE_E164,
  SAME_AS,
  SITE_URL,
  siteCopy,
} from "./site";
import { whatsappLink } from "./whatsapp";

interface MarkdownLabels {
  site: string;
  location: string;
  languages: string;
  email: string;
  profile: string;
  whatIDo: string;
  notTied: string;
  services: string;
  projects: string;
  mainLanguage: string;
  code: string;
  liveDemo: string;
  lastUpdate: string;
  faq: string;
  hire: string;
  hireBody: string;
  agentResources: string;
  markdownOfPage: string;
  structuredData: string;
  catalog: string;
  sitemap: string;
  otherLanguage: string;
  generatedAt: string;
}

const LABELS: Record<Locale, MarkdownLabels> = {
  pt: {
    site: "Site",
    location: "Localização: Brasil (atende remoto, Brasil e exterior)",
    languages: "Idiomas: português (nativo), inglês",
    email: "E-mail",
    profile: "Perfil",
    whatIDo: "O que eu faço",
    notTied:
      "Não trabalho preso a uma linguagem ou framework específico: a stack é escolhida\npelo que o projeto precisa, incluindo dar continuidade a bases de código\nexistentes em qualquer linguagem.",
    services: "Serviços",
    projects: "Projetos em destaque",
    mainLanguage: "Linguagem principal",
    code: "Código",
    liveDemo: "Demo ao vivo",
    lastUpdate: "Última atualização",
    faq: "Perguntas frequentes",
    hire: "Como contratar",
    hireBody: `Contato direto pelo WhatsApp (${PHONE_E164}) ou e-mail (${EMAIL}). Primeira\nconversa gratuita e sem compromisso; proposta com valor fechado e etapas de\nentrega. O cliente recebe o código-fonte completo.`,
    agentResources: "Recursos para agentes",
    markdownOfPage: "Markdown desta página",
    structuredData: "Structured data (schema.org @graph): embutido em",
    catalog: "Catálogo de recursos (RFC 9727)",
    sitemap: "Sitemap",
    otherLanguage: "Versão em inglês desta página",
    generatedAt: "Última geração",
  },
  en: {
    site: "Website",
    location: "Location: Brazil (works remotely, Brazil and abroad)",
    languages: "Languages: Portuguese (native), English",
    email: "Email",
    profile: "Profile",
    whatIDo: "What I do",
    notTied:
      "I'm not tied to a specific language or framework: the stack follows what the\nproject needs, including picking up existing codebases in any language.",
    services: "Services",
    projects: "Featured projects",
    mainLanguage: "Main language",
    code: "Source",
    liveDemo: "Live demo",
    lastUpdate: "Last updated",
    faq: "Frequently asked questions",
    hire: "How to hire",
    hireBody: `Contact goes straight through WhatsApp (${PHONE_E164}) or email (${EMAIL}).\nThe first conversation is free with no strings attached; the proposal comes\nwith a fixed price and delivery milestones. The client gets the complete\nsource code.`,
    agentResources: "Resources for agents",
    markdownOfPage: "Markdown version of this page",
    structuredData: "Structured data (schema.org @graph): embedded in",
    catalog: "Resource catalog (RFC 9727)",
    sitemap: "Sitemap",
    otherLanguage: "Portuguese version of this page",
    generatedAt: "Last generated",
  },
};

const OTHER: Record<Locale, Locale> = { pt: "en", en: "pt" };

const FOOTNOTE: Record<Locale, string> = {
  pt: "Conteúdo escrito por humano.",
  en: "Human-authored content.",
};

const CONTACT_MESSAGE: Record<Locale, string> = {
  pt: "Olá Carlos! Quero conversar sobre um projeto.",
  en: "Hi Carlos! I'd like to talk about a project.",
};

/**
 * The whole site as markdown, in one language. Served at /llms.txt and
 * returned from /{locale} when an agent asks for `Accept: text/markdown`, so
 * the HTML and markdown views can never drift.
 */
export async function buildSiteMarkdown(locale: Locale): Promise<string> {
  const projects = buildFeatured(await fetchRepos(), locale);
  const copy = siteCopy(locale);
  const l = LABELS[locale];
  const other = OTHER[locale];
  const pageUrl = `${SITE_URL}/${locale}`;
  const otherUrl = `${SITE_URL}/${other}`;
  const d = dict(locale);

  return `# ${AUTHOR} (${copy.jobTitle})

> ${copy.description}

- ${l.site}: ${pageUrl}
- ${l.location}
- ${l.languages}
- ${l.email}: ${EMAIL}
- WhatsApp: ${PHONE_E164} — ${whatsappLink(CONTACT_MESSAGE[locale])}
${SAME_AS.map((u) => `- ${l.profile}: ${u}`).join("\n")}

## ${l.whatIDo}

${copy.skills.join(", ")}.

${l.notTied}

## ${l.services}

${services(locale)
  .map((s) => `### ${s.title}\n${s.detail}`)
  .join("\n\n")}

## ${l.projects}

${projects
  .map(
    (p) =>
      `### ${p.title}\n${p.description}\n- ${l.mainLanguage}: ${p.language}${
        p.codeUrl ? `\n- ${l.code}: ${p.codeUrl}` : ""
      }${
        p.demoUrl ? `\n- ${l.liveDemo}: ${p.demoUrl}` : ""
      }\n- ${l.lastUpdate}: ${p.pushedAt.slice(0, 10)}`
  )
  .join("\n\n")}

## ${d.faq.title}

${faq(locale)
  .map((f) => `### ${f.q}\n${f.a}`)
  .join("\n\n")}

## ${l.hire}

${l.hireBody}

## ${l.agentResources}

- ${l.markdownOfPage}: ${pageUrl}/index.md (\`Accept: text/markdown\` ${pageUrl})
- ${l.structuredData} ${pageUrl}
- ${l.otherLanguage}: ${otherUrl}
- ${l.catalog}: ${SITE_URL}/.well-known/api-catalog
- ${l.sitemap}: ${SITE_URL}/sitemap.xml

---
${l.generatedAt}: ${new Date().toISOString().slice(0, 10)}. ${FOOTNOTE[locale]}
`;
}

/** Rough token count for the x-markdown-tokens hint (~4 chars per token). */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
