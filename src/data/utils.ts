import type { CollectionEntry } from "astro:content";

export const dateOptions: Intl.DateTimeFormatOptions = {
	weekday: "short",
	year: "numeric",
	month: "long",
	day: "numeric",
};

export const socials = {
	GitHub: "https://github.com/iain-kirkham",
	Bluesky: "https://bsky.app/profile/iainkirkham.dev",
	LinkedIn: "https://www.linkedin.com/in/iain-kirkham/",
	Email: "mailto:iain.kirkham@outlook.com",
};

export const SITE = {
	title: " | iainkirkham.dev",
	description:
		"Software engineer writing about AWS, Spring Boot, Rust, and cloud adventures.",
};

export const links: { href: string; text: string }[] = [
	{ href: "/", text: "Home" },
	{ href: "/about/", text: "About" },
	{ href: "/blog/", text: "Blog" },
	{ href: "/projects/", text: "Projects" },
];

export function sortByDateDesc<T extends { data: { pubDate: Date } }>(
	posts: T[],
) {
	return posts.toSorted(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
	);
}

export function sortProjectsByDate(projects: CollectionEntry<"projects">[]) {
	return projects.toSorted((a, b) => {
		if (a.data.publishDate && b.data.publishDate) {
			return b.data.publishDate.getTime() - a.data.publishDate.getTime();
		}
		if (a.data.publishDate) return -1;
		if (b.data.publishDate) return 1;
		// fallback to title alphabetical
		return (a.data.title ?? "").localeCompare(b.data.title ?? "");
	});
}

/* ------------------------------------------------------------------
   Chips

   One base style, a handful of hue variants. Tags are grouped by what
   they are (language / framework / topic) rather than each getting a
   bespoke colour, which is what let the old palette drift.
   ------------------------------------------------------------------ */

/* Background and border stay neutral for every variant — only the label
   colour carries the hue — so a row of tags reads as quiet metadata, not a
   strip of coloured pills. */
const CHIP_BASE =
	"inline-block font-mono text-xs px-2 py-0.5 rounded-sm border border-border bg-surface-2 transition-colors";

/* Hues are Catppuccin's own (Latte/Mocha), sourced from the --c-* vars in
   global.css, so a chip is always drawn from the same palette as the rest
   of the theme rather than a separate Tailwind color scale. */
const CHIP_VARIANTS = {
	sapphire: "text-[var(--c-sapphire)]",
	mauve: "text-[var(--c-mauve)]",
	green: "text-[var(--c-green)]",
	peach: "text-[var(--c-peach)]",
	neutral: "text-muted",
} as const;

type ChipVariant = keyof typeof CHIP_VARIANTS;

/** Languages and runtimes. */
const LANGUAGE_TAGS = new Set([
	"rust",
	"java",
	"javascript",
	"typescript",
	"python",
	"go",
	"c",
	"c++",
]);

/** Frameworks, libraries and platforms. */
const FRAMEWORK_TAGS = new Set([
	"react",
	"astro",
	"nextjs",
	"next.js",
	"spring",
	"spring boot",
	"tailwind",
	"docker",
	"aws",
	"cloud",
	"terraform",
	"postgresql",
]);

/** Process and practice. */
const TOPIC_TAGS = new Set([
	"tutorial",
	"guide",
	"testing",
	"security",
	"performance",
	"optimization",
	"improvement",
	"deployment",
	"devops",
	"learning in public",
]);

const chip = (variant: ChipVariant): string =>
	`${CHIP_BASE} ${CHIP_VARIANTS[variant]}`;

export const getTagStyles = (tag: string): string => {
	const normalized = tag.toLowerCase().trim();

	if (LANGUAGE_TAGS.has(normalized)) return chip("peach");
	if (FRAMEWORK_TAGS.has(normalized)) return chip("sapphire");
	if (TOPIC_TAGS.has(normalized)) return chip("mauve");

	return chip("neutral");
};

export const getStatusStyles = (status: string): string => {
	switch (status?.toLowerCase()) {
		case "completed":
			return chip("green");
		case "in progress":
			return chip("sapphire");
		case "on hold":
			return chip("peach");
		default:
			return chip("neutral");
	}
};

/* ------------------------------------------------------------------
   Post relationships
   ------------------------------------------------------------------ */

type BlogPost = CollectionEntry<"blog">;

/**
 * Previous (older) and next (newer) post relative to `currentId`, based on
 * the same newest-first ordering the listings use.
 */
export function getAdjacentPosts(posts: BlogPost[], currentId: string) {
	const sorted = sortByDateDesc(posts);
	const index = sorted.findIndex((post) => post.id === currentId);

	if (index === -1) return { prev: undefined, next: undefined };

	return {
		// `sorted` runs newest -> oldest, so the following entry is the older one.
		prev: sorted[index + 1],
		next: sorted[index - 1],
	};
}
