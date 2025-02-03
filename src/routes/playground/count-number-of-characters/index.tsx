import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CopyButton } from "~/components/Copy";

/**
 * @description counts number of characters in a string.
 */
export default component$(() => {
	const input = useSignal("");
	const output = useComputed$(() => {
		return input.value.length;
	});
	return (
		<div class="max-w-3xl mx-auto p-6 space-y-6">
			<h1 class="text-3xl font-bold text-gray-900">Character Counter</h1>
			<p class="text-gray-600">
				A simple tool to count the number of characters in your text.
			</p>

			<div class="space-y-2">
				<label
					for="inputTextarea"
					class="block text-sm font-medium text-gray-700"
				>
					Enter or paste your text below
				</label>
				<textarea
					bind:value={input}
					id="inputTextarea"
					class="block w-full min-h-[200px] rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-primary-500 focus:ring-primary-500 shadow-sm"
					placeholder="Type or paste your text here..."
				/>
			</div>

			<div class="bg-gray-50 rounded-lg p-4 space-y-2">
				<div class="flex justify-between items-center">
					<span class="text-sm font-medium text-gray-700">Character count</span>
					<CopyButton
						content={output.value.toString()}
						size="sm"
						variant="secondary"
					/>
				</div>
				<div class="text-3xl font-bold text-gray-900">
					{output.value.toLocaleString()}{" "}
					{output.value === 1 ? "character" : "characters"}
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = {
	title: "Count characters in a string",
	meta: [
		{
			name: "description",
			content: "Count number of characters in a string",
		},
	],
};
