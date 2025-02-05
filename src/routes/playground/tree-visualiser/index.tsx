import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { createNetworkGraph, type GraphData } from "~/utils/networkGraph";

export default component$(() => {
  const query = useSignal("");
  const knowledgeGraph = useSignal<GraphData>({
    name: "Masai",
    children: [
      {
        name: "Website",
        children: [
          {
            name: "Courses",
            value: 3938,
            children: [
              { name: "FullStack" },
              { name: "DataScience", value: 5842 },
              { name: "Android", value: 5914 },
              { name: "WebDev", value: 3416 },
            ],
          },
          {
            name: "Alumni",
            children: [{ name: "Success Stories", value: 3534 }],
          },
        ],
      },
      {
        name: "LMS",
        children: [
          {
            name: "Assignments",
            children: [
              {
                name: "Assessment",
              },
            ],
          },
          { name: "Projects" },
          { name: "Quizzes" },
        ],
      },
      {
        name: "Assess",
        children: [
          {
            name: "AI Interview",
            children: [
              {
                name: "Assessment",
              },
            ],
          },
          {
            name: "Assessment",
            children: [
              {
                name: "Question",
                children: [
                  {
                    name: "MCQ",
                  },
                  {
                    name: "Coding",
                  },
                  {
                    name: "Descriptive",
                  },
                  {
                    name: "Audio",
                  },
                  {
                    name: "Video",
                  },
                  {
                    name: "Image",
                  },
                  {
                    name: "File",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
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
