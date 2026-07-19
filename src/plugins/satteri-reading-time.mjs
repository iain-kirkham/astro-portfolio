import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function satteriReadingTime() {
    let done = false;
    return {
        name: "reading-time",
        text(node, ctx) {
            if (done) return;

            let root = node;
            let parent = ctx.parent(root);
            while (parent) {
                root = parent;
                parent = ctx.parent(root);
            }

            const clonedTree = structuredClone(root);
            const stats = getReadingTime(toString(clonedTree));

            // Ensure the bag exists rather than assuming Astro created it —
            // required on the MDX path since Astro's Sätteri databag change.
            ctx.data.astro ??= {};
            ctx.data.astro.frontmatter ??= {};

            ctx.data.astro.frontmatter.readingTime = stats.text;
            ctx.data.astro.frontmatter.minutesRead = Math.ceil(stats.minutes);

            done = true;
        },
    };
}