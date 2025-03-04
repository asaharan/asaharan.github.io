import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link } from "@builder.io/qwik-city";
import Card from "~/components/Card";

interface BlogList {
	title: string;
	date: string;
	description: string;
	slug: string;
}

const blogList: BlogList[] = [
	{
		title: "Why Zed is my primary code editor.",
		date: "2025-03-04",
		description: "Why I prefer Zed over other text editors.",
		slug: "why-zed-is-my-primary-code-editor",
	},
	{
		title: "A Qwik experiment",
		date: "2023-05-13",
		description: "A blog post about my experience with Qwik framework.",
		slug: "a-qwik-experiment",
	},
];

export default component$(() => {
	return (
		<div>
			<h1 class="font-bold text-3xl mb-4">Blog</h1>
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
				{blogList.map((blog) => (
					<Card key={blog.slug}>
						<Link
							href={blog.slug}
							class="text-lg font-semibold hover:text-blue-500 hover:underline"
						>
							{blog.title}
						</Link>
						<div>{blog.date}</div>
					</Card>
				))}
			</div>
		</div>
	);
});

export const head: DocumentHead = {
	title: "Amit Saharan's Blog",
	meta: [
		{
			name: "description",
			content: "A collection of my blog posts on various topics.",
		},
	],
};
