import type { FeaturedProject } from "@/lib/types";
import Section from "./Section";
import ProjectCard from "./ProjectCard";
import { dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default function Featured({
  projects,
  locale,
}: {
  projects: FeaturedProject[];
  locale: Locale;
}) {
  const t = dict(locale);
  return (
    <Section
      id={t.ids.projects}
      eyebrow={t.featured.eyebrow}
      title={t.featured.title}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} locale={locale} />
        ))}
      </div>
    </Section>
  );
}
