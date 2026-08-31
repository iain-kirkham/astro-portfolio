import { defineHastPlugin } from "satteri";

const slugify = (text) =>
	text
		.trim()
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s-]/gu, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");

/**
 * Slug uniqueness has to reset for each document. A plugin instance is created
 * once at config time and reused for every render, so a slugger closed over by
 * the instance leaks counters between posts (and, in dev, between reloads of
 * the same post) producing ids like `introduction-1`, `introduction-2`.
 *
 * `ctx.data.astro` is a fresh object per render, so key the registry off it.
 */
const registries = new WeakMap();

const registryFor = (ctx) => {
	const doc = ctx.data?.astro ?? ctx.data;
	let used = registries.get(doc);
	if (!used) {
		used = new Set();
		registries.set(doc, used);
	}
	return used;
};

/** Assigns stable heading ids and prepends the hover `#` anchor link. */
export const headingIdsPlugin = defineHastPlugin({
	name: "heading-ids-and-anchors",
	element: {
		filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
		visit(node, ctx) {
			const used = registryFor(ctx);
			let id = node.properties?.id;

			if (typeof id !== "string" || id.length === 0) {
				const base = slugify(ctx.textContent(node)) || "section";
				id = base;
				for (let n = 1; used.has(id); n++) {
					id = `${base}-${n}`;
				}
				ctx.setProperty(node, "id", id);
			}

			used.add(id);

			ctx.prependChild(node, {
				type: "element",
				tagName: "a",
				properties: { href: `#${id}`, className: ["anchor"] },
				children: [],
			});
		},
	},
});
