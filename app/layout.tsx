import type { Metadata } from "next"
import { Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Pierre Mvita — Cloud Engineer",
    template: "%s — Pierre Mvita",
  },
  description:
    "Pierre Mvita is a Cloud Engineer in Toronto who ships full-stack and mobile. AWS serverless pipelines, infrastructure as code, and TypeScript products.",
  keywords: [
    "Cloud Engineer",
    "AWS",
    "Terraform",
    "AWS SAM",
    "TypeScript",
    "Next.js",
    "React Native",
    "Pierre Mvita",
    "Toronto",
  ],
  authors: [{ name: "Pierre Mvita" }],
  metadataBase: new URL("https://pierre-mvita.vercel.app"),
  openGraph: {
    title: "Pierre Mvita — Cloud Engineer",
    description:
      "Cloud Engineer who ships full-stack and mobile. Serverless pipelines, IaC, and TypeScript products.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pierre Mvita — Cloud Engineer",
    description:
      "Cloud Engineer who ships full-stack and mobile. Serverless pipelines, IaC, and TypeScript products.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} scroll-smooth`}
    >
      <body className="bg-canvas text-ink antialiased">
        <a href="#work" className="skip-link">
          Skip to work
        </a>
        {children}
      </body>
    </html>
  )
}
