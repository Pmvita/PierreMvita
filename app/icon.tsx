import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070705",
          color: "#d4af5a",
          fontSize: 14,
          letterSpacing: "-0.04em",
        }}
      >
        PM
      </div>
    ),
    { ...size },
  )
}
