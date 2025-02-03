import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PlaygroundItemGroups } from "~/components/ToolCard";

export default component$(() => {
	return (
		<div class="mb-4">
			<h1 class="text-3xl font-bold">Playground</h1>
			<p class="text-lg mb-4">
				Explore various demos and experiments. Discover useful tools for
				developers.
			</p>
			<PlaygroundItemGroups />
		</div>
	);
});

export const head: DocumentHead = {
	title: "Playground - Demos and Experiments",
	meta: [
		{
			name: "description",
			content:
				"Explore various demos and experiments. Discover useful tools for developers.",
		},
	],
};
