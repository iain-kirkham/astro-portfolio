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
	description: "Software engineer writing about AWS, Spring Boot, Rust, and cloud adventures.",
};

export const links: { href: string; text: string }[] = [
	{ href: "/", text: "Home" },
	{ href: "/about/", text: "About" },
	{ href: "/blog/", text: "Blog" },
	{ href: "/projects/", text: "Projects" },
];

interface Post {
	data: {
		pubDate: Date;
	};
}

export function sortByDateDesc(posts: Post[]) {
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

export const getStatusStyles = (status: string): string => {
	switch (status?.toLowerCase()) {
		case "completed":
			return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700";
		case "in progress":
			return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700";
		case "on hold":
			return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600";
	}
};

export const getTagStyles = (tag: string): string => {
	const normalizedTag = tag.toLowerCase();

	const tagStyles: Record<string, string> = {
		// Programming Languages
		rust: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/50 dark:text-orange-200 dark:border-orange-800/30",
		react:
			"bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-800/30",
		java: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-800/30",
		javascript:
			"bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-200 dark:border-yellow-800/30",
		typescript:
			"bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-800/30",
		python:
			"bg-green-100 text-green-800 border-green-200 dark:bg-green-950/50 dark:text-green-200 dark:border-green-800/30",

		// Frameworks & Libraries
		astro:
			"bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 border-orange-200 dark:from-orange-950/50 dark:to-pink-950/50 dark:text-orange-200 dark:border-orange-800/30",
		nextjs:
			"bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950/50 dark:text-gray-200 dark:border-gray-800/30",
		"next.js":
			"bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950/50 dark:text-gray-200 dark:border-gray-800/30",

		// Categories
		tutorial:
			"bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800/30",
		guide:
			"bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800/30",
		improvement:
			"bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-200 dark:border-indigo-800/30",
		performance:
			"bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800/30",
		optimization:
			"bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800/30",
		security:
			"bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800/30",
		deployment:
			"bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:border-violet-800/30",
		testing:
			"bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/50 dark:text-teal-200 dark:border-teal-800/30",
		"learning in public":
			"bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-200 dark:border-purple-800/30",
		cloud:
			"bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-800/30",
	};

	// Return specific style if found, otherwise return default sky blue
	return (
		tagStyles[normalizedTag] ||
		"bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-800/30"
	);
};
