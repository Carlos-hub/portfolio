import { FAQ } from "@/lib/faq";
import { buildFeatured, fetchRepos } from "@/lib/github";
import { SERVICES } from "@/lib/services";
import {
  AUTHOR,
  DESCRIPTION,
  EMAIL,
  JOB_TITLE,
  PHONE_E164,
  SAME_AS,
  SITE_URL,
  SKILLS,
} from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const revalidate = 3600;

/**
 * /llms.txt — plain-text digest of the site for LLMs and AI search crawlers,
 * which parse markdown far more reliably than a JS-animated page.
 */
export async function GET() {
  const projects = buildFeatured(await fetchRepos());

  const body = `# ${AUTHOR} (${JOB_TITLE})

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

---
Última geração: ${new Date().toISOString().slice(0, 10)}. Conteúdo escrito por humano.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
    },
  });
}
