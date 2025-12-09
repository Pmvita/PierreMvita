import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pierre Mvita - Mobile & Full-Stack Developer Portfolio",
  description: "Professional portfolio of Pierre Mvita, a Mobile & Full-Stack Developer specializing in secure software development, cloud applications, and cybersecurity with 2 years of experience.",
  keywords: ["mobile developer", "full-stack developer", "cybersecurity", "cloud applications", "React Native", "Python", "AWS", "portfolio", "Pierre Mvita"],
  authors: [{ name: "Pierre Mvita" }],
  openGraph: {
    title: "Pierre Mvita - Mobile & Full-Stack Developer Portfolio",
    description: "Professional portfolio of Pierre Mvita, a Mobile & Full-Stack Developer specializing in secure software development, cloud applications, and cybersecurity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth bg-transparent">
      <body className={`${inter.className} bg-transparent text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
