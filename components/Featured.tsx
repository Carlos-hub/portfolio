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
