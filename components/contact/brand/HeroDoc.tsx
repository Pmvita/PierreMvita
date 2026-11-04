import { site } from "@/content/site";

export function HeroDoc() {
  return (
    <section className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">
          Identity
        </p>
        <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          Order from confusion.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Environment
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {site.environment}
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Approach
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {site.approach}
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Output
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {site.output}
            </p>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Proof
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {site.proof}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
