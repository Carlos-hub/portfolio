import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * RFC 9727 API catalog: a linkset pointing agents at every machine-readable
 * representation of this site. Advertised from the homepage via a Link header
 * with rel="api-catalog" (RFC 8288).
 */
export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${SITE_URL}/`,
        "service-desc": [
          {
            href: `${SITE_URL}/llms.txt`,
            type: "text/markdown",
            title: "llms.txt — resumo do site em texto puro para LLMs",
          },
        ],
        "service-doc": [
          {
            href: `${SITE_URL}/llms.txt`,
            type: "text/markdown",
            title: "Serviços, projetos, FAQ e contato em markdown",
          },
        ],
        describedby: [
          {
            href: `${SITE_URL}/`,
            type: "application/ld+json",
            title: "Structured data (schema.org @graph) embutido na home",
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
      },
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
