import { type Signal, component$, useStore, useTask$ } from "@builder.io/qwik";
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
		useTask$(({ track }) => {
			const text = track(() => textProp.value);
			const selectedTool = track(() => _selectedTool);
			const lowercaseText = textToLowerCase(text);
			const uppercaseText = textToUpperCase(text);
			const characterCount = countNumberOfCharacters(text);
			const uniqueItems = countUniqueWords(text);
			const totalWords = countNumberOfWords(text);
			const tokens = gptTokens(text);
			let copyableText = "";
			if (selectedTool === "convert-text-to-lowercase") {
				copyableText = lowercaseText;
			} else if (selectedTool === "convert-text-to-uppercase") {
				copyableText = uppercaseText;
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
					isActive: selectedTool === "count-unique-items",
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
				{["convert-text-to-lowercase", "convert-text-to-uppercase"].includes(
					_selectedTool,
				) && (
					<div class="relative">
						<textarea
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
						"grid grid-cols-1 gap-4 sticky bottom-0 z-10 bg-white mt-2",
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
			</>
		);
	},
);
