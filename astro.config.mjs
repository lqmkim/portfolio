import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://lqmkim.com",
  integrations: [
    sitemap({
      changefreq: "daily",
      priority: 1,
      lastmod: new Date().toISOString().split("T")[0],
    }),
    tailwind(),
  ],
  output: "server",
  adapter: cloudflare(),
});
