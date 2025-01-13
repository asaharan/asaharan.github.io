import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

/**
 * @description counts number of characters in a string.
 */
export default component$(() => {
	const input = useSignal("");
	const output = useComputed$(() => {
		const text = input.value;
		if (!text) return new Set();
		const regex = /\s+/;
		const items = text.split(regex).filter((item) => item.trim());
		const uniqueItems = new Set(items);
		return uniqueItems;
	});
	return (
		<div class="mainBody">
			<h3 class="text-xl font-semibold">Count number of unique item</h3>
			<div class="title">
				Paste your text below. Items should be split by a new line, tab or
				space.
			</div>
			<textarea
				bind:value={input}
				id="inputTextarea"
				class="border-2 border-gray-300 rounded-md p-2 w-full min-h-[200px]"
			/>
			<div class="divider" />
			<div class="title">Output</div>
			<div class="border-2 border-gray-300 rounded-md p-2 w-full min-h-[200px]">
				{output.value.size} unique items
			</div>
			<div>You can copy the unique items below:</div>
			<textarea
				class="border-2 border-gray-300 rounded-md p-2 w-full min-h-[200px]"
				readOnly
				value={Array.from(output.value).join("\n")}
			/>
		</div>
	);
});

export const getMeta = (): DocumentHead => ({
	title: "Count number of characters in a string",
	meta: [
		{
			name: "description",
			content: "Count number of characters in a string",
		},
	],
});
