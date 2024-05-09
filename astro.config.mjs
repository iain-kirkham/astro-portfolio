import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: "https://iainkirkham.dev",
  integrations: [tailwind(), expressiveCode(), mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeHeadingIds,
      rehypeSlug,
      [rehypeAutolinkHeadings, { properties: { class: ["anchor"] } }],
    ],
  },
});
