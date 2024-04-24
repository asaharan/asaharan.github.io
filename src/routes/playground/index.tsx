import { ToolCard } from "~/components/ToolCard";

const pages = [
  {
    title: "Sum of Digits",
    description: "Sum of Digits",
    path: "/playground/sum-of-digits",
  },
  {
    title: "Convert text to UPPERCASE",
    description: "Convert text to UPPERCASE",
    path: "/playground/convert-text-to-uppercase",
  },
  {
    title: "Convert text to lowercase",
    description: "Convert text to lowercase",
    path: "/playground/convert-text-to-lowercase",
  },

  {
    title: "Count number of chars",
    description: "Count number of characters in a string",
    path: "/playground/count-number-of-characters",
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
  },
  {
    title: "Bcrypt",
    description: "Bcrypt",
    path: "/playground/bcrypt",
  },
];

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
