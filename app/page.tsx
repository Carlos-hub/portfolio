import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pulse from "@/components/Pulse";
import Featured from "@/components/Featured";
import RecentActivity from "@/components/RecentActivity";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  fetchRepos,
  computePulseStats,
  buildFeatured,
  getRecentActivity,
} from "@/lib/github";
import { FEATURED } from "@/lib/featured";

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
    <main>
      <Nav />
      <Hero />
      <Pulse stats={stats} />
      <Featured projects={featured} />
      <RecentActivity repos={recent} />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
