"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { experience, type Experience } from "@/content/experience"

export function Timeline() {
  const [selected, setSelected] = useState<Experience | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [selected])

  return (
    <section id="experience" className="scroll-mt-24 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.32em] text-gold uppercase">
          Experience
        </p>
        <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          How the work actually happened.
        </h2>

        <ol className="mt-14">
          {experience.map((job) => (
            <li key={job.title} className="border-t border-line">
              <button
                type="button"
                onClick={() => setSelected(job)}
                className="group grid w-full gap-3 py-8 text-left md:grid-cols-[11rem_1fr_auto] md:items-baseline md:gap-10"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                  {job.period}
                </span>
                <span>
                  <span className="block font-display text-2xl text-ink group-hover:text-gold-bright sm:text-3xl">
                    {job.title}
                  </span>
                  <span className="mt-2 block text-sm text-muted">
                    {job.company} · {job.location}
                  </span>
                  <span className="mt-3 block max-w-xl text-sm text-muted">
                    {job.summary}
                  </span>
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-gold uppercase">
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
            className="fixed inset-0 z-50 flex items-end justify-center bg-canvas/80 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="experience-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-line bg-elevated p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    id="experience-title"
                    className="font-display text-3xl text-ink"
                  >
                    {selected.title}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-gold uppercase">
                    {selected.company} · {selected.period}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="border border-line p-2 text-muted hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              </div>

              <ul className="mt-8 flex flex-col gap-4">
                {selected.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="border-l border-gold/40 pl-4 text-sm leading-relaxed text-muted"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              <ul className="mt-8 flex flex-wrap gap-3">
                {selected.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-line px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-gold uppercase"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
