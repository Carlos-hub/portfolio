import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  AUTHOR,
  META_DESCRIPTION,
  KEYWORDS,
  SITE_NAME,
  SITE_URL,
  TAGLINE,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Sites, Sistemas e Apps sob Medida`,
    template: `%s | ${AUTHOR}`,
  },
  description: META_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
  publisher: AUTHOR,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Sites, Sistemas e Apps sob Medida`,
    description: TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: TAGLINE,
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

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" />
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
