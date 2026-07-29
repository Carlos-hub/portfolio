import type { NextConfig } from "next";

// RFC 8288 Link header: machine-readable discovery for agents that read headers
// before (or instead of) parsing HTML. Relation types are IANA-registered ones.
// Titles stay ASCII on purpose: HTTP header values are ASCII, and RFC 8288's
// title* extension is the only portable way to carry accents.
const AGENT_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</index.md>; rel="alternate"; type="text/markdown"; title="Markdown version of this page"',
  '</llms.txt>; rel="service-desc"; type="text/plain"; title="llms.txt"',
  '</llms.txt>; rel="service-doc"; type="text/plain"; title="Services, projects and FAQ"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</manifest.webmanifest>; rel="manifest"',
  '</>; rel="canonical"',
  '<https://github.com/Carlos-hub>; rel="author"',
].join(", ");

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
        source: "/",
        headers: [
          { key: "Link", value: AGENT_LINKS },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        // The catalog and the markdown view are entry points too — an agent may
        // land on either one first.
        source: "/(llms.txt|index.md|.well-known/api-catalog)",
        headers: [{ key: "Link", value: AGENT_LINKS }],
      },
    ];
  },
};

export default nextConfig;
