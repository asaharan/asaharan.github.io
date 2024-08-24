import type { DocumentHead } from "@builder.io/qwik-city";
import { ToolCard } from "~/components/ToolCard";

const pages = [
  {
    title: "Window Management API",
    description: "Window Management API testing",
    path: "/playground/window-management",
    position: 0,
  },
  {
    title: "JSON to CSV Converter",
    description: "Convert JSON to CSV",
    path: "/playground/json-to-csv",
    position: 4,
  },
  {
    title: "SVG Animations",
    description: "SVG Animations",
    path: "/playground/animations",
    position: 4,
  },
  {
    title: "Sum of Digits",
    description: "Sum of Digits",
    path: "/playground/sum-of-digits",
    position: 8,
  },
  {
    title: "Convert text to UPPERCASE",
    description: "Convert text to UPPERCASE",
    path: "/playground/convert-text-to-uppercase",
    position: 6,
  },
  {
    title: "Convert text to lowercase",
    description: "Convert text to lowercase",
    path: "/playground/convert-text-to-lowercase",
    position: 5,
  },

  {
    title: "Count number of chars",
    description: "Count number of characters in a string",
    path: "/playground/count-number-of-characters",
    position: 4,
  },
  {
    title: "Twitter Summary Card",
    description: "Generate Twitter Summary Card",
    path: "/playground/twitter-cards/summary",
  },
  {
    title: "Twitter Summary Large Card",
    description: "Generate Twitter Summary Large Card",
    path: "/playground/twitter-cards/summary_large_image",
  },
  {
    title: "Count GPT Tokens",
    description: "Count GPT Tokens",
    path: "/playground/GPTTokenCount",
    position: 3,
  },
  {
    title: "ChatGPT Experiment",
    description: "ChatGPT Experiment",
    path: "/playground/ChatGPTExperiment",
  },
  {
    title: "ChatGPT Plugins Search",
    description: "ChatGPT Plugins Search",
    path: "/playground/ChatGPTPluginsSearch",
  },
  {
    title: "TweetNaCl",
    description: "TweetNaCl",
    path: "/playground/tweetnacl",
    position: 2,
  },
  {
    title: "Bcrypt",
    description: "Bcrypt",
    path: "/playground/bcrypt",
    position: 1,
  },
].sort((a, b) => {
  const aPosition = a.position ?? Infinity;
  const bPosition = b.position ?? Infinity;
  return aPosition - bPosition;
});

export default function Playground() {
  return (
    <div>
      <h1 class="text-3xl font-bold mb-3">Playground</h1>
      <div class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pages.map((page) => (
          <ToolCard
            key={page.path}
            path={page.path}
            title={page.title}
            description={page.description}
          />
        ))}
      </div>
    </div>
  );
}

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
