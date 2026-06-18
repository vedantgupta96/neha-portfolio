import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function WorkGrid() {
  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Selected work
          </h2>
          <p className="text-sm text-muted">
            {projects.length} projects · product, web &amp; concept
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
