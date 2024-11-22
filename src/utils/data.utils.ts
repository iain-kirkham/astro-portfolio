interface Post {
	data: {
		pubDate: Date;
	};
}

export function sortByDateDesc(posts: Post[]) {
	return posts.sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
	);
}
