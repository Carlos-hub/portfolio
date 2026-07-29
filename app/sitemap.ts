import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Section anchors: not separate documents, but they give crawlers the
    // page's outline and can surface as jump-to links in results.
    ...["projetos", "servicos", "sobre", "faq", "contato"].map((id) => ({
      url: `${SITE_URL}/#${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
