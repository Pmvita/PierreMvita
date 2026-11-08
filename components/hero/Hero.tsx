"use client";

import { ArrowRight, Download } from "lucide-react";
import { site } from "@/content/site";
import { useScrubContext } from "@/components/layout/ScrubProvider";

export function Hero() {
  const { scrub } = useScrubContext();

  // Baseline 3D lift driven by the hero scrub.
  const lift = Math.min(scrub * 18, 18);
  const opacity = 0.85 + scrub * 0.15;

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-start px-5 pt-24 pb-14 md:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
        <div className="flex flex-col gap-3" style={{ opacity: opacity }}>
          {/* personal mark + location line */}
          <div className="flex items-center gap-3">
            <span className="mark-mark">PM</span>
            <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
              Toronto · {site.availability}
            </p>
          </div>

          <h1
            className="font-display text-5xl leading-[1.05] text-ink sm:text-6xl md:text-7xl"
            style={{
              transform: `translateY(-${lift}px)`,
              transformOrigin: "center bottom",
            }}
          >
            Pierre
            <span className="block italic text-accent">Mvita</span>
          </h1>

          <p className="font-body text-base leading-relaxed text-ink/90 italic sm:text-xl">
            {site.role}
          </p>

          <p className="max-w-xl text-sm leading-relaxed text-muted">
            {site.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="#work"
              className="brass-chrome inline-flex items-center gap-2 self-start font-mono text-[11px] tracking-[0.18em] uppercase"
            >
              View selected work
              <ArrowRight className="size-4" />
            </a>
            <a
              href={site.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-md border border-line bg-elevated px-6 py-3 font-mono text-[11px] tracking-[0.18em] text-ink uppercase hover:border-accent hover:bg-elevated/80 transition"
            >
              <Download className="size-4" />
              {site.resumeLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
