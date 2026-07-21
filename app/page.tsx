import Hero from "@/components/Hero";
import Pulse from "@/components/Pulse";
import { fetchRepos, computePulseStats } from "@/lib/github";

export default async function Home() {
  const repos = await fetchRepos();
  const stats = computePulseStats(repos);

  return (
    <main>
      <Hero />
      <Pulse stats={stats} />
    </main>
  );
}
