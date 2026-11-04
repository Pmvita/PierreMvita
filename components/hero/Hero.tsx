import { ArrowRight, Download } from "lucide-react";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh flex-col items-start px-5 pt-24 pb-20 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
            {site.location} · {site.availability}
          </p>

          <h1 className="font-display text-[18vw] leading-[0.85] text-ink sm:text-[12vw] lg:text-[9.5rem]">
            Pierre
            <span className="block italic text-accent-bright">Mvita</span>
          </h1>

          <p className="font-display text-2xl text-ink/90 italic sm:text-3xl md:text-4xl">
            {site.role}
          </p>

          <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {site.summary}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="gold-chrome inline-flex items-center gap-2 self-start rounded-md px-6 py-3 font-mono text-[11px] tracking-[0.2em] uppercase"
          >
            View selected work
            <ArrowRight className="size-4" />
          </a>
          <a
            href={site.resumeHref}
            download
            className="inline-flex items-center gap-2 border border-line rounded-md px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-ink uppercase hover:border-accent"
          >
            <Download className="size-4" />
            {site.resumeLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
