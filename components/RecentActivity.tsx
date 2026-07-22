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
