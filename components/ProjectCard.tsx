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
