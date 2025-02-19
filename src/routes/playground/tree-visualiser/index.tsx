import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { getKnowledgeGraph } from "~/utils/graph/create";
import { createNetworkGraph, type GraphData } from "~/utils/networkGraph";

export default component$(() => {
	const query = useSignal("");
	const knowledgeGraph = useSignal<GraphData>(getKnowledgeGraph());
	const graph = useSignal<HTMLElement>();
	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ track }) => {
		const graphElement = track(() => graph.value);
		const queryValue = track(() => query.value);
		if (graphElement) {
			console.log(graphElement);
			console.log(
				createNetworkGraph(graphElement, knowledgeGraph.value, queryValue),
			);
		} else {
			console.log("No graph element");
		}
	});
	return (
		<div>
			<input
				autofocus
				class="block w-full rounded-lg border border-gray-300 p-4 text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
				placeholder="Search for a node here"
				bind:value={query}
			/>
			<div id="graph">
				<svg ref={graph} />
			</div>
		</div>
	);
});
