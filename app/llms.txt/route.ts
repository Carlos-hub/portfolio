import { buildSiteMarkdown, estimateTokens } from "@/lib/markdown";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export const revalidate = 3600;

/**
 * /llms.txt — the conventional root path stays the Portuguese digest (the
 * primary language of the site). The English one lives at /en/llms.txt and is
 * advertised here through a Link header.
 */
export async function GET() {
  const body = await buildSiteMarkdown(DEFAULT_LOCALE);

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
      "Content-Language": "pt-BR",
      "x-markdown-tokens": String(estimateTokens(body)),
      Link: `</en/llms.txt>; rel="alternate"; hreflang="en"`,
    },
  });
}
