import { SITE_URL } from "@/lib/site";
import { LOCALES } from "@/lib/i18n";

export const dynamic = "force-static";

const TITLES = {
  pt: {
    desc: "llms.txt — resumo do site em texto puro para LLMs (português)",
    doc: "Serviços, projetos, FAQ e contato em markdown (português)",
    schema: "Structured data (schema.org @graph) embutido na home em português",
  },
  en: {
    desc: "llms.txt — plain-text summary of the site for LLMs (English)",
    doc: "Services, projects, FAQ and contact in markdown (English)",
    schema: "Structured data (schema.org @graph) embedded in the English home",
  },
} as const;

/**
 * RFC 9727 API catalog: a linkset pointing agents at every machine-readable
 * representation of this site — one anchor per language. Advertised from each
 * page via a Link header with rel="api-catalog" (RFC 8288).
 */
export function GET() {
  const catalog = {
    linkset: LOCALES.map((locale) => ({
      anchor: `${SITE_URL}/${locale}`,
      "service-desc": [
        {
          href:
            locale === "pt"
              ? `${SITE_URL}/llms.txt`
              : `${SITE_URL}/${locale}/llms.txt`,
          type: "text/markdown",
          title: TITLES[locale].desc,
        },
      ],
      "service-doc": [
        {
          href: `${SITE_URL}/${locale}/llms.txt`,
          type: "text/markdown",
          title: TITLES[locale].doc,
        },
      ],
      alternate: [
        {
          href: `${SITE_URL}/${locale}/index.md`,
          type: "text/markdown",
          hreflang: locale,
          title: TITLES[locale].doc,
        },
        ...LOCALES.filter((l) => l !== locale).map((l) => ({
          href: `${SITE_URL}/${l}`,
          type: "text/html",
          hreflang: l,
          title: `Same page in ${l === "pt" ? "Portuguese" : "English"}`,
        })),
      ],
      describedby: [
        {
          href: `${SITE_URL}/${locale}`,
          type: "application/ld+json",
          title: TITLES[locale].schema,
        },
      ],
      sitemap: [{ href: `${SITE_URL}/sitemap.xml`, type: "application/xml" }],
      author: [
        { href: "https://github.com/Carlos-hub", title: "GitHub" },
        {
          href: "https://www.linkedin.com/in/carlos-hub/",
          title: "LinkedIn",
        },
      ],
    })),
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
