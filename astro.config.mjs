import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import { FontaineTransform } from "fontaine";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeMermaid from "rehype-mermaid";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			FontaineTransform.vite({
				fallbacks: ["Arial"],
				resolvePath: (id) => new URL(`./public${id}`, import.meta.url), // id is the font src value in the CSS
			}),
		],
		resolve: {
			alias: {
				"@components/*": "src/components/*",
				"@layouts/*": "src/layouts/*",
				"@styles/*": "src/styles/*",
			},
		},
	},
	site: "https://test.iainkirkham.dev",
	base: "/",
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		expressiveCode(),
		mdx(),
		playformInline(),
		playformCompress(),
		react(),
	],
	markdown: {
		syntaxHighlight: {
			type: "shiki",
			excludeLangs: ["mermaid"],
		},
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: [
			rehypeHeadingIds,
			[rehypeMermaid, { strategy: "img-svg", dark: true }],
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						class: ["anchor"],
					},
				},
			],
		],
	},
});
