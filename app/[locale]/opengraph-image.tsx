import { ImageResponse } from "next/og";
import { AUTHOR_SHORT } from "@/lib/site";
import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/lib/i18n";
import { dict } from "@/lib/dictionary";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${AUTHOR_SHORT} — Fullstack Developer / Desenvolvedor Fullstack`;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const HEADLINE = {
  pt: "Sites, sistemas e apps sob medida — do back-end ao pixel final.",
  en: "Custom websites, systems and apps — from the back end to the last pixel.",
};

const STACK_LINE = {
  pt: "Web · Sistemas · Mobile · APIs · Qualquer linguagem",
  en: "Web · Systems · Mobile · APIs · Any language",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = dict(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#f5f5f5",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#39ff14",
          }}
        >
          {t.hero.eyebrow}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {AUTHOR_SHORT}
        </div>
        <div style={{ marginTop: 32, fontSize: 38, color: "#8a8a8a" }}>
          {HEADLINE[locale]}
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            fontSize: 28,
            color: "#39ff14",
          }}
        >
          {STACK_LINE[locale]}
        </div>
      </div>
    ),
    size
  );
}
