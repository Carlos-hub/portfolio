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
import { META_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Sites, Sistemas e Apps sob Medida`,
  description: META_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default async function Home() {
  const repos = await fetchRepos();
  const stats = computePulseStats(repos);
  const featured = buildFeatured(repos);
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
          __html: JSON.stringify(buildJsonLd(featured)),
        }}
      />
      <a
        href="#projetos"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-black"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <main>
        <Hero />
        <Pulse stats={stats} />
        <Featured projects={featured} />
        <RecentActivity repos={recent} />
        <About />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
