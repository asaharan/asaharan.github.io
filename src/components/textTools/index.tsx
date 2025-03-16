import {
	type Signal,
	component$,
	useStore,
	useTask$,
	useSignal,
} from "@builder.io/qwik";
import {
	countNumberOfCharacters,
	countNumberOfWords,
	textToLowerCase,
	textToUpperCase,
	countUniqueWords,
	gptTokens,
} from "~/utils/string";
import { CopyButton } from "../Copy";
import GPTTokenVisualizer from "./GPTTokenVisualizer";
import { toolDescriptionByTool } from "~/data/stringTools";

function getPlaceholderText(tool: string) {
	if (tool === "convert-text-to-uppercase") {
		return "UPPERCASE text will be shown here";
	}
	if (tool === "convert-text-to-lowercase") {
		return "lowercase text will be shown here";
	}
	if (tool === "count-unique-words-in-text") {
		return "All the unique words in the text will be shown here";
	}
}

export default component$(
	({
		text: textProp,
		selectedTool: _selectedTool,
	}: { text: Signal<string>; selectedTool: string }) => {
		const store = useStore<{
			lowercaseText: string;
			uppercaseText: string;
			characterCount: number;
			uniqueItems: string[];
			totalWords: number;
			tokens: number[];
			hasActiveCount: boolean;
			counts: { label: string; value: number; isActive: boolean }[];
			copyableText: string;
		}>({
			lowercaseText: "",
			uppercaseText: "",
			characterCount: 0,
			uniqueItems: [],
			totalWords: 0,
			tokens: [],
			hasActiveCount: false,
			counts: [],
			copyableText: "",
		});
		const caseSensitive = useSignal(false);
		const description = toolDescriptionByTool[_selectedTool] || "";
		useTask$(({ track }) => {
			const text = track(() => textProp.value);
			const caseInsensitive = track(() => !caseSensitive.value);
			const selectedTool = track(() => _selectedTool);
			const lowercaseText = textToLowerCase(text);
			const uppercaseText = textToUpperCase(text);
			const characterCount = countNumberOfCharacters(text);
			const uniqueItems = countUniqueWords(text, caseInsensitive);
			const totalWords = countNumberOfWords(text);
			const tokens = gptTokens(text);
			let copyableText = "";
			if (selectedTool === "convert-text-to-lowercase") {
				copyableText = lowercaseText;
			} else if (selectedTool === "convert-text-to-uppercase") {
				copyableText = uppercaseText;
			} else if (selectedTool === "count-unique-words-in-text") {
				copyableText = uniqueItems.join(", ");
			}
			store.lowercaseText = lowercaseText;
			store.uppercaseText = uppercaseText;
			store.characterCount = characterCount;
			store.uniqueItems = uniqueItems;
			store.totalWords = totalWords;
			store.tokens = tokens;
			store.copyableText = copyableText;
			const counts = [
				{
					label: "Characters",
					value: characterCount,
					isActive: selectedTool === "count-number-of-characters",
				},
				{
					label: "Words",
					value: totalWords,
					isActive: selectedTool === "count-number-of-words",
				},
				{
					label: "Unique Words",
					value: uniqueItems.length,
					isActive: selectedTool === "count-unique-words-in-text",
				},
				{
					label: "GPT Tokens",
					value: tokens.length,
					isActive: selectedTool === "GPTTokenCount",
				},
			];
			const hasActive = counts.find((item) => item.isActive);
			store.hasActiveCount = !!hasActive;
			store.counts = counts;
		});
		return (
			<>
				{["count-unique-words-in-text"].includes(_selectedTool) ? (
					<div class="flex flex-row justify-start items-center my-2">
						<input
							id="caseSensitiveCheckbox"
							type="checkbox"
							bind:checked={caseSensitive}
						/>
						<label for="caseSensitiveCheckbox" class="ml-2">
							Case Sensitive
						</label>
					</div>
				) : null}
				{[
					"convert-text-to-lowercase",
					"convert-text-to-uppercase",
					"count-unique-words-in-text",
				].includes(_selectedTool) && (
					<div class="relative">
						<textarea
							placeholder={getPlaceholderText(_selectedTool)}
							class="border-2 border-gray-300 rounded-lg p-3 w-full min-h-[200px] bg-gray-50 font-mono"
							value={store.copyableText}
						/>
						<CopyButton
							content={store.copyableText}
							variant="primary"
							size="md"
							class="absolute top-2 right-2"
						/>
					</div>
				)}
				{_selectedTool === "GPTTokenCount" ? (
					<GPTTokenVisualizer tokens={store.tokens} />
				) : null}
				<div
					class={[
						"grid grid-cols-1 gap-4 md:sticky bottom-0 z-10 bg-white mt-2 mb-4",
						{
							"md:grid-cols-3": store.hasActiveCount,
							"md:grid-cols-4": !store.hasActiveCount,
						},
					]}
				>
					{store.counts.map((item) => {
						return (
							<div
								key={item.label}
								class={[
									"rounded-lg p-4 space-y-2",
									{
										"md:col-span-3 order-first bg-blue-50": item.isActive,
										"bg-gray-50": !item.isActive,
									},
								]}
							>
								<div class="flex justify-between items-center">
									<span class={"text-sm font-medium text-black"}>
										{item.label}
									</span>
									<CopyButton
										content={item.value.toString()}
										size="sm"
										variant="secondary"
									/>
								</div>
								<div class={"text-3xl font-bold"}>
									{item.value.toLocaleString()}
								</div>
							</div>
						);
					})}
				</div>
				{description ? (
					<div class="my-2 bg-gray-100 p-2 rounded-lg">
						<h3 class="text-xl font-bold">What is it?</h3>
						<div class="whitespace-pre-line text-gray-800">{description}</div>
					</div>
				) : null}
			</>
		);
	},
);
