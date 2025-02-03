import { $, component$, useComputed$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CopyButton } from "~/components/Copy";

/**
 * @description counts number of characters in a string.
 */
export default component$(() => {
	const input = useSignal("");
	const output = useComputed$(() => {
		const text = input.value;
		if (!text) return { unique: new Set(), total: 0 };
		const regex = /[\s,;]+/;
		const items = text.split(regex).filter((item) => item.trim());
		const uniqueItems = new Set(items);
		return { unique: uniqueItems, total: items.length };
	});
	const { unique, total: totalCount } = output.value;
	const copyToClipboard = $(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	});

	return (
		<div class="max-w-4xl mx-auto p-6 space-y-6">
			<h1 class="text-3xl font-bold text-gray-800 mb-2">Count Unique Items</h1>
			<p class="text-gray-600 mb-4">
				Paste your text below. Items should be split by a new line, tab, comma,
				semi-colon or space.
			</p>

			<div class="space-y-4">
				<textarea
					bind:value={input}
					id="inputTextarea"
					placeholder="Enter your text here..."
					class="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
				/>

				<div class="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
					<div class="flex justify-between items-center mb-4">
						<div class="space-y-1">
							<h2 class="text-xl font-semibold text-gray-800">Results</h2>
							<p class="text-sm text-gray-600">
								Found {unique.size} unique items out of {totalCount} total items
							</p>
						</div>
					</div>

					<div class="relative">
						<textarea
							class="w-full min-h-[200px] p-4 bg-gray-50 border border-gray-300 rounded-lg"
							readOnly
							value={Array.from(unique).join("\n")}
						/>
						<CopyButton content={Array.from(unique).join("\n")} />
						<button
							type="button"
							onClick$={() => copyToClipboard(Array.from(unique).join("\n"))}
							class="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Copy
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

export const getMeta = (): DocumentHead => ({
	title: "Count Unique Items - Text Analyzer Tool",
	meta: [
		{
			name: "description",
			content:
				"A simple tool to count unique items in your text, split by various delimiters like newlines, tabs, commas, and spaces.",
		},
	],
});
