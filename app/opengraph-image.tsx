import { ImageResponse } from "next/og"

export const alt = "Pierre Mvita — Cloud Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070705",
          color: "#f4f0e6",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#d4af5a",
          }}
        >
          Toronto · Cloud / Full-stack / Mobile
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, lineHeight: 0.9 }}>Pierre Mvita</div>
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              color: "#f0d78c",
              fontStyle: "italic",
            }}
          >
            Cloud Engineer who ships full-stack and mobile
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
