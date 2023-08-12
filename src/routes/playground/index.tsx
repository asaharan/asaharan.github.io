import { Link } from "@builder.io/qwik-city";

export default function Playground() {
  return (
    <div>
      <h1 class="text-3xl font-bold mb-3">Playground</h1>
      <div class="gap-2 flex flex-wrap">
        <Link class="link" href="/playground/ChatGPTExperiment">
          ChatGPT Experiment
        </Link>
        <Link class="link" href="/playground/ChatGPTPluginsSearch">
          ChatGPT Plugins Search
        </Link>
        <Link class="link" href="/playground/tweetnacl">
          TweetNaCl
        </Link>
        <Link class="link" href="/playground/bcrypt">
          Bcrypt
        </Link>
      </div>
    </div>
  );
}
