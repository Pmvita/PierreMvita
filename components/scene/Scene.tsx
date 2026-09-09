"use client"

import dynamic from "next/dynamic"

const WebGLBackdrop = dynamic(
  () =>
    import("@/components/scene/WebGLBackdrop").then((mod) => mod.WebGLBackdrop),
  { ssr: false },
)

export function Scene() {
  return <WebGLBackdrop />
}
