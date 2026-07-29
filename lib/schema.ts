import type { FeaturedProject } from "./types";
import { FAQ } from "./faq";
import { SERVICES } from "./services";
import {
  AUTHOR,
  AUTHOR_SHORT,
  DESCRIPTION,
  EMAIL,
  JOB_TITLE,
  PHONE_E164,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
  SKILLS,
  TAGLINE,
} from "./site";

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;
const SERVICE_ID = `${SITE_URL}/#service`;

/**
 * One @graph with stable @ids so crawlers and LLMs resolve every node to the
 * same entity instead of treating each block as an unrelated island.
 */
export function buildJsonLd(projects: FeaturedProject[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: AUTHOR,
        alternateName: AUTHOR_SHORT,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        jobTitle: JOB_TITLE,
        description: TAGLINE,
        email: `mailto:${EMAIL}`,
        telephone: PHONE_E164,
        knowsAbout: SKILLS,
        knowsLanguage: ["pt-BR", "en"],
        sameAs: SAME_AS,
        nationality: { "@type": "Country", name: "Brasil" },
        address: { "@type": "PostalAddress", addressCountry: "BR" },
        worksFor: { "@id": SERVICE_ID },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: DESCRIPTION,
        inLanguage: "pt-BR",
        publisher: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DESCRIPTION,
        isPartOf: { "@id": SITE_ID },
        inLanguage: "pt-BR",
        primaryImageOfPage: `${SITE_URL}/opengraph-image`,
      },
      {
        "@type": "ProfessionalService",
        "@id": SERVICE_ID,
        name: `${AUTHOR_SHORT} — Desenvolvimento de Software`,
        description: TAGLINE,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        founder: { "@id": PERSON_ID },
        priceRange: "$$",
        telephone: PHONE_E164,
        email: `mailto:${EMAIL}`,
        areaServed: [
          { "@type": "Country", name: "Brasil" },
          { "@type": "Place", name: "Remoto / mundial" },
        ],
        availableLanguage: ["Portuguese", "English"],
        serviceType: SERVICES.map((s) => s.title),
        sameAs: SAME_AS,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços de desenvolvimento",
          itemListElement: SERVICES.map((s) => ({
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
        "@id": `${SITE_URL}/#projetos`,
        name: "Projetos em destaque",
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
            codeRepository: p.codeUrl,
            ...(p.demoUrl ? { url: p.demoUrl } : {}),
            dateModified: p.pushedAt,
            author: { "@id": PERSON_ID },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
