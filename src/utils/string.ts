import { encode } from "gpt-tokenizer";
/**
 * Converts a string to HTML with my custom syntax
 * [text](link) => <a href="link">text</a>
 */
export function customMarkdownToHTML(input: string): string {
	const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
	const replacement = '<a class="link" href="$2">$1</a>';
	return input.replace(regex, replacement);
}

export function customMarkdownToText(input: string): string {
	const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
	const replacement = "$1";
	return input.replace(regex, replacement);
}

export const textToLowerCase = (text: string) => text.toLowerCase();
export const textToUpperCase = (text: string) => text.toUpperCase();
export const countNumberOfCharacters = (text: string) => text.length;
export const countNumberOfWords = (text: string) =>
	text.split(/\s+/).filter((i) => i).length;
export const countNumberOfLines = (text: string) => text.split(/\n/).length;
export const countUniqueWords = (text: string, caseInsensitive: boolean) => {
	const t = caseInsensitive ? text.toLowerCase() : text;
	const words = t.split(/[\s,.;:?]+/);
	const unique = new Set(words);
	return Array.from(unique).filter((i) => i);
};
export const gptTokens = (text: string) => {
	const tokens = encode(text);
	return tokens;
};
