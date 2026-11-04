import { capabilities } from "@/content/skills";
import { site } from "@/content/site";
import { motion } from "framer-motion";

function CodeSlice({ title, code }: { title: string; code: string }) {
  return (
    <div className="bg-elevated overflow-x-auto rounded-md border border-line px-4 py-3">
      <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
        {title}
      </p>
      <p className="mt-2 font-mono text-[12px] leading-relaxed text-muted">
        {code}
      </p>
    </div>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">
          Capabilities
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl text-ink sm:text-5xl">
          Three lanes. One way of working.
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {capabilities.map((lane) => (
            <article
              key={lane.id}
              className="flex flex-col rounded-md border border-line bg-elevated p-6 md:p-8"
            >
              <h3 className="font-display text-2xl text-ink">{lane.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {lane.lead}
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {lane.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-[11px] leading-relaxed text-ink/85"
                  >
                    <span className="mr-2 w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <CodeSlice
                  title="Sample"
                  code={lane.sample || "—"}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 paper-stripe" />

        <div className="mx-auto max-w-2xl border-t border-line pt-10">
          <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
            Certifications
          </p>
          <p className="mt-3 font-mono text-xs text-ink/85">
            {site.certifications.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
