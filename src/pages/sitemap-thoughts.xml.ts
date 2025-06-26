import type { APIRoute } from "astro";
import { fetchThoughts } from "@utils/sanity";

export const GET: APIRoute = async () => {
  const thoughts = await fetchThoughts();

  // Generate the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${new URL("/thoughts", import.meta.env.SITE).href}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>

      ${thoughts
        .map(
          (thought: any) => `
        <url>
          <loc>${
            new URL("/thoughts/" + thought.slug, import.meta.env.SITE).href
          }</loc>
          <lastmod>${new Date(thought.pubDate).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
