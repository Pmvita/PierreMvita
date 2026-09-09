import { capabilities } from "@/content/skills"
import { site } from "@/content/site"

export function CapabilityLanes() {
  return (
    <section id="capabilities" className="scroll-mt-24 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.32em] text-gold uppercase">
          Capabilities
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl text-ink sm:text-5xl">
          Three lanes. One way of working.
        </h2>

        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {capabilities.map((lane) => (
            <article key={lane.id} className="bg-canvas p-7 md:p-8">
              <h3 className="font-display text-2xl text-ink">{lane.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{lane.lead}</p>
              <ul className="mt-8 flex flex-col gap-3">
                {lane.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line pt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-ink/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 border border-line p-6 md:p-8">
          <p className="font-mono text-[11px] tracking-[0.28em] text-gold uppercase">
            Certifications
          </p>
          <ul className="mt-5 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-10">
            {site.certifications.map((cert) => (
              <li key={cert} className="font-mono text-xs text-ink">
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
