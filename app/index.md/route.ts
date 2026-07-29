import { buildSiteMarkdown, estimateTokens } from "@/lib/markdown";

export const revalidate = 3600;

/**
 * Markdown representation of the homepage. Reachable directly at /index.md and
 * served from / by the middleware when an agent sends `Accept: text/markdown`
 * (Markdown for Agents).
 */
export async function GET() {
  const body = await buildSiteMarkdown();

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
      "x-markdown-tokens": String(estimateTokens(body)),
      Vary: "Accept",
      Link: `</>; rel="canonical", </llms.txt>; rel="alternate"; type="text/plain"`,
    },
  });
}
