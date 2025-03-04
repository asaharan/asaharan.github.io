import {
	MatAnimationOutlined,
	MatBubbleChartOutlined,
	MatCalculateOutlined,
	MatCategoryOutlined,
	MatDataObjectOutlined,
	MatDescriptionOutlined,
	MatExposureZeroOutlined,
	MatHandshakeOutlined,
	MatImageOutlined,
	MatLockOutlined,
	MatPasswordOutlined,
	MatScreenshotOutlined,
	MatShortcutOutlined,
	MatTimerOutlined,
	MatWindowOutlined,
} from "@qwikest/icons/material";
import LowercaseSvg from "~/media/lowercase.svg";
import Uppercase from "~/media/uppercase.svg";
import type { JSXNode, SVGProps } from "@builder.io/qwik";

export interface PlaygroundPageItem {
	title: string;
	shortTitle?: string;
	description: string;
	path: string;
	icon?:
		| ((props: SVGProps<SVGSVGElement>) => JSXNode)
		| typeof LowercaseSvg
		| typeof Uppercase;
	position?: number;
	category?: string;
	deprecated?: boolean;
	tags?: string[];
	isExternal?: boolean;
}

const playgroundItems: PlaygroundPageItem[] = [
	{
		title: "Timer",
		description: "Start, pause, and reset a timer",
		path: "/playground/timer",
		icon: MatTimerOutlined,
		position: 1,
		category: "Tools",
	},
	{
		title: "Bit Bubble",
		description: "A fun game with numbers",
		path: "/bit-bubble",
		icon: MatBubbleChartOutlined,
		position: 1,
		category: "Games",
		isExternal: true,
	},
	{
		title: "Quick Algebra",
		description: "Practice algebra",
		path: "https://www.jeeready.com?utm_source=saharan.me",
		position: 1,
		category: "Games",
		isExternal: true,
		icon: MatCalculateOutlined,
	},
	{
		title: "Wake Lock API",
		description: "Device should stay awake",
		path: "/playground/wake-lock",
		icon: MatLockOutlined,
		position: 2,
		category: "Browser API",
	},
	{
		title: "Screenshare with audio",
		description: "Record screen along with audio",
		path: "/playground/screenshare-with-audio",
		icon: MatScreenshotOutlined,
		position: 7,
		category: "Browser API",
	},
	{
		title: "Deepgram Real-time transcription for Video File",
		description: "Real-time transcription for Video File",
		path: "/playground/deepgram-real-time-transcription-of-a-video-file",
		deprecated: true,
	},
	{
		title: "Compare image types",
		description: "Compare size of different types of images",
		path: "/playground/image-size-quality-comparision",
		position: 7,
		icon: MatImageOutlined,
		category: "Experiment",
	},
	{
		title: "Window Management API",
		description: "Window Management API testing",
		path: "/playground/window-management",
		position: 3,
		icon: MatWindowOutlined,
		category: "Browser API",
	},
	{
		title: "JSON to CSV Converter",
		shortTitle: "JSON to CSV",
		description: "Convert JSON to CSV",
		path: "/playground/json-to-csv",
		position: 4,
		icon: MatDataObjectOutlined,
		category: "Tools",
	},
	{
		title: "SVG Animations",
		description: "SVG Animations",
		path: "/playground/animations",
		position: 4,
		icon: MatAnimationOutlined,
		category: "Experiment",
	},
	{
		title: "Sum of Digits",
		description: "Sum of Digits",
		path: "/playground/sum-of-digits",
		position: 8,
		icon: MatExposureZeroOutlined,
		deprecated: true,
		category: "Tools",
	},
	{
		title: "Convert text to UPPERCASE",
		shortTitle: "UPPERCASE",
		description: "Convert text to UPPERCASE",
		path: "/playground/string-tools/convert-text-to-uppercase",
		icon: Uppercase,
		position: 6,
		category: "Tools",
		tags: ["string-tool"],
	},
	{
		title: "Convert text to lowercase",
		shortTitle: "lowercase",
		description: "Convert text to lowercase",
		path: "/playground/string-tools/convert-text-to-lowercase",
		position: 5,
		icon: LowercaseSvg,
		category: "Tools",
		tags: ["string-tool"],
	},
	{
		title: "Count number of chars",
		shortTitle: "Count Chars",
		description: "Count number of characters in a string",
		path: "/playground/string-tools/count-number-of-characters",
		position: 11,
		icon: MatCalculateOutlined,
		category: "Tools",
		tags: ["string-tool"],
	},
	{
		title: "Count unique words",
		shortTitle: "Unique Words",
		description: "Count unique items",
		path: "/playground/string-tools/count-unique-words-in-text",
		position: 4,
		icon: MatCategoryOutlined,
		category: "Tools",
		tags: ["string-tool"],
	},
	{
		title: "Twitter Summary Card",
		description: "Generate Twitter Summary Card",
		path: "/playground/twitter-cards/summary",
		deprecated: true,
		category: "Experiment",
	},
	{
		title: "Twitter Summary Large Card",
		description: "Generate Twitter Summary Large Card",
		path: "/playground/twitter-cards/summary_large_image",
		deprecated: true,
		category: "Experiment",
	},
	{
		title: "Count GPT Tokens",
		shortTitle: "GPT Tokens",
		description: "Count GPT Tokens",
		path: "/playground/string-tools/GPTTokenCount",
		position: 3,
		icon: MatDescriptionOutlined,
		category: "Tools",
		tags: ["string-tool"],
	},
	{
		title: "ChatGPT Experiment",
		description: "ChatGPT Experiment",
		path: "/playground/ChatGPTExperiment",
		deprecated: true,
		category: "Experiment",
	},
	{
		title: "ChatGPT Plugins Search",
		description: "ChatGPT Plugins Search",
		path: "/playground/ChatGPTPluginsSearch",
		deprecated: true,
		category: "Experiment",
	},
	{
		title: "TweetNaCl",
		description: "TweetNaCl",
		path: "/playground/tweetnacl",
		position: 1,
		icon: MatHandshakeOutlined,
		category: "Tools",
	},
	{
		title: "Bcrypt",
		description: "Bcrypt",
		path: "/playground/bcrypt",
		position: 0,
		icon: MatPasswordOutlined,
		category: "Tools",
	},
	{
		title: "Zed Shortcuts",
		description: "Shortcuts that I use in Zed",
		path: "/zed-shortcuts",
		position: -1,
		icon: MatShortcutOutlined,
		category: "Guide",
	},
].sort((a, b) => {
	const aPosition = a.position ?? Number.POSITIVE_INFINITY;
	const bPosition = b.position ?? Number.POSITIVE_INFINITY;
	return aPosition - bPosition;
});

const groups = playgroundItems.reduce(
	(acc, page) => {
		const category = page.deprecated ? "Legacy" : (page.category ?? "Other");
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(page);
		return acc;
	},
	{} as Record<string, PlaygroundPageItem[]>,
);
export const playgroundItemGroups = Object.entries(groups);
export const stringToolNames = playgroundItems
	.filter((item) => item.tags?.includes("string-tool"))
	.map((item) => ({
		name: item.path.replace("/playground/string-tools/", ""),
		title: item.shortTitle ?? item.title,
		description: item.description,
	}));
