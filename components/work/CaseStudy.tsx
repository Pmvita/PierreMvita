import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/content/projects"

function ArchitectureStrip({ nodes }: { nodes: string[] }) {
  return (
    <ol className="arch-strip" aria-label="Architecture">
      {nodes.map((node, index) => (
        <li key={node} className="flex items-center gap-2">
          <span className="arch-node">{node}</span>
          {index < nodes.length - 1 ? (
            <span className="arch-arrow" aria-hidden>
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="border-t border-line py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[8rem_1fr] lg:gap-16">
        <p className="font-mono text-[11px] tracking-[0.28em] text-gold">
          {project.index} / {project.year}
        </p>

        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
            {project.kicker}
          </p>
          <h3 className="mt-3 font-display text-4xl text-ink sm:text-5xl md:text-6xl">
            {project.title}
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-[15px]">
            {project.outcome}
          </p>

          <div className="mt-8">
            <ArchitectureStrip nodes={project.architecture} />
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-5">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.18em] text-gold uppercase"
              >
                GitHub
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.18em] text-ink uppercase"
              >
                Live
                <ArrowUpRight className="size-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
