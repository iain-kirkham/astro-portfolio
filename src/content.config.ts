// Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/blog" }),
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		description: z.string(),
		author: z.string(),
		image: z
			.object({
				url: z.string(),
				alt: z.string(),
			})
			.optional(),
		tags: z.array(z.string()),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/projects" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.date().optional(),
		image: z.string().optional(),
		liveUrl: z.string().url().optional(),
		githubUrl: z.string().url().optional(),
		technologies: z.array(z.string()).optional(),
		status: z.enum(["Completed", "In Progress", "On Hold"]).optional(),
	}),
});

// Export a single `collections` object to register your collection(s)
export const collections = { blog, projects };
