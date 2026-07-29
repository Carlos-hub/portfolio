import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Search engines and AI crawlers are both explicitly welcome: the whole point
// of the site is being found and quoted.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "DuckAssistBot",
  "CCBot",
  "cohere-ai",
  "YouBot",
];

/**
 * Hand-rolled instead of Next's MetadataRoute.Robots because that helper can
 * only emit the classic directives — it has no way to express Content Signals
 * (contentsignals.org / draft-romm-aipref-contentsignals).
 *
 * The declared preference is permissive on purpose: this is a portfolio whose
 * job is to be indexed, quoted and used as an answer source.
 */
const CONTENT_SIGNAL = "search=yes, ai-input=yes, ai-train=yes";

export function GET() {
  const body = [
    "# Content Signals — https://contentsignals.org/",
    "# search: indexação e links em buscadores.",
    "# ai-input: uso como fonte em respostas de IA (RAG, grounding, citação).",
    "# ai-train: uso do conteúdo em treinamento de modelos.",
    "",
    "User-Agent: *",
    `Content-Signal: ${CONTENT_SIGNAL}`,
    "Allow: /",
    "",
    ...AI_CRAWLERS.flatMap((ua) => [
      `User-Agent: ${ua}`,
      `Content-Signal: ${CONTENT_SIGNAL}`,
      "Allow: /",
      "",
    ]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
