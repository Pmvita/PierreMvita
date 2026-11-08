import type { Metadata } from "next";
import {
  Bodoni_Moda,
  DM_Sans,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pierre Mvita",
    template: "%s — Pierre Mvita",
  },
  description:
    "Pierre Mvita — a Cloud Engineer in Toronto. Writes full-stack products with TypeScript and ships cloud infrastructure as code (AWS serverless, Terraform).",
  keywords: [
    "Pierre Mvita",
    "Cloud Engineer",
    "AWS",
    "Terraform",
    "TypeScript",
    "Next.js",
    "React Native",
    "Security",
    "Toronto",
  ],
  authors: [{ name: "Pierre Mvita" }],
  metadataBase: new URL("https://pierre-mvita.vercel.app"),
  openGraph: {
    title: "Pierre Mvita",
    description:
      "A Cloud Engineer in Toronto. TypeScript products + AWS serverless infrastructure.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pierre Mvita",
    description:
      "A Cloud Engineer in Toronto. TypeScript products + AWS serverless infrastructure.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${body.variable} scroll-smooth`}
    >
      <body className="bg-canvas text-ink antialiased selection:bg-accent/30 selection:text-ink">
        <a href="#work" className="skip-link">
          Skip to work
        </a>
        {children}
      </body>
    </html>
  );
}
