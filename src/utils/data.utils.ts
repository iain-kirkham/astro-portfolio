export function sortByDateDesc(posts: any) {
  return posts.sort(
    (a: any, b: any) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}
