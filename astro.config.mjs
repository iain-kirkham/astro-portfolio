import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import {defineConfig} from "astro/config";
import {FontaineTransform} from "fontaine";
import tailwindcss from "@tailwindcss/vite";
import {satteri, satteriHeadingIdsPlugin} from "@astrojs/markdown-satteri";
import react from "@astrojs/react";
import mermaid from "astro-mermaid";

import {satteriReadingTime} from "./src/plugins/satteri-reading-time.mjs";
import {anchorHeadingsPlugin} from "./src/plugins/satteri-anchor-headings.mjs";


import cloudflare from "@astrojs/cloudflare";


const satteriConfig = satteri({
    hastPlugins: [
        satteriHeadingIdsPlugin(),
        anchorHeadingsPlugin,
    ],
    mdastPlugins: [
        satteriReadingTime,
    ],
});

export default defineConfig({
    vite: {
        plugins: [
            tailwindcss(),
            FontaineTransform.vite({
                fallbacks: ["Arial"],
                resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
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
        mermaid(),
        expressiveCode({
            themes: ["catppuccin-macchiato"],
            ignoredLanguages: ["mermaid"]
        }),

        mdx(),
        react(),
    ],

    markdown: {
        processor: satteriConfig,
    },
    adapter: cloudflare(),
    output: "server"
});