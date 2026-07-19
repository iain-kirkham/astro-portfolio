import { defineHastPlugin } from "satteri";

export const anchorHeadingsPlugin = defineHastPlugin({
    name: "anchor-headings",
    element: {
        filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
        visit(node, ctx) {
            const id = node.properties?.id;
            if (!id) return;

            ctx.prependChild(node, {
                type: "element",
                tagName: "a",
                properties: { href: `#${id}`, className: ["anchor"] },
                children: [],
            });
        },
    },
});