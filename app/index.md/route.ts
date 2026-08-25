import { buildSiteMarkdown, estimateTokens } from "@/lib/markdown";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export const revalidate = 3600;

/**
 * Markdown view of the site at the root path, kept for agents that had /index.md
 * bookmarked before the site became bilingual. It serves Portuguese; the
 * per-language views are /pt/index.md and /en/index.md.
 */
export async function GET() {
  const body = await buildSiteMarkdown(DEFAULT_LOCALE);

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
      "Content-Language": "pt-BR",
      "x-markdown-tokens": String(estimateTokens(body)),
      Vary: "Accept",
      Link:
        `</pt>; rel="canonical", ` +
        `</llms.txt>; rel="alternate"; type="text/plain", ` +
        `</en/index.md>; rel="alternate"; hreflang="en"`,
    },
  });
}
