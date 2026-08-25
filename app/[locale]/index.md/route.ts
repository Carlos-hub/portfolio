import { buildSiteMarkdown, estimateTokens } from "@/lib/markdown";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/lib/i18n";

export const revalidate = 3600;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Markdown representation of the homepage, per language. Reachable directly at
 * /{locale}/index.md and served from /{locale} by the middleware when an agent
 * sends `Accept: text/markdown` (Markdown for Agents).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return new Response("Not found", { status: 404 });
  const locale = raw;
  const body = await buildSiteMarkdown(locale);
  const other = locale === "pt" ? "en" : "pt";
  const llms = locale === DEFAULT_LOCALE ? "/llms.txt" : `/${locale}/llms.txt`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
      "Content-Language": locale === "pt" ? "pt-BR" : "en-US",
      Vary: "Accept",
      "x-markdown-tokens": String(estimateTokens(body)),
      Link:
        `</${locale}>; rel="canonical", ` +
        `<${llms}>; rel="alternate"; type="text/plain", ` +
        `</${other}>; rel="alternate"; hreflang="${other}"`,
    },
  });
}
