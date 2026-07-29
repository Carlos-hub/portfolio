import { FAQ } from "./faq";
import { buildFeatured, fetchRepos } from "./github";
import { SERVICES } from "./services";
import {
  AUTHOR,
  DESCRIPTION,
  EMAIL,
  JOB_TITLE,
  PHONE_E164,
  SAME_AS,
  SITE_URL,
  SKILLS,
} from "./site";
import { whatsappLink } from "./whatsapp";

/**
 * The whole site as markdown. Served at /llms.txt and returned from / when an
 * agent asks for `Accept: text/markdown`, so both views can never drift.
 */
export async function buildSiteMarkdown(): Promise<string> {
  const projects = buildFeatured(await fetchRepos());

  return `# ${AUTHOR} (${JOB_TITLE})

> ${DESCRIPTION}

- Site: ${SITE_URL}
- Localização: Brasil (atende remoto, Brasil e exterior)
- Idiomas: português (nativo), inglês
- E-mail: ${EMAIL}
- WhatsApp: ${PHONE_E164} — ${whatsappLink("Olá Carlos! Quero conversar sobre um projeto.")}
${SAME_AS.map((u) => `- Perfil: ${u}`).join("\n")}

## O que eu faço

${SKILLS.join(", ")}.

Não trabalho preso a uma linguagem ou framework específico: a stack é escolhida
pelo que o projeto precisa, incluindo dar continuidade a bases de código
existentes em qualquer linguagem.

## Serviços

${SERVICES.map((s) => `### ${s.title}\n${s.detail}`).join("\n\n")}

## Projetos em destaque

${projects
  .map(
    (p) =>
      `### ${p.title}\n${p.description}\n- Linguagem principal: ${p.language}\n- Código: ${p.codeUrl}${
        p.demoUrl ? `\n- Demo ao vivo: ${p.demoUrl}` : ""
      }\n- Última atualização: ${p.pushedAt.slice(0, 10)}`
  )
  .join("\n\n")}

## Perguntas frequentes

${FAQ.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Como contratar

Contato direto pelo WhatsApp (${PHONE_E164}) ou e-mail (${EMAIL}). Primeira
conversa gratuita e sem compromisso; proposta com valor fechado e etapas de
entrega. O cliente recebe o código-fonte completo.

## Recursos para agentes

- Markdown desta página: ${SITE_URL}/index.md (ou \`Accept: text/markdown\` em ${SITE_URL}/)
- Structured data (schema.org @graph): embutido em ${SITE_URL}/
- Catálogo de recursos (RFC 9727): ${SITE_URL}/.well-known/api-catalog
- Sitemap: ${SITE_URL}/sitemap.xml

---
Última geração: ${new Date().toISOString().slice(0, 10)}. Conteúdo escrito por humano.
`;
}

/** Rough token count for the x-markdown-tokens hint (~4 chars per token). */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
