import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const posts = await getCollection("blog");
	return rss({
		title: "Iain Kirkham | Blog",
		description: "My developer Journey",
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.id}/`,
		})),
		customData: "<language>en-gb</language>",
	});
}
