import { defineHastPlugin } from "satteri";

/**
 * External-ness is judged against this hostname, not the page being
 * rendered — content is authored once and the built site can be served
 * from more than one host (preview vs. production), so "external" has to
 * mean "leaves this domain", determined the same way for every render.
 */
const isExternalHref = (href, siteHostname) => {
	if (!href || href.startsWith("#")) return false;
	if (/^(mailto|tel):/i.test(href)) return false;

	try {
		const url = new URL(href, `https://${siteHostname}`);
		if (url.protocol !== "http:" && url.protocol !== "https:") return false;
		return url.hostname !== siteHostname;
	} catch {
		return false;
	}
};

const srOnlySuffix = () => ({
	type: "element",
	tagName: "span",
	properties: { className: ["sr-only"] },
	children: [{ type: "text", value: " (opens in a new tab)" }],
});

const markExternal = (node, ctx, classProp) => {
	const existingClass = node.properties?.className;
	const classes = Array.isArray(existingClass)
		? existingClass
		: typeof existingClass === "string"
			? [existingClass]
			: [];

	ctx.setProperty(node, "target", "_blank");
	ctx.setProperty(node, "rel", "noopener noreferrer");
	ctx.setProperty(node, classProp, [...classes, "external"]);
	ctx.appendChild(node, srOnlySuffix());
};

const findJsxHref = (node) => {
	for (const attr of node.attributes ?? []) {
		if (attr.type === "mdxJsxAttribute" && attr.name === "href") {
			return typeof attr.value === "string" ? attr.value : undefined;
		}
	}
	return undefined;
};

/**
 * Marks links that leave the site: opens them in a new tab, and tells both
 * sighted and screen-reader users up front (rel/target alone are silent to
 * both) rather than surprising them when the tab switches.
 *
 * Covers both markdown-syntax links (`element`, hast `<a>`) and raw JSX
 * anchors authored directly in .mdx (`mdxJsxTextElement`/`mdxJsxFlowElement`)
 * — the two arrive as different node types.
 */
export const externalLinksPlugin = ({ siteHostname }) =>
	defineHastPlugin({
		name: "external-links",
		element: {
			filter: ["a"],
			visit(node, ctx) {
				const href = node.properties?.href;
				if (typeof href !== "string" || !isExternalHref(href, siteHostname)) {
					return;
				}
				markExternal(node, ctx, "className");
			},
		},
		mdxJsxTextElement: {
			filter: ["a"],
			visit(node, ctx) {
				const href = findJsxHref(node);
				if (!href || !isExternalHref(href, siteHostname)) return;
				markExternal(node, ctx, "className");
			},
		},
		mdxJsxFlowElement: {
			filter: ["a"],
			visit(node, ctx) {
				const href = findJsxHref(node);
				if (!href || !isExternalHref(href, siteHostname)) return;
				markExternal(node, ctx, "className");
			},
		},
	});
