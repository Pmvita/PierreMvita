import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, type Project } from "@/content/projects";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.title} — Pierre Mvita`;
  const description =
    project.outcome ||
    project.stack.join(" · ") ||
    "Full-stack build by Pierre Mvita.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Pierre Mvita",
      images: [
        {
          url: `/og/${slug}.png`,
          width: 1200,
          height: 630,
          alt: `${project.title} — Pierre Mvita`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og/${slug}.png`],
    },
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
    return null;
  }

  const diagramNodes = project.architecture.map((node, i) => ({
    node,
    index: i + 1,
    isLast: i === project.architecture.length - 1,
  }));

  return (
    <>
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
            >
              Pierre Mvita
            </Link>
            <span className="text-muted">/</span>
            <Link
              href="/work"
              className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
            >
              Work
            </Link>
            <span className="text-muted">/</span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase">
              {project.kicker}
            </span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
            {/* main column */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
                  {project.index}
                </p>
                <h1 className="font-display text-4xl text-ink leading-tight md:text-5xl">
                  {project.title}
                </h1>
                {project.added && (
                  <p className="ml-4 font-mono text-[11px] tracking-[0.18em] text-muted">
                    {project.added}
                  </p>
                )}
              </div>

              <p className="mt-3 text-lg leading-relaxed text-ink">
                {project.outcome}
              </p>

              <div className="mt-6">
                <h2 className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
                  Stack
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line px-3 py-1 font-mono text-xs text-ink/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
                  Architecture
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The build, in order. Nodes are drawn as a connected strip
                  — square-cornered, no icons, no gradients — from the
                  architecture array above.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    {diagramNodes.map((item) => (
                      <div
                        key={item.node}
                        className="flex items-center gap-2 rounded-md border border-line bg-elevated px-3 py-2"
                      >
                        <span className="min-w-[1.4rem] h-[1.4rem] flex items-center justify-center rounded-sm bg-accent/10 px-1.5 text-xs font-mono text-accent">
                          {item.index}
                        </span>
                        <span className="font-mono text-sm text-ink/90">
                          {item.node}
                        </span>
                        {!item.isLast && (
                          <span aria-hidden="true" className="text-sm text-muted">
                            →
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* case study */}
              {project.caseStudy && (
                <section className="mt-10">
                  <h2 className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
                    How I built {project.title}
                  </h2>
                  <div className="mt-4 border border-line bg-elevated p-6">
                    <p className="leading-relaxed text-muted">
                      {project.caseStudy.lead}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {project.caseStudy.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex gap-3 pl-1 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-accent" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent">
                        Reflection
                      </span>
                      <br />
                      {project.caseStudy.reflection}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* aside */}
            <aside className="w-full md:w-72">
              <div className="sticky top-24 rounded-md border border-line bg-elevated p-5">
                <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
                  {project.title}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {project.year} · {project.kicker}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-ink/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:text-accent"
                    >
                      <svg
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 13" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Live
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:text-accent"
                  >
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.597-.736.887-.936.887-.936l-3.184 3.368a.326.326 0 0 1-.493-.023l-3.52-3.52c-.822-.822-.822-2.157 0-2.979.822-.822 2.157-.822 2.979 0l3.52 3.52a.326.326 0 0 1 .493.023l3.184-3.368c.355.398.602.875.887 1.136C6.614 20.386 10.336 21 12 21c6.626 0 12-5.373 12-12S18.626 0 12 0z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
