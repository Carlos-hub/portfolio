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
