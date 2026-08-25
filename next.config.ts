import type { NextConfig } from "next";

// RFC 8288 Link header: machine-readable discovery for agents that read headers
// before (or instead of) parsing HTML. Relation types are IANA-registered ones.
// Titles stay ASCII on purpose: HTTP header values are ASCII, and RFC 8288's
// title* extension is the only portable way to carry accents.
function agentLinks(locale: "pt" | "en"): string {
  const other = locale === "pt" ? "en" : "pt";
  const llms = locale === "pt" ? "/llms.txt" : `/${locale}/llms.txt`;

  return [
    '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
    `</${locale}/index.md>; rel="alternate"; type="text/markdown"; title="Markdown version of this page"`,
    `<${llms}>; rel="service-desc"; type="text/plain"; title="llms.txt"`,
    `<${llms}>; rel="service-doc"; type="text/plain"; title="Services, projects and FAQ"`,
    `</${other}>; rel="alternate"; hreflang="${other}"; type="text/html"`,
    `</pt>; rel="alternate"; hreflang="x-default"; type="text/html"`,
    "</sitemap.xml>; rel=\"sitemap\"; type=\"application/xml\"",
    '</manifest.webmanifest>; rel="manifest"',
    `</${locale}>; rel="canonical"`,
    '<https://github.com/Carlos-hub>; rel="author"',
  ].join(", ");
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/pt",
        headers: [
          { key: "Link", value: agentLinks("pt") },
          { key: "Vary", value: "Accept" },
          { key: "Content-Language", value: "pt-BR" },
        ],
      },
      {
        source: "/en",
        headers: [
          { key: "Link", value: agentLinks("en") },
          { key: "Vary", value: "Accept" },
          { key: "Content-Language", value: "en-US" },
        ],
      },
      {
        // The catalog and the markdown views are entry points too — an agent
        // may land on any of them first.
        source: "/(llms.txt|index.md|.well-known/api-catalog)",
        headers: [{ key: "Link", value: agentLinks("pt") }],
      },
      {
        source: "/en/(llms.txt|index.md)",
        headers: [{ key: "Link", value: agentLinks("en") }],
      },
    ];
  },
};

export default nextConfig;
