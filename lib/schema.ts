import type { FeaturedProject } from "./types";
import { faq } from "./faq";
import { services } from "./services";
import { HTML_LANG, type Locale } from "./i18n";
import {
  AUTHOR,
  AUTHOR_SHORT,
  EMAIL,
  PHONE_E164,
  SAME_AS,
  SITE_URL,
  siteCopy,
} from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;
const SERVICE_ID = `${SITE_URL}/#service`;

const COUNTRY: Record<Locale, string> = { pt: "Brasil", en: "Brazil" };
const REMOTE: Record<Locale, string> = {
  pt: "Remoto / mundial",
  en: "Remote / worldwide",
};
const SERVICE_SUFFIX: Record<Locale, string> = {
  pt: "Desenvolvimento de Software",
  en: "Software Development",
};
const CATALOG_NAME: Record<Locale, string> = {
  pt: "Serviços de desenvolvimento",
  en: "Development services",
};
const PROJECTS_NAME: Record<Locale, string> = {
  pt: "Projetos em destaque",
  en: "Featured projects",
};

/**
 * One @graph with stable @ids so crawlers and LLMs resolve every node to the
 * same entity instead of treating each block as an unrelated island. The
 * Person and ProfessionalService keep locale-independent @ids on purpose —
 * they're the same entity in both languages, only described in another tongue.
 */
export function buildJsonLd(projects: FeaturedProject[], locale: Locale) {
  const copy = siteCopy(locale);
  const lang = HTML_LANG[locale];
  const pageUrl = `${SITE_URL}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: AUTHOR,
        alternateName: AUTHOR_SHORT,
        url: SITE_URL,
        image: `${pageUrl}/opengraph-image`,
        jobTitle: copy.jobTitle,
        description: copy.tagline,
        email: `mailto:${EMAIL}`,
        telephone: PHONE_E164,
        knowsAbout: copy.skills,
        knowsLanguage: ["pt-BR", "en"],
        sameAs: SAME_AS,
        nationality: { "@type": "Country", name: COUNTRY[locale] },
        address: { "@type": "PostalAddress", addressCountry: "BR" },
        worksFor: { "@id": SERVICE_ID },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: copy.siteName,
        description: copy.description,
        inLanguage: ["pt-BR", "en-US"],
        publisher: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.siteName,
        description: copy.description,
        isPartOf: { "@id": SITE_ID },
        inLanguage: lang,
        primaryImageOfPage: `${pageUrl}/opengraph-image`,
      },
      {
        "@type": "ProfessionalService",
        "@id": SERVICE_ID,
        name: `${AUTHOR_SHORT} — ${SERVICE_SUFFIX[locale]}`,
        description: copy.tagline,
        url: pageUrl,
        image: `${pageUrl}/opengraph-image`,
        founder: { "@id": PERSON_ID },
        priceRange: "$$",
        telephone: PHONE_E164,
        email: `mailto:${EMAIL}`,
        areaServed: [
          { "@type": "Country", name: COUNTRY[locale] },
          { "@type": "Place", name: REMOTE[locale] },
        ],
        availableLanguage: ["Portuguese", "English"],
        serviceType: services(locale).map((s) => s.title),
        sameAs: SAME_AS,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: CATALOG_NAME[locale],
          itemListElement: services(locale).map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.detail,
              provider: { "@id": SERVICE_ID },
            },
          })),
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#projects`,
        name: PROJECTS_NAME[locale],
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: p.title,
            description: p.description,
            programmingLanguage: p.language,
            ...(p.codeUrl ? { codeRepository: p.codeUrl } : {}),
            ...(p.demoUrl ? { url: p.demoUrl } : {}),
            dateModified: p.pushedAt,
            inLanguage: lang,
            author: { "@id": PERSON_ID },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: lang,
        mainEntity: faq(locale).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
