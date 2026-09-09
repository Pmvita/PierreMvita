import { ArrowRight, Download } from "lucide-react"
import { site } from "@/content/site"

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center px-5 pt-28 pb-20 md:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="rise font-mono text-[11px] tracking-[0.32em] text-gold uppercase">
          {site.location} · {site.availability}
        </p>

        <h1 className="rise rise-delay-1 mt-8 font-display text-[18vw] leading-[0.85] text-ink sm:text-[12vw] lg:text-[9.5rem]">
          Pierre
          <span className="block italic text-gold-bright">Mvita</span>
        </h1>

        <p className="rise rise-delay-2 mt-8 max-w-2xl font-display text-2xl text-ink/90 italic sm:text-3xl md:text-4xl">
          {site.role}
        </p>

        <p className="rise rise-delay-3 mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
          {site.summary}
        </p>

        <div className="rise rise-delay-4 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="gold-chrome inline-flex items-center gap-2 px-6 py-3 font-mono text-[11px] tracking-[0.2em] uppercase"
          >
            View selected work
            <ArrowRight className="size-4" />
          </a>
          <a
            href={site.resumeHref}
            download
            className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-gold uppercase hover:border-gold"
          >
            <Download className="size-4" />
            {site.resumeLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
