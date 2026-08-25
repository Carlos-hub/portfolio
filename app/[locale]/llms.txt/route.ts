import { buildSiteMarkdown, estimateTokens } from "@/lib/markdown";
import { LOCALES, isLocale } from "@/lib/i18n";

export const revalidate = 3600;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * /{locale}/llms.txt — plain-text digest of the site for LLMs and AI search
 * crawlers, in one language. The Portuguese copy is also served from the
 * conventional root path /llms.txt.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });
  const body = await buildSiteMarkdown(locale);
  const other = locale === "pt" ? "en" : "pt";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
      "Content-Language": locale === "pt" ? "pt-BR" : "en-US",
      "x-markdown-tokens": String(estimateTokens(body)),
      Link: `</${other}/llms.txt>; rel="alternate"; hreflang="${other}"`,
    },
  });
}
