import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://iainkirkham.dev",
  integrations: [tailwind(), expressiveCode(), mdx()]
});