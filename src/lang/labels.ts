import type { SupportedLanguages } from "./me";

type Labels = {
	greeting: string;
	technologyList: string;
	socialList: string;
	workExperience: string;
};

type LabelsByLanguage = {
	[lang in SupportedLanguages]: Labels;
};

const labels: LabelsByLanguage = {
	en: {
		greeting: "Hello.",
		technologyList: "My favorite tools and technologies",
		socialList: "Find me on",
		workExperience: "Work Experience",
	},
	hi: {
		greeting: "नमस्ते.",
		technologyList: "मुझे पसंद हैं",
		socialList: "मुझे यहाँ ढूंढें",
		workExperience: "कार्य अनुभव",
	},
};

export function getLabels(lang: SupportedLanguages): Labels {
	return labels[lang];
}
