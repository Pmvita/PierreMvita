import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function WorkList() {
  return (
    <section id="work" className="scroll-mt-24 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">
              Selected work
            </p>
            <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              Cloud first. Product when it matters.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
