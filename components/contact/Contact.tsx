import { ArrowUpRight, Download } from "lucide-react"
import { site } from "@/content/site"

export function Contact() {
  const links = [
    { label: site.contact.email, href: `mailto:${site.contact.email}` },
    { label: "linkedin.com/in/pierre-mvita", href: site.contact.linkedin },
    { label: "github.com/Pmvita", href: site.contact.github },
  ]

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl border-t border-line pt-20">
        <p className="font-mono text-[11px] tracking-[0.32em] text-gold uppercase">
          Contact
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl text-ink sm:text-6xl">
          Looking for a junior cloud engineer role where the work gets reviewed.
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:text-gold"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>

          <div>
            <a
              href={site.resumeHref}
              download
              className="gold-chrome inline-flex items-center gap-2 px-6 py-3 font-mono text-[11px] tracking-[0.2em] uppercase"
            >
              <Download className="size-4" />
              {site.resumeLabel}
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Toronto. Cloud first. Full-stack and mobile when the product needs
              it.
            </p>
          </div>
        </div>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <p className="font-display text-xl italic text-ink">{site.name}</p>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
            © 2026 {site.name}
          </p>
        </footer>
      </div>
    </section>
  )
}
