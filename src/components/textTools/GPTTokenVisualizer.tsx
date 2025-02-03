import { component$, useComputed$ } from "@builder.io/qwik";
import { decode } from "gpt-tokenizer";

const colors = [
	"bg-red-200",
	"bg-yellow-200",
	"bg-green-200",
	"bg-blue-200",
	"bg-indigo-200",
	"bg-purple-200",
	"bg-pink-200",
];

export default component$(({ tokens }: { tokens: number[] }) => {
	const words = useComputed$(() => {
		const words: string[] = [];
		for (let i = 0; i < tokens.length; i++) {
			words.push(decode([tokens[i]]));
		}
		return words;
	});
	return (
		<div>
			{words.value.map((word, index) => {
				const key = `word-${index}`;
				return (
					<div
						key={key}
						class={[
							"inline-block bg-gray-200 p-1 m-1",
							colors[index % colors.length],
						]}
					>
						{word}
					</div>
				);
			})}
		</div>
	);
});
