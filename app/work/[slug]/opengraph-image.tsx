import { ImageResponse } from "next/og";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";

export const alt = "Pierre Mvita - Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#070705", color: "#f4f0e6" }}>
        <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 24, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4af5a" }}>404</span>
        <span style={{ marginTop: 12, fontFamily: "Instrument Serif, serif", fontSize: 48, fontStyle: "italic", color: "#f4f0e6" }}>Project not found</span>
      </div>,
      { ...size },
    );
  }

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#070705" }}>
      <div style={{ display: "flex", flexShrink: 0 }}>
        <div style={{ width: 80, height: 80, borderRadius: 12, background: "linear-gradient(135deg, #d4af5a, #9a7b2f)", display: "flex", alignItems: "center", justifyContent: "center", color: "#070705", fontFamily: "Instrument Serif, serif", fontSize: 32, fontStyle: "italic" }}>
          {project.title.charAt(0).toUpperCase()}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px" }}>
        <div style={{ display: "flex", flexShrink: 0 }}>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 18, letterSpacing: "0.3em", textTransform: "uppercase", color: "#d4af5a" }}>
            {project.index} · {project.year}
          </span>
        </div>
        <div style={{ marginTop: 24, fontSize: 88, lineHeight: 0.9, fontFamily: "Instrument Serif, serif" }}>
          {project.title}
        </div>
        <div style={{ marginTop: 16, fontSize: 28, color: "#f0d78c", fontStyle: "italic" }}>
          {project.kicker}
        </div>
        <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} style={{ fontSize: 18, fontFamily: "Geist Mono, monospace", color: "#8a8578", letterSpacing: "0.04em" }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
