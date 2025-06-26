import type { APIRoute } from "astro";
import { fetchShips } from "@utils/sanity";

export const GET: APIRoute = async () => {
  const ships = await fetchShips();

  // Generate the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${new URL("/ships", import.meta.env.SITE).href}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>

      ${ships
        .map(
          (ship: any) => `
        <url>
          <loc>${
            new URL("/ships/" + ship.slug, import.meta.env.SITE).href
          }</loc>
          <lastmod>${new Date(ship.pubDate).toISOString()}</lastmod>
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
