import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LOCALES } from "@/lib/i18n";
import { dict } from "@/lib/dictionary";

const ALTERNATES = {
  languages: {
    "pt-BR": `${SITE_URL}/pt`,
    "en-US": `${SITE_URL}/en`,
    "x-default": `${SITE_URL}/pt`,
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return LOCALES.flatMap((locale) => {
    const ids = dict(locale).ids;
    return [
      {
        url: `${SITE_URL}/${locale}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 1,
        alternates: ALTERNATES,
      },
      // Section anchors: not separate documents, but they give crawlers the
      // page's outline and can surface as jump-to links in results.
      ...[ids.projects, ids.services, ids.about, ids.faq, ids.contact].map(
        (id) => ({
          url: `${SITE_URL}/${locale}#${id}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })
      ),
    ];
  });
}
