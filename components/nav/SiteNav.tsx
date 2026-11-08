"use client";

import { useCallback, useEffect, useState } from "react";
import { site } from "@/content/site";

export function SiteNav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = site.nav.map((item) => item.id);
    const onScroll = () => {
      const position = window.scrollY + 120;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (position >= top && position < bottom) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-canvas/60 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8"
        aria-label="Primary"
      >
        <button
          type="button"
          onClick={() => go("home")}
          className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase"
        >
          {site.monogram}
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={`px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                  active === item.id ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href={site.resumeHref}
          download
          className="hidden font-mono text-[11px] tracking-[0.18em] text-accent uppercase md:inline"
        >
          Resume
        </a>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`block h-px w-5 bg-ink transition-transform ${
              open && "translate-y-1 rotate-45"
            }`}
          />
          <span
            className={`block h-px w-5 bg-ink transition-opacity ${
              open && "opacity-0"
            }`}
          />
          <span
            className={`block h-px w-5 bg-ink transition-transform ${
              open && "-translate-y-1 -rotate-45"
            }`}
          />
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line bg-canvas/95 px-5 py-4 md:hidden">
          <ul className="flex flex-col gap-2">
            {site.nav.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className="w-full py-2 text-left font-mono text-xs tracking-[0.2em] text-ink uppercase"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={site.resumeHref}
                download
                className="block py-2 font-mono text-xs tracking-[0.2em] text-accent uppercase"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
