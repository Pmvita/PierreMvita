"use client";

import { useEffect, useState } from "react";
import { experience, type Experience } from "@/content/experience";
import { motion, AnimatePresence } from "framer-motion";

export function Timeline() {
  const [selected, setSelected] = useState<Experience | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="experience" className="scroll-mt-24 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">
          Experience
        </p>
        <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          How the work actually happened.
        </h2>

        <ol className="mt-14 flex list-none flex-col gap-4">
          {experience.map((job) => (
            <li key={job.title}>
              <button
                type="button"
                onClick={() => setSelected(job)}
                className="flex w-full items-start gap-5 rounded-md px-1 py-4 text-left md:px-6"
              >
                <span className="flex flex-col items-center gap-3 pt-3 md:flex-1">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                    {job.period}
                  </span>
                  <span className="w-px flex-1 bg-line" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-display text-2xl text-ink sm:text-3xl">
                    {job.title}
                  </span>
                  <span className="mt-2 block text-sm text-muted">
                    {job.company} · {job.location}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm text-muted">
                    {job.summary}
                  </span>
                </span>

                <span className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                  Details
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-canvas/80 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setSelected(null)}
          >
            <motion.div
              id="experience-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md border border-line bg-elevated p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl text-ink">
                    {selected.title}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                    {selected.company} · {selected.period}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="rounded-md border border-line p-2 text-muted hover:text-ink"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1l12 12M1 13L13 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <ul className="mt-8 flex flex-col gap-4">
                {selected.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 pl-1"
                  >
                    <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                    <p className="text-sm leading-relaxed text-muted">{bullet}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
