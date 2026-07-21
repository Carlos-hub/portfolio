import { describe, it, expect } from "vitest";
import {
  normalizeRepo,
  computePulseStats,
  buildFeatured,
  getRecentActivity,
} from "./github";
import type { RawRepo, Repo } from "./types";

function raw(over: Partial<RawRepo> = {}): RawRepo {
  return {
    name: "demo",
    description: null,
    language: "TypeScript",
    stargazers_count: 0,
    fork: false,
    homepage: null,
    html_url: "https://github.com/Carlos-hub/demo",
    pushed_at: "2026-01-01T00:00:00Z",
    ...over,
  };
}

function repo(over: Partial<Repo> = {}): Repo {
  return {
    name: "demo",
    description: null,
    language: "TypeScript",
    stars: 0,
    fork: false,
    homepage: null,
    htmlUrl: "https://github.com/Carlos-hub/demo",
    pushedAt: "2026-01-01T00:00:00Z",
    ...over,
  };
}

describe("normalizeRepo", () => {
  it("maps snake_case API fields to camelCase Repo", () => {
    const r = normalizeRepo(
      raw({ name: "x", stargazers_count: 3, homepage: "https://x.dev" })
    );
    expect(r).toEqual({
      name: "x",
      description: null,
      language: "TypeScript",
      stars: 3,
      fork: false,
      homepage: "https://x.dev",
      htmlUrl: "https://github.com/Carlos-hub/demo",
      pushedAt: "2026-01-01T00:00:00Z",
    });
  });

  it("treats empty-string homepage as null", () => {
    expect(normalizeRepo(raw({ homepage: "" })).homepage).toBeNull();
  });
});

describe("computePulseStats", () => {
  it("aggregates repo count, top languages, and live projects", () => {
    const repos = [
      repo({ language: "Go", homepage: "https://a.dev" }),
      repo({ language: "TypeScript" }),
      repo({ language: "TypeScript", homepage: "https://b.dev" }),
      repo({ language: null }),
    ];
    const stats = computePulseStats(repos);
    expect(stats.totalRepos).toBe(4);
    expect(stats.liveProjects).toBe(2);
    expect(stats.languages[0]).toEqual({ name: "TypeScript", count: 2 });
    expect(stats.languages.find((l) => l.name === "Go")).toEqual({
      name: "Go",
      count: 1,
    });
  });

  it("returns top 6 languages at most", () => {
    const repos = ["a", "b", "c", "d", "e", "f", "g"].map((l) =>
      repo({ language: l })
    );
    expect(computePulseStats(repos).languages.length).toBe(6);
  });

  it("computes days since the most recent commit", () => {
    const recent = new Date();
    recent.setDate(recent.getDate() - 3);
    const stats = computePulseStats([
      repo({ pushedAt: recent.toISOString() }),
      repo({ pushedAt: "2020-01-01T00:00:00Z" }),
    ]);
    expect(stats.daysSinceLastCommit).toBe(3);
  });

  it("handles empty repo list without crashing", () => {
    const stats = computePulseStats([]);
    expect(stats.totalRepos).toBe(0);
    expect(stats.languages).toEqual([]);
    expect(stats.liveProjects).toBe(0);
    expect(stats.daysSinceLastCommit).toBe(0);
  });
});

describe("buildFeatured", () => {
  it("uses live repo metadata when the repo exists", () => {
    const repos = [
      repo({
        name: "planejai-trilha",
        language: "Go",
        pushedAt: "2026-07-17T00:00:00Z",
        homepage: "https://live.dev",
      }),
    ];
    const featured = buildFeatured(repos);
    const planejai = featured.find((f) => f.name === "planejai-trilha")!;
    expect(planejai.title).toBe("PlanejAI + Trilha");
    expect(planejai.language).toBe("Go");
    expect(planejai.pushedAt).toBe("2026-07-17T00:00:00Z");
    // curated description always wins
    expect(planejai.description).toContain("BNCC");
  });

  it("falls back to curated static data when the repo is missing", () => {
    const featured = buildFeatured([]);
    const planejai = featured.find((f) => f.name === "planejai-trilha")!;
    expect(planejai.language).toBe("Go");
    expect(planejai.demoUrl).toBeNull();
    expect(planejai.pushedAt).toBe("2026-07-17T00:00:00Z");
  });

  it("preserves curated order with PlanejAI first", () => {
    const featured = buildFeatured([]);
    expect(featured[0].name).toBe("planejai-trilha");
    expect(featured.length).toBe(6);
  });

  it("prefers live homepage as demo url, else curated fallback", () => {
    const featured = buildFeatured([
      repo({ name: "codeFlix-front", homepage: "https://new-demo.dev" }),
    ]);
    expect(
      featured.find((f) => f.name === "codeFlix-front")!.demoUrl
    ).toBe("https://new-demo.dev");
  });
});

describe("getRecentActivity", () => {
  it("excludes forks and featured repos, sorts by pushedAt desc, limits", () => {
    const repos = [
      repo({ name: "planejai-trilha", pushedAt: "2026-07-01T00:00:00Z" }),
      repo({ name: "new-one", pushedAt: "2026-06-01T00:00:00Z" }),
      repo({ name: "older", pushedAt: "2026-05-01T00:00:00Z" }),
      repo({ name: "a-fork", fork: true, pushedAt: "2026-07-20T00:00:00Z" }),
    ];
    const recent = getRecentActivity(repos, ["planejai-trilha"], 2);
    expect(recent.map((r) => r.name)).toEqual(["new-one", "older"]);
  });
});
