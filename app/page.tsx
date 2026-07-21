import Hero from "@/components/Hero";
import Pulse from "@/components/Pulse";
import Featured from "@/components/Featured";
import { fetchRepos, computePulseStats, buildFeatured } from "@/lib/github";

export default async function Home() {
  const repos = await fetchRepos();
  const stats = computePulseStats(repos);
  const featured = buildFeatured(repos);

  return (
    <main>
      <Hero />
      <Pulse stats={stats} />
      <Featured projects={featured} />
    </main>
  );
}
