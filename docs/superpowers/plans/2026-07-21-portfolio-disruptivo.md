# Portfolio Disruptivo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bold, dark, neon-green single-page Next.js portfolio for Carlos de Lara that pulls live GitHub repo data and funnels visitors to WhatsApp.

**Architecture:** Next.js App Router (Server Components) fetches GitHub data at build/ISR time (`revalidate: 3600`) via a pure, isolated data layer in `lib/`. Client components add Framer Motion animations. All content renders server-side with cached data; the browser never calls the GitHub API. If the API fails, static fallback data keeps the site working.

**Tech Stack:** Next.js 15 (App Router) + TypeScript, Tailwind CSS v4, Framer Motion, Vitest (unit tests for the data layer).

## Global Constraints

- Language of all UI copy: **pt-BR**.
- Accent color: **neon green** `#39FF14` on a dark canvas (`#0a0a0a` background). One accent only.
- WhatsApp number: `5549991117061` → link form `https://wa.me/5549991117061?text=<encoded msg>`.
- GitHub user: `Carlos-hub`. Repo list endpoint: `https://api.github.com/users/Carlos-hub/repos?per_page=100&sort=updated`.
- GitHub fetches use ISR: `fetch(url, { next: { revalidate: 3600 }, headers })`. If `process.env.GITHUB_TOKEN` is set, send `Authorization: Bearer <token>`.
- The GitHub API must never crash the page: every fetch wrapper catches errors and returns a typed fallback.
- Contacts: e-mail `delaracarlosmiguel@gmail.com`, LinkedIn `https://www.linkedin.com/in/carlos-hub/`, GitHub `https://github.com/Carlos-hub`.
- Node 25 / npm 11 available. Package manager: npm.

---

### Task 1: Scaffold app, remove old files, design tokens

**Files:**
- Delete: `index.html`, `script.js`
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `.gitignore`, `.env.example`
- Create: `vitest.config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: a running Next.js dev server; global CSS tokens `--bg`, `--fg`, `--accent`; a placeholder `app/page.tsx` exporting default `Home`.

- [ ] **Step 1: Remove leftover school-project files**

```bash
git rm -q index.html script.js
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.11.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: `node_modules` created, no fatal errors.

- [ ] **Step 4: Create config files**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

`postcss.config.mjs`:
```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
```

`.gitignore`:
```
node_modules
.next
out
.env
.env.local
*.log
.DS_Store
next-env.d.ts
```

`.env.example`:
```
# Optional: raises GitHub API rate limit from 60/h to 5000/h.
# Create a fine-grained token with public read access at https://github.com/settings/tokens
GITHUB_TOKEN=
```

- [ ] **Step 5: Create global CSS with design tokens**

`app/globals.css`:
```css
@import "tailwindcss";

:root {
  --bg: #0a0a0a;
  --fg: #f5f5f5;
  --muted: #8a8a8a;
  --accent: #39ff14;
  --card: #141414;
  --border: #262626;
}

@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-card: var(--card);
  --color-border: var(--border);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 6: Create root layout**

`app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlos de Lara — Desenvolvedor Fullstack",
  description:
    "Desenvolvedor fullstack freelancer. Sites, sistemas e apps sob medida. Veja projetos reais e fale comigo no WhatsApp.",
  openGraph: {
    title: "Carlos de Lara — Desenvolvedor Fullstack",
    description:
      "Sites, sistemas e apps sob medida. Projetos reais, código no ar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Create placeholder page**

`app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center">
      <h1 className="text-4xl font-bold text-accent">Portfolio em construção</h1>
    </main>
  );
}
```

- [ ] **Step 8: Run dev server and verify it boots**

Run: `npm run dev` (then stop it after confirming)
Expected: server starts on http://localhost:3000, page shows "Portfolio em construção" in neon green. Then `Ctrl+C`.

- [ ] **Step 9: Verify build and types**

Run: `npm run build`
Expected: build succeeds, no type errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js portfolio, remove old school project"
```

---

### Task 2: Data layer — types, curated featured list, GitHub fetch + pure transforms

**Files:**
- Create: `lib/types.ts`, `lib/featured.ts`, `lib/github.ts`, `lib/github.test.ts`, `lib/whatsapp.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `types.ts`: `RawRepo`, `Repo`, `FeaturedProject`, `PulseStats`.
  - `github.ts`: `normalizeRepo(raw: RawRepo): Repo`; `computePulseStats(repos: Repo[]): PulseStats`; `buildFeatured(repos: Repo[]): FeaturedProject[]`; `getRecentActivity(repos: Repo[], featuredNames: string[], limit: number): Repo[]`; async `fetchRepos(): Promise<Repo[]>`.
  - `whatsapp.ts`: `whatsappLink(message: string): string`.
  - `featured.ts`: `FEATURED: CuratedProject[]` (ordered, with static fallback fields).

- [ ] **Step 1: Write types**

`lib/types.ts`:
```ts
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
```

- [ ] **Step 2: Write curated featured list**

`lib/featured.ts`:
```ts
export interface CuratedProject {
  name: string; // repo name on GitHub
  title: string; // display title
  description: string; // curated copy
  fallbackLanguage: string;
  fallbackDemoUrl: string | null;
  codeUrl: string;
  fallbackPushedAt: string; // used only if API is down
}

// Order defines display order. PlanejAI first.
export const FEATURED: CuratedProject[] = [
  {
    name: "planejai-trilha",
    title: "PlanejAI + Trilha",
    description:
      "Planejador de aulas alinhado à BNCC com IA — gera plano de aula e trilha de estudo gamificada (quiz autocorrigido, acesso por código) num clique. MVP do Hackathon FIAP.",
    fallbackLanguage: "Go",
    fallbackDemoUrl: null,
    codeUrl: "https://github.com/Carlos-hub/planejai-trilha",
    fallbackPushedAt: "2026-07-17T00:00:00Z",
  },
  {
    name: "ignite-lab-eventPlatform",
    title: "Ignite Lab Event",
    description:
      "Plataforma de evento online: inscrição, agenda dinâmica e player de vídeo integrado.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl:
      "https://ignite-lab-event-platform-oxcfjgybl-carlos-hub.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/ignite-lab-eventPlatform",
    fallbackPushedAt: "2022-09-14T00:00:00Z",
  },
  {
    name: "Pouca-carne",
    title: "Pouca Carne",
    description:
      "Sistema fullstack para restaurante vegano (TCC): pedidos, clientes, entregadores e painel administrativo.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://pouca-carne.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/Pouca-carne",
    fallbackPushedAt: "2023-01-20T00:00:00Z",
  },
  {
    name: "codeFlix-front",
    title: "CodeFlix",
    description:
      "Interface estilo streaming (Netflix-like) construída em Next.js.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://code-flix-front.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/codeFlix-front",
    fallbackPushedAt: "2024-03-15T00:00:00Z",
  },
  {
    name: "devEvolution",
    title: "devEvolution",
    description:
      "API de delivery de produtos e pedidos, com todas as rotas documentadas em Swagger.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://devevolution-production.up.railway.app",
    codeUrl: "https://github.com/Carlos-hub/devEvolution",
    fallbackPushedAt: "2023-03-27T00:00:00Z",
  },
  {
    name: "nlw-return",
    title: "NLW Return",
    description:
      "Widget de feedback (bug, ideia ou elogio) com captura de screenshot integrada.",
    fallbackLanguage: "TypeScript",
    fallbackDemoUrl: "https://nlw-return-portifolio.vercel.app",
    codeUrl: "https://github.com/Carlos-hub/nlw-return",
    fallbackPushedAt: "2022-06-02T00:00:00Z",
  },
];
```

- [ ] **Step 3: Write WhatsApp helper**

`lib/whatsapp.ts`:
```ts
const PHONE = "5549991117061";

export function whatsappLink(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 4: Write failing tests for the pure transforms**

`lib/github.test.ts`:
```ts
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
```

- [ ] **Step 5: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — module `./github` has no such exports.

- [ ] **Step 6: Implement `lib/github.ts`**

```ts
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
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all tests green.

- [ ] **Step 8: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add lib
git commit -m "feat: GitHub data layer with curated featured projects and fallback"
```

---

### Task 3: Hero section with animated background and WhatsApp CTA

**Files:**
- Create: `components/Hero.tsx`, `components/AnimatedBackground.tsx`, `components/WhatsappButton.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `whatsappLink` from `lib/whatsapp.ts`.
- Produces: `<Hero />` (server component), `<WhatsappButton label message className? />` (client), `<AnimatedBackground />` (client, mouse-reactive canvas grid).

- [ ] **Step 1: Create the WhatsApp button (client component)**

`components/WhatsappButton.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsappButton({
  label,
  message,
  className = "",
}: {
  label: string;
  message: string;
  className?: string;
}) {
  return (
    <motion.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-bold text-black shadow-[0_0_30px_-5px_var(--accent)] transition-shadow hover:shadow-[0_0_45px_0_var(--accent)] ${className}`}
    >
      {label}
    </motion.a>
  );
}
```

- [ ] **Step 2: Create the animated background (client component)**

`components/AnimatedBackground.tsx`:
```tsx
"use client";

import { useEffect, useRef } from "react";

// Lightweight mouse-reactive dot grid on a canvas. No WebGL — cheap and
// degrades gracefully. Respects prefers-reduced-motion.
export default function AnimatedBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -1000, y: -1000 };
    let raf = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);

    const gap = 34;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          const d = Math.hypot(mouse.x - x, mouse.y - y);
          const glow = Math.max(0, 1 - d / 140);
          const size = 1 + glow * 2.5;
          ctx.fillStyle = `rgba(57, 255, 20, ${0.06 + glow * 0.6})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 3: Create the Hero**

`components/Hero.tsx`:
```tsx
import AnimatedBackground from "./AnimatedBackground";
import WhatsappButton from "./WhatsappButton";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent">
          Desenvolvedor Fullstack · Freelancer
        </p>
        <h1 className="text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl">
          Carlos
          <br />
          de Lara
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted">
          Transformo ideias em produtos digitais no ar. Sites, sistemas e apps
          sob medida — do back-end ao pixel final.
        </p>
        <div className="mt-10">
          <WhatsappButton
            label="Vamos conversar →"
            message="Olá Carlos! Vi seu portfolio e quero conversar sobre um projeto."
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire Hero into the page**

`app/page.tsx`:
```tsx
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 5: Verify visually in dev**

Run: `npm run dev`
Expected: full-screen dark hero, neon dot grid reacts to mouse, name in giant type, WhatsApp button links to `wa.me/5549991117061` with pre-filled text. Stop with `Ctrl+C`.

- [ ] **Step 6: Verify build + types**

Run: `npm run build`
Expected: succeeds, no errors.

- [ ] **Step 7: Commit**

```bash
git add app components
git commit -m "feat: hero section with mouse-reactive background and WhatsApp CTA"
```

---

### Task 4: GitHub Pulse section

**Files:**
- Create: `components/Pulse.tsx`, `components/Section.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `fetchRepos`, `computePulseStats` from `lib/github.ts`; `PulseStats` type.
- Produces: `<Section id title eyebrow? children />` reusable wrapper; `<Pulse stats />` presentational component.

- [ ] **Step 1: Create reusable Section wrapper**

`components/Section.tsx`:
```tsx
export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 py-24">
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-12 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Create the Pulse component**

`components/Pulse.tsx`:
```tsx
import type { PulseStats } from "@/lib/types";
import Section from "./Section";

export default function Pulse({ stats }: { stats: PulseStats }) {
  const maxLang = Math.max(1, ...stats.languages.map((l) => l.count));
  const lastCommit =
    stats.daysSinceLastCommit === 0
      ? "hoje"
      : `há ${stats.daysSinceLastCommit} dia${
          stats.daysSinceLastCommit > 1 ? "s" : ""
        }`;

  return (
    <Section id="pulse" eyebrow="Ao vivo do GitHub" title="Sempre codando">
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat value={String(stats.totalRepos)} label="repositórios públicos" />
        <Stat value={String(stats.liveProjects)} label="projetos no ar" />
        <Stat value={lastCommit} label="último commit" />
      </div>

      <div className="mt-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Linguagens mais usadas
        </p>
        <div className="space-y-3">
          {stats.languages.map((l) => (
            <div key={l.name} className="flex items-center gap-4">
              <span className="w-28 shrink-0 text-sm">{l.name}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${(l.count / maxLang) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right text-sm text-muted">
                {l.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <div className="text-4xl font-black text-accent">{value}</div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}
```

- [ ] **Step 3: Fetch data in the page and render Pulse**

`app/page.tsx`:
```tsx
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
```

- [ ] **Step 4: Verify in dev**

Run: `npm run dev`
Expected: below the hero, a "Sempre codando" section shows real repo count, live-projects count, last-commit text, and a language bar chart. Stop with `Ctrl+C`.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds; build logs show the fetch happening.

- [ ] **Step 6: Commit**

```bash
git add app components
git commit -m "feat: live GitHub pulse section"
```

---

### Task 5: Featured projects section

**Files:**
- Create: `components/Featured.tsx`, `components/ProjectCard.tsx`, `lib/format.ts`, `lib/format.test.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `buildFeatured` from `lib/github.ts`; `FeaturedProject` type.
- Produces: `formatUpdatedAgo(iso: string, now?: Date): string` in `lib/format.ts`; `<Featured projects />`; `<ProjectCard project index />` (client, hover reveal).

- [ ] **Step 1: Write failing test for the relative-time formatter**

`lib/format.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { formatUpdatedAgo } from "./format";

const now = new Date("2026-07-21T00:00:00Z");

describe("formatUpdatedAgo", () => {
  it("says 'hoje' for today", () => {
    expect(formatUpdatedAgo("2026-07-21T00:00:00Z", now)).toBe("hoje");
  });
  it("uses days for < 30 days", () => {
    expect(formatUpdatedAgo("2026-07-16T00:00:00Z", now)).toBe("há 5 dias");
  });
  it("uses months for < 12 months", () => {
    expect(formatUpdatedAgo("2026-04-21T00:00:00Z", now)).toBe("há 3 meses");
  });
  it("uses years otherwise", () => {
    expect(formatUpdatedAgo("2023-07-21T00:00:00Z", now)).toBe("há 3 anos");
  });
  it("singular forms", () => {
    expect(formatUpdatedAgo("2026-07-20T00:00:00Z", now)).toBe("há 1 dia");
    expect(formatUpdatedAgo("2026-06-21T00:00:00Z", now)).toBe("há 1 mês");
    expect(formatUpdatedAgo("2025-07-21T00:00:00Z", now)).toBe("há 1 ano");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `./format` not found.

- [ ] **Step 3: Implement the formatter**

`lib/format.ts`:
```ts
export function formatUpdatedAgo(iso: string, now: Date = new Date()): string {
  const days = Math.floor((now.getTime() - Date.parse(iso)) / 86_400_000);
  if (days <= 0) return "hoje";
  if (days < 30) return `há ${days} dia${days > 1 ? "s" : ""}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `há ${months} ${months > 1 ? "meses" : "mês"}`;
  const years = Math.floor(days / 365);
  return `há ${years} ano${years > 1 ? "s" : ""}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Create the ProjectCard (client component)**

`components/ProjectCard.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import type { FeaturedProject } from "@/lib/types";
import { formatUpdatedAgo } from "@/lib/format";

export default function ProjectCard({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-accent"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-accent">
          {project.language}
        </span>
        <span className="text-xs text-muted">
          {formatUpdatedAgo(project.pushedAt)}
        </span>
      </div>
      <h3 className="text-2xl font-bold">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-6 flex gap-3">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black"
          >
            Demo ao vivo
          </a>
        )}
        <a
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold transition-colors group-hover:border-accent"
        >
          Código
        </a>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 6: Create the Featured section**

`components/Featured.tsx`:
```tsx
import type { FeaturedProject } from "@/lib/types";
import Section from "./Section";
import ProjectCard from "./ProjectCard";

export default function Featured({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  return (
    <Section id="projetos" eyebrow="Selecionados" title="Projetos em destaque">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 7: Wire into page**

`app/page.tsx`:
```tsx
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
```

- [ ] **Step 8: Verify in dev**

Run: `npm run dev`
Expected: 6 project cards, PlanejAI first, each with language badge + "atualizado há X", Demo button only where a demo exists, cards animate in on scroll. Stop with `Ctrl+C`.

- [ ] **Step 9: Verify build + tests**

Run: `npm run build && npm test`
Expected: both succeed.

- [ ] **Step 10: Commit**

```bash
git add app components lib
git commit -m "feat: featured projects section with live metadata"
```

---

### Task 6: Recent activity section

**Files:**
- Create: `components/RecentActivity.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `getRecentActivity` from `lib/github.ts`; `FEATURED` from `lib/featured.ts`; `formatUpdatedAgo`.
- Produces: `<RecentActivity repos />`.

- [ ] **Step 1: Create the RecentActivity component**

`components/RecentActivity.tsx`:
```tsx
import type { Repo } from "@/lib/types";
import Section from "./Section";
import { formatUpdatedAgo } from "@/lib/format";

export default function RecentActivity({ repos }: { repos: Repo[] }) {
  if (repos.length === 0) return null;
  return (
    <Section
      id="atividade"
      eyebrow="Direto da esteira"
      title="Atividade recente"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <a
            key={r.name}
            href={r.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{r.name}</span>
              {r.language && (
                <span className="text-xs text-accent">{r.language}</span>
              )}
            </div>
            <p className="mt-2 line-clamp-2 text-xs text-muted">
              {r.description ?? "Projeto em evolução."}
            </p>
            <span className="mt-3 text-xs text-muted">
              {formatUpdatedAgo(r.pushedAt)}
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Wire into page**

`app/page.tsx` (add import and render after Featured):
```tsx
import Hero from "@/components/Hero";
import Pulse from "@/components/Pulse";
import Featured from "@/components/Featured";
import RecentActivity from "@/components/RecentActivity";
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
      <Hero />
      <Pulse stats={stats} />
      <Featured projects={featured} />
      <RecentActivity repos={recent} />
    </main>
  );
}
```

- [ ] **Step 3: Add the `line-clamp` utility check**

Tailwind v4 includes `line-clamp` by default. No config needed.

- [ ] **Step 4: Verify in dev**

Run: `npm run dev`
Expected: a grid of up to 6 recent non-featured repos, each linking to GitHub, with language + relative time. Stop with `Ctrl+C`.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Commit**

```bash
git add app components
git commit -m "feat: recent activity grid from live repos"
```

---

### Task 7: Services + Contact + footer, final assembly

**Files:**
- Create: `components/Services.tsx`, `components/Contact.tsx`, `components/Footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `WhatsappButton`.
- Produces: `<Services />`, `<Contact />`, `<Footer />`. Page is complete.

- [ ] **Step 1: Create the Services section**

`components/Services.tsx`:
```tsx
import Section from "./Section";

const SERVICES = [
  {
    title: "Sites & sistemas sob medida",
    desc: "Aplicações web fullstack, do banco de dados à interface.",
  },
  {
    title: "Landing pages de alta conversão",
    desc: "Páginas rápidas e persuasivas focadas em resultado.",
  },
  {
    title: "Apps mobile",
    desc: "Aplicativos Android e iOS com React Native.",
  },
  {
    title: "Consultoria técnica",
    desc: "Otimização, arquitetura e resolução de gargalos.",
  },
];

export default function Services() {
  return (
    <Section id="servicos" eyebrow="Como posso ajudar" title="Serviços">
      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <h3 className="text-xl font-bold text-accent">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create the Contact section**

`components/Contact.tsx`:
```tsx
import Section from "./Section";
import WhatsappButton from "./WhatsappButton";

export default function Contact() {
  return (
    <Section id="contato" eyebrow="Bora começar" title="Vamos conversar?">
      <p className="max-w-xl text-lg text-muted">
        Tem um projeto em mente? Me chama no WhatsApp — respondo rápido e a
        primeira conversa é sem compromisso.
      </p>
      <div className="mt-8">
        <WhatsappButton
          label="Chamar no WhatsApp →"
          message="Olá Carlos! Quero conversar sobre um projeto."
        />
      </div>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
        <a
          className="hover:text-accent"
          href="mailto:delaracarlosmiguel@gmail.com"
        >
          delaracarlosmiguel@gmail.com
        </a>
        <a
          className="hover:text-accent"
          href="https://www.linkedin.com/in/carlos-hub/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="hover:text-accent"
          href="https://github.com/Carlos-hub"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create the Footer**

`components/Footer.tsx`:
```tsx
export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 text-center text-sm text-muted">
      © {new Date().getFullYear()} Carlos Miguel de Lara · Feito com Next.js
    </footer>
  );
}
```

- [ ] **Step 4: Final page assembly**

`app/page.tsx`:
```tsx
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
```

- [ ] **Step 5: Verify full page in dev**

Run: `npm run dev`
Expected: full scroll — hero → pulse → projetos → atividade → serviços → contato → footer. Both WhatsApp buttons open chat with pre-filled text. Stop with `Ctrl+C`.

- [ ] **Step 6: Commit**

```bash
git add app components
git commit -m "feat: services, contact, footer — complete single-page portfolio"
```

---

### Task 8: Polish, verification, README, deploy notes

**Files:**
- Create: `README.md` (rewrite), `components/Nav.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx`

**Interfaces:**
- Consumes: all prior components.
- Produces: sticky nav; rewritten README with local dev + deploy instructions.

- [ ] **Step 1: Create a minimal sticky nav**

`components/Nav.tsx`:
```tsx
export default function Nav() {
  const links = [
    ["Projetos", "#projetos"],
    ["Serviços", "#servicos"],
    ["Contato", "#contato"],
  ];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-bg/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-black tracking-tight">
          CL<span className="text-accent">.</span>
        </a>
        <div className="flex gap-6 text-sm text-muted">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-accent">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add Nav to the page**

In `app/page.tsx`, import `Nav` and render it as the first child of `<main>`:
```tsx
import Nav from "@/components/Nav";
// ...
  return (
    <main>
      <Nav />
      <Hero />
      {/* ...rest unchanged... */}
    </main>
  );
```

- [ ] **Step 3: Run the full verification suite**

Run: `npm test && npm run typecheck && npm run build`
Expected: tests pass, no type errors, production build succeeds.

- [ ] **Step 4: Manual responsive check**

Run: `npm run dev`, open http://localhost:3000, resize to mobile width (~375px).
Expected: no horizontal scroll; hero type scales down; grids collapse to one column; nav stays usable. Stop with `Ctrl+C`.

- [ ] **Step 5: Rewrite README**

`README.md`:
```markdown
# Portfolio — Carlos de Lara

Portfolio pessoal de desenvolvedor fullstack freelancer. Single-page em
Next.js com dados dos repositórios do GitHub puxados ao vivo (ISR) e CTA
direto para WhatsApp.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Vitest

## Rodando local

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Variáveis de ambiente (opcional)

Copie `.env.example` para `.env.local`. Definir `GITHUB_TOKEN` sobe o rate
limit da API do GitHub de 60/h para 5000/h. Sem token, o site funciona
normalmente (fetch com cache ISR de 1h).

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm test` — testes unitários da camada de dados
- `npm run typecheck` — checagem de tipos

## Deploy

Deploy na Vercel: importe o repositório e (opcional) adicione `GITHUB_TOKEN`
nas Environment Variables. Sem configuração extra.
```

- [ ] **Step 6: Commit**

```bash
git add README.md app components
git commit -m "feat: sticky nav, rewrite README, final polish"
```

- [ ] **Step 7: Final confirmation**

Run: `npm run build`
Expected: clean production build. Portfolio complete and ready to deploy to Vercel.

---

## Notes for the implementer

- **Do not** add a client-side GitHub fetch — all data comes from Server Components. This is deliberate (rate limits, speed, SEO).
- **Framer Motion** components must have `"use client"`. Server components (`Hero`, `Pulse`, `Featured`, `Section`, etc.) must not.
- If `npm run build` warns about `next lint` / ESLint config missing, it is non-fatal; the build still succeeds. Adding ESLint is out of scope.
- Keep the neon accent to `var(--accent)` only. No second accent color.
