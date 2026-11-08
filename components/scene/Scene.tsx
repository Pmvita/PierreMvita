"use client";

import { useScrubContext } from "@/components/layout/ScrubProvider";
import { WebGLBackdrop } from "./WebGLBackdrop";

export function Scene() {
  const { scrub } = useScrubContext();
  return <WebGLBackdrop scrub={scrub} />;
}
