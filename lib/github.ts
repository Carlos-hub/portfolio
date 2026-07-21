import type { RawRepo, Repo, FeaturedProject, PulseStats } from "./types";
import { FEATURED } from "./featured";

const REPOS_URL =
  "https://api.github.com/users/Carlos-hub/repos?per_page=100&sort=updated";

export function normalizeRepo(raw: RawRepo): Repo {
  return {
    name: raw.name,
    description: raw.description,
    language: raw.language,
    stars: raw.stargazers_count,
    fork: raw.fork,
    homepage: raw.homepage ? raw.homepage : null,
    htmlUrl: raw.html_url,
    pushedAt: raw.pushed_at,
  };
}

export function computePulseStats(repos: Repo[]): PulseStats {
  const counts = new Map<string, number>();
  for (const r of repos) {
    if (!r.language) continue;
    counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  const languages = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  let daysSinceLastCommit = 0;
  if (repos.length > 0) {
    const latest = Math.max(...repos.map((r) => Date.parse(r.pushedAt)));
    daysSinceLastCommit = Math.floor((Date.now() - latest) / 86_400_000);
    if (daysSinceLastCommit < 0) daysSinceLastCommit = 0;
  }

  return {
    totalRepos: repos.length,
    languages,
    daysSinceLastCommit,
    liveProjects: repos.filter((r) => r.homepage).length,
  };
}

export function buildFeatured(repos: Repo[]): FeaturedProject[] {
  const byName = new Map(repos.map((r) => [r.name, r]));
  return FEATURED.map((c) => {
    const live = byName.get(c.name);
    return {
      name: c.name,
      title: c.title,
      description: c.description,
      language: live?.language ?? c.fallbackLanguage,
      demoUrl: live?.homepage ?? c.fallbackDemoUrl,
      codeUrl: c.codeUrl,
      pushedAt: live?.pushedAt ?? c.fallbackPushedAt,
    };
  });
}

export function getRecentActivity(
  repos: Repo[],
  featuredNames: string[],
  limit: number
): Repo[] {
  const exclude = new Set(featuredNames);
  return repos
    .filter((r) => !r.fork && !exclude.has(r.name))
    .sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt))
    .slice(0, limit);
}

export async function fetchRepos(): Promise<Repo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  try {
    const res = await fetch(REPOS_URL, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as RawRepo[];
    if (!Array.isArray(data)) return [];
    return data.map(normalizeRepo);
  } catch {
    return [];
  }
}
