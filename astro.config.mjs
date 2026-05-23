// @ts-check
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { ogImages } from "./src/integrations/og-images";

// https://astro.build/config
export default defineConfig({
	site: "https://arnabxd.me",
	output: "static",
	integrations: [react(), mdx(), sitemap(), ogImages()],
	adapter: cloudflare({
		imageService: "compile",
	}),
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"~": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		server: {
			watch: {
				ignored: ["**/.wrangler/**"],
			},
		},
	},
	build: {
		inlineStylesheets: "auto",
	},
	prefetch: {
		defaultStrategy: "viewport",
		prefetchAll: false,
	},
	markdown: {
		shikiConfig: {
			theme: "poimandres",
			wrap: true,
		},
	},
});
