import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
	MatAnimationOutlined,
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
	MatWindowOutlined,
} from "@qwikest/icons/material";
import { ToolCard } from "~/components/ToolCard";
import LowercaseSvg from "~/media/lowercase.svg";
import Uppercase from "~/media/uppercase.svg";

const pages = [
	{
		title: "Wake Lock API",
		description: "Device should stay awake",
		path: "/playground/wake-lock",
		icon: <MatLockOutlined />,
		position: 2,
		category: "API",
	},
	{
		title: "Screenshare with audio",
		description: "Record screen along with audio",
		path: "/playground/screenshare-with-audio",
		icon: <MatScreenshotOutlined />,
		position: 7,
		category: "API",
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
		icon: <MatImageOutlined />,
		category: "Experiment",
	},
	{
		title: "Window Management API",
		description: "Window Management API testing",
		path: "/playground/window-management",
		position: 3,
		icon: <MatWindowOutlined />,
		category: "API",
	},
	{
		title: "JSON to CSV Converter",
		description: "Convert JSON to CSV",
		path: "/playground/json-to-csv",
		position: 4,
		icon: <MatDataObjectOutlined />,
		category: "Tools",
	},
	{
		title: "SVG Animations",
		description: "SVG Animations",
		path: "/playground/animations",
		position: 4,
		icon: <MatAnimationOutlined />,
		category: "Experiment",
	},
	{
		title: "Sum of Digits",
		description: "Sum of Digits",
		path: "/playground/sum-of-digits",
		position: 8,
		icon: <MatExposureZeroOutlined />,
		deprecated: true,
		category: "Tools",
	},
	{
		title: "Convert text to UPPERCASE",
		description: "Convert text to UPPERCASE",
		path: "/playground/convert-text-to-uppercase",
		icon: <Uppercase />,
		position: 6,
		category: "Tools",
	},
	{
		title: "Convert text to lowercase",
		description: "Convert text to lowercase",
		path: "/playground/convert-text-to-lowercase",
		position: 5,
		icon: <LowercaseSvg />,
		category: "Tools",
	},
	{
		title: "Count number of chars",
		description: "Count number of characters in a string",
		path: "/playground/count-number-of-characters",
		position: 11,
		icon: <MatCalculateOutlined />,
		category: "Tools",
	},
	{
		title: "Count unique items",
		description: "Count unique items",
		path: "/playground/count-unique-items",
		position: 4,
		icon: <MatCategoryOutlined />,
		category: "Tools",
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
		description: "Count GPT Tokens",
		path: "/playground/GPTTokenCount",
		position: 3,
		icon: <MatDescriptionOutlined />,
		category: "Tools",
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
		icon: <MatHandshakeOutlined />,
		category: "Tools",
	},
	{
		title: "Bcrypt",
		description: "Bcrypt",
		path: "/playground/bcrypt",
		position: 0,
		icon: <MatPasswordOutlined />,
		category: "Tools",
	},
].sort((a, b) => {
	const aPosition = a.position ?? Number.POSITIVE_INFINITY;
	const bPosition = b.position ?? Number.POSITIVE_INFINITY;
	return aPosition - bPosition;
});

const groups = pages.reduce(
	(acc, page) => {
		const category = page.deprecated ? "Legacy" : (page.category ?? "Other");
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(page);
		return acc;
	},
	{} as Record<string, typeof pages>,
);
const groupedPages = Object.entries(groups);

export default component$(() => {
	return (
		<div class="mb-4">
			<h1 class="text-3xl font-bold">Playground</h1>
			<p class="text-lg mb-4">
				Explore various demos and experiments. Discover useful tools for
				developers.
			</p>
			<div class="flex flex-col gap-4">
				{groupedPages.map(([title, pages]) => (
					<div key={title}>
						<h3 class="text-2xl font-bold mb-3">{title}</h3>
						<div class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{pages.map((page) => (
								<ToolCard
									key={page.path}
									path={page.path}
									title={page.title}
									description={page.description}
									icon={page.icon}
									category={page.category}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
});

export const head: DocumentHead = {
	title: "Playground - Demos and Experiments",
	meta: [
		{
			name: "description",
			content:
				"Explore various demos and experiments. Discover useful tools for developers.",
		},
	],
};
