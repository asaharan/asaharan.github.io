import { component$, useSignal } from "@builder.io/qwik";
import {
	type StaticGenerateHandler,
	useLocation,
	type DocumentHead,
	Link,
} from "@builder.io/qwik-city";
import TextTools from "~/components/textTools";
import { stringToolNames } from "~/data/tools.config";

export default component$(() => {
	const loc = useLocation();
	const selectedToolName = useSignal(loc.params.toolName);
	const input = useSignal("");
	const tool = stringToolNames.find((t) => t.name === selectedToolName.value);

	return (
		<div class="w-full">
			<nav
				class={
					"rounded-lg bg-muted p-1 text-gray-600 bg-gray-100 md:grid w-full md:grid-cols-5 gap-1 max-sm:flex max-sm:flex-nowrap max-sm:justify-start max-sm:overflow-auto h-12"
				}
				aria-label="Tabs"
			>
				{stringToolNames.map((tool) => {
					const isActive = tool.name === selectedToolName.value;
					return (
						<Link
							key={tool.name}
							href={`/playground/string-tools/${tool.name}`}
							data-state={isActive ? "active" : "inactive"}
							class={[
								"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow",
								{
									"max-sm:order-first": isActive,
								},
							]}
							aria-current={isActive ? "page" : undefined}
							onClick$={(e) => {
								e.preventDefault();
								selectedToolName.value = tool.name;
							}}
						>
							<span>{tool.title}</span>
							<span
								aria-hidden="true"
								class={`absolute inset-x-0 bottom-0 h-0.5 ${
									isActive ? "bg-indigo-500" : "bg-transparent"
								}`}
							/>
						</Link>
					);
				})}
			</nav>
			<div class="my-2">
				<textarea
					bind:value={input}
					class="block w-full min-h-[200px] rounded-lg border border-gray-300 p-4 text-gray-900 focus:border-primary-500 focus:ring-primary-500 shadow-sm"
					placeholder="Type or paste your text here..."
				/>
				<div class="my-4">
					{tool ? <TextTools selectedTool={tool?.name} text={input} /> : null}
				</div>
			</div>
		</div>
	);
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
	return {
		params: stringToolNames.map((tool) => ({ toolName: tool.name })),
	};
};

export const head: DocumentHead = ({ params }) => {
	const tool = stringToolNames.find((t) => t.name === params.toolName);
	return {
		title: `${tool?.title} - String Tools`,
		meta: [
			{
				name: "description",
				content: tool?.description,
			},
		],
	};
};
