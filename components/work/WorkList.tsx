import { projects } from "@/content/projects"
import { site } from "@/content/site"
import { CaseStudy } from "@/components/work/CaseStudy"

export function WorkList() {
  return (
    <section id="work" className="scroll-mt-24 px-5 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.32em] text-gold uppercase">
              Selected work
            </p>
            <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              Cloud first. Product when it matters.
            </h2>
          </div>
          <a
            href={site.githubMore}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase hover:text-gold"
          >
            More on GitHub
          </a>
        </div>

        <div className="mt-6">
          {projects.map((project) => (
            <CaseStudy key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
