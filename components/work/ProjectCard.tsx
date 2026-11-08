import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  const hasCase = Boolean(project.caseStudy);

  return (
    <article
      className="steel-surface"
      style={{ maxWidth: "460px", borderTopWidth: hasCase ? "2px" : "1px" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
            {project.kicker}
          </p>
          <h3 className="mt-2 font-display text-3xl text-ink leading-tight sm:text-4xl md:text-5xl">
            {project.title}
          </h3>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.18em] text-accent uppercase hover:text-accent-bright"
        >
          <ArrowUpRight className="size-3.5" />
          GitHub
        </a>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{project.outcome}</p>

      {project.year && (
        <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          {project.index} · {project.year}
        </p>
      )}

      {project.live && (
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.18em] text-accent uppercase hover:text-accent-bright"
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 13" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            Live
          </a>
        </div>
      )}

      <div className="mt-6 border-t border-line pt-6">
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

      <div className="mt-4 border-t border-line pt-4">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          Stack
        </p>
        <p className="mt-2 font-mono text-[11px] text-ink/75">
          {project.stack.join(" · ")}
        </p>
      </div>
    </article>
  );
}
