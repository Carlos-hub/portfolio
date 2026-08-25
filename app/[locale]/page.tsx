import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pulse from "@/components/Pulse";
import Featured from "@/components/Featured";
import RecentActivity from "@/components/RecentActivity";
import About from "@/components/About";
import Services from "@/components/Services";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  fetchRepos,
  computePulseStats,
  buildFeatured,
  getRecentActivity,
} from "@/lib/github";
import { FEATURED } from "@/lib/featured";
import { buildJsonLd } from "@/lib/schema";
import { dict } from "@/lib/dictionary";
import { LOCALES, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = dict(locale);
  const repos = await fetchRepos();
  const stats = computePulseStats(repos);
  const featured = buildFeatured(repos, locale);
  const recent = getRecentActivity(
    repos,
    FEATURED.map((f) => f.name),
    6
  );

  return (
    <>
      {/* Rendered server-side so crawlers and LLMs get the entity graph even
          without executing any JavaScript. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(featured, locale)),
        }}
      />
      <a
        href={`#${t.ids.projects}`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-black"
      >
        {t.skipToContent}
      </a>
      <Nav locale={locale} />
      <main>
        <Hero locale={locale} />
        <Pulse stats={stats} locale={locale} />
        <Featured projects={featured} locale={locale} />
        <RecentActivity repos={recent} locale={locale} />
        <About locale={locale} />
        <Services locale={locale} />
        <Faq locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
