import type { DocumentHead } from "@builder.io/qwik-city";
import zedShortcuts, { head as h } from "~/routes/zed-shortcuts";

export const head: DocumentHead = {
	title: h.title,
	meta: [
		...h.meta,
		{
			name: "canonical",
			content: "https://saharan.me/zed-shortcuts",
		},
	],
};
export default zedShortcuts;
