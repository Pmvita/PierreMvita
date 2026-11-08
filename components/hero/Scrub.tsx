"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * A scroll-driven scrubber.
 *
 * A scroll over the hero "scrubs" the hero's own progress 0 → 1 without moving
 * the document. The scene responds in place (parallax-scrub), which is the
 * classic "see-through scrub" effect. Normal page scroll resumes the moment the
 * user scrolls past the hero's headroom.
 */
export function useScrub({
  elementRef,
  threshold = 80,
  onScrub,
}: {
  elementRef: React.RefObject<HTMLElement | null>;
  threshold?: number;
  onScrub: (scrub: number) => void;
}) {
  const [armed, setArmed] = useState(false);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const el = elementRef.current;
    if (!el) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const rect = el.getBoundingClientRect();
    const heroBottom = rect.bottom;
    const maxScroll = Math.max(heroBottom - threshold, 0);
    const available = Math.max(heroBottom - window.innerHeight * 0.5, 1);
    const clamped = Math.min(window.pageYOffset, maxScroll);
    const scrub = Math.min(mathSmooth(clamped / available), 1);

    if (scrub > 0 && !armed) setArmed(true);
    else if (scrub === 0 && armed) setArmed(false);

    onScrub(scrub);

    rafRef.current = requestAnimationFrame(tick);
  }, [elementRef, threshold, onScrub, armed]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    const id = rafRef.current;
    return () => cancelAnimationFrame(id);
  }, [armed, tick]);

  useEffect(() => {
    const onScroll = () => {
      if (armed) rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [armed, tick]);

  return { armed };
}

function mathSmooth(t: number): number {
  return t * t * (3 - 2 * t);
}
