import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { AUTHOR, SITE_URL, siteCopy } from "@/lib/site";
import { HTML_LANG, LOCALES, OG_LOCALE, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = siteCopy(locale);
  const title = `${copy.siteName} | ${copy.titleSuffix}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${AUTHOR}`,
    },
    description: copy.metaDescription,
    keywords: copy.keywords,
    applicationName: copy.siteName,
    authors: [{ name: AUTHOR, url: SITE_URL }],
    creator: AUTHOR,
    publisher: AUTHOR,
    category: "technology",
    alternates: {
      canonical: `/${locale}`,
      // hreflang map: x-default points at pt-BR, the primary language.
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l]
      ),
      url: `${SITE_URL}/${locale}`,
      siteName: copy.siteName,
      title,
      description: copy.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.siteName,
      description: copy.tagline,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false },
    other: {
      // Consumed by AI crawlers that look for a plain-text summary of the site.
      "ai-content-declaration": "human-authored",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={HTML_LANG[locale]}>
      <head>
        <link
          rel="alternate"
          type="text/markdown"
          href={`/${locale}/index.md`}
        />
        <link
          rel="alternate"
          type="text/plain"
          href={locale === "pt" ? "/llms.txt" : "/en/llms.txt"}
        />
        <link
          rel="service-desc"
          type="text/plain"
          href={locale === "pt" ? "/llms.txt" : "/en/llms.txt"}
        />
        <link
          rel="api-catalog"
          type="application/linkset+json"
          href="/.well-known/api-catalog"
        />
        <link rel="preconnect" href="https://api.github.com" />
        <noscript>
          {/* Framer Motion reveals start at opacity 0; keep them visible when
              JS never runs (text-only crawlers, JS disabled). */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
