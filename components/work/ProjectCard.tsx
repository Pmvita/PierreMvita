import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="doc-paper" style={{ maxWidth: "460px" }}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
            {project.kicker}
          </p>
          <h3 className="mt-2 font-display text-3xl text-ink leading-tight sm:text-4xl md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
            {project.index} · {project.year}
          </p>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
        >
          GitHub
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">{project.outcome}</p>

      <div className="mt-8 border-t border-line pt-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Architecture
        </p>
        <ol className="mt-3 flex flex-wrap gap-2">
          {project.architecture.map((node) => (
            <li
              key={node}
              className="flex items-center gap-2 font-mono text-[11px] text-ink/85"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {node}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Stack
        </p>
        <p className="mt-2 font-mono text-[11px] text-ink/75">
          {project.stack.join(" · ")}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-5">
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
          >
            Live
            <ArrowUpRight className="size-3.5" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
