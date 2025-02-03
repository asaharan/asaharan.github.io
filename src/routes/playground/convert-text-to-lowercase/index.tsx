import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { CaseChange } from "~/components/textTools/caseChange";

export default component$(() => {
	return <CaseChange type="lowercase" />;
});

export const head: DocumentHead = {
	title: "Convert Text to lowercase - Free Online Text Case Converter",
	meta: [
		{
			name: "description",
			content:
				"Free online tool to convert text to lowercase. Easy to use, instant conversion, copy with one click. Perfect for formatting text, coding, and more.",
		},
		{
			name: "keywords",
			content:
				"text converter, lowercase converter, text transformation, online tool, text formatter",
		},
	],
};
