import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import {defineConfig} from "astro/config";
import {FontaineTransform} from "fontaine";
import tailwindcss from "@tailwindcss/vite";
import {satteri} from "@astrojs/markdown-satteri";
import react from "@astrojs/react";
import mermaid from "astro-mermaid";

import {satteriReadingTime} from "./src/plugins/satteri-reading-time.mjs";
import {headingIdsPlugin} from "./src/plugins/satteri-heading-ids.mjs";
import {externalLinksPlugin} from "./src/plugins/satteri-external-links.mjs";


import cloudflare from "@astrojs/cloudflare";


const SITE = "https://test.iainkirkham.dev";

const satteriConfig = satteri({
    hastPlugins: [
        headingIdsPlugin,
        externalLinksPlugin({siteHostname: new URL(SITE).hostname}),
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

    site: SITE,
    base: "/",

    integrations: [
        mermaid(),
        // Options live in ec.config.mjs; passing them here would override it.
        expressiveCode(),

        mdx(),
        react(),
    ],

    markdown: {
        processor: satteriConfig,
    },
    adapter: cloudflare(),
    output: "server"
});