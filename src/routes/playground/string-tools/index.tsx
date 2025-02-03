import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PlaygroundItemGroups } from "~/components/ToolCard";

export default component$(() => {
	return (
		<section class="mb-4">
			<h1 class="text-3xl font-bold">String tools</h1>
			<h2 class="text-lg">Explore various string manipulation tools.</h2>
			<PlaygroundItemGroups
				tags={["string-tool"]}
				titleRemapping={{ Tools: " " }}
			/>
		</section>
	);
});

export const head: DocumentHead = {
	title: "Tools for string manipulations",
	meta: [
		{
			name: "description",
			content:
				"Convert text to uppercase, lowercase. Count characters, words, GPT tokens, unique words, convert JSON to CSV",
		},
	],
};
