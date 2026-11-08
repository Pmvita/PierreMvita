import { NextRequest } from "next/server";
import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

type SitemapEntry = {
  url: string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  lastModified?: string | Date;
};

function getEntries(): SitemapEntry[] {
  const base = "https://pierre-mvita.vercel.app";

  const entries: SitemapEntry[] = [
    { url: base, priority: 1.0, changeFrequency: "monthly" },
    { url: `${base}/work`, priority: 0.8, changeFrequency: "monthly" },
    ...site.nav.map(
      (n) =>
        ({
          url: `${base}${n.id === "home" ? "" : "/" + n.id}`,
          priority: 0.7,
          changeFrequency: "monthly",
        }) as const,
    ),
    ...projects.map(
      (p) => ({
        url: `${base}/work/${p.slug}`,
        priority: 0.7,
        changeFrequency: "monthly",
      }) as const,
    ),
  ];

  return entries;
}

// Route handler for the /sitemap.xml endpoint.
export default function sitemapHandler() {
  const entries = getEntries();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries
    .map(
      (e) => `  <url>
    <loc>${e.url}</loc>
    <changefreq>${e.changeFrequency ?? "monthly"}</changefreq>
    <priority>${e.priority?.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

// Metadata route for /sitemap.xml.
export function GET(request: NextRequest) {
  return sitemapHandler();
}
