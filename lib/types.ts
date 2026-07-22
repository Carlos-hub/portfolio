export interface RawRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  homepage: string | null;
  html_url: string;
  pushed_at: string;
}

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  fork: boolean;
  homepage: string | null;
  htmlUrl: string;
  pushedAt: string; // ISO
}

export interface FeaturedProject {
  name: string;
  title: string;
  description: string; // curated, always present
  language: string;
  demoUrl: string | null;
  codeUrl: string;
  pushedAt: string; // live if available, else fallback
}

export interface PulseStats {
  totalRepos: number;
  languages: { name: string; count: number }[]; // sorted desc, top 6
  daysSinceLastCommit: number;
  liveProjects: number; // repos with a homepage
}
