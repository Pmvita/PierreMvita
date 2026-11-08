"use client";

import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { useScrub } from "@/components/hero/Scrub";

type ScrubContextValue = {
  scrub: number;
  setScrub: (v: number) => void;
};

const Context = createContext<ScrubContextValue | null>(null);

export function ScrubProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);
  const [scrub, setScrub] = useState(0);

  // The hero's in-place scroll-scrub drives the 3D backdrop (via Scene) and the
  // hero lift (via Hero). Both are siblings under this provider.
  useScrub({
    elementRef: containerRef,
    threshold: 96,
    onScrub: setScrub,
  });

  return <Context.Provider value={{ scrub, setScrub }}>{children}</Context.Provider>;
}

export function useScrubContext(): ScrubContextValue {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useScrubContext must be used inside <ScrubProvider>");
  return ctx;
}
