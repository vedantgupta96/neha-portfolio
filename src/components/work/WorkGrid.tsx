import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import Marquee from "@/components/Marquee";

export default function WorkGrid() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <Marquee />

      <div className="mx-auto mt-20 max-w-6xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            Selected work
            <span className="text-cyan">.</span>
          </h2>
          <p className="text-sm text-muted">
            {projects.length} projects · product, web &amp; concept
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            // nudge the right column down for a playful, offset rhythm
            <div key={project.slug} className={i % 2 === 1 ? "md:mt-16" : ""}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
