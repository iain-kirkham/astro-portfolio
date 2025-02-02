import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const posts = await getCollection("posts");
	return rss({
		title: "Iain Kirkham | Blog",
		description: "My developer Journey",
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.slug}/`,
		})),
		customData: "<language>en-gb</language>",
	});
}
