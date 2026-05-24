import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { data } from "~/data";

export async function GET(context: APIContext) {
	const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
	);

	const site = context.site || new URL(data.site.url);

	return rss({
		title: `${data.site.name} · Blog`,
		description: data.site.description,
		site: site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.id}`,
		})),
		customData: `<language>en-us</language>`,
	});
}
