import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { CopyButton } from "../Copy";

export const CaseChange = component$(
	({ type }: { type: "uppercase" | "lowercase" }) => {
		const input = useSignal("");
		const output = useComputed$(() => {
			if (type === "uppercase") {
				return input.value.toUpperCase();
			}
			return input.value.toLowerCase();
		});
		return (
			<div class="max-w-4xl mx-auto p-6 space-y-6">
				<h3 class="text-2xl font-bold text-gray-800 mb-6 capitalize">
					Convert string to {type}
				</h3>
				<div class="space-y-4">
					<div class="flex flex-col gap-2">
						<label
							for="inputTextarea"
							class="text-lg font-medium text-gray-700"
						>
							Paste your text below
						</label>
						<textarea
							bind:value={input}
							id="inputTextarea"
							class="border-2 border-gray-300 rounded-lg p-3 w-full min-h-[200px] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-y font-mono"
							placeholder={`Type or paste text to convert to ${type}...`}
						/>
					</div>

					<div class="relative py-4">
						<div class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-gray-200" />
						</div>
						<div class="relative flex justify-center">
							<span class="bg-white px-4 text-sm text-gray-500">Output</span>
						</div>
					</div>

					<div class="flex flex-col gap-2">
						<label class="text-lg font-medium text-gray-700" for="output">
							Converted text
						</label>
						<textarea
							class="border-2 border-gray-300 rounded-lg p-3 w-full min-h-[200px] bg-gray-50 font-mono"
							value={output.value}
							readOnly
							id="output"
						/>
					</div>
					<CopyButton content={output.value} variant="primary" size="md" />
				</div>
			</div>
		);
	},
);
