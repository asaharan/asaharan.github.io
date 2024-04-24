import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

/**
 * @description Convert text to lowercase.
 */
export default component$(() => {
  const input = useSignal("");
  const justCopied = useSignal(false);
  const output = useComputed$(() => {
    return input.value.toLowerCase();
  });
  return (
    <div class="mainBody">
      <h3>Convert string to lowercase</h3>
      <div class="title">Paste your text below</div>
      <textarea
        bind:value={input}
        id="inputTextarea"
        class="border-2 border-gray-300 rounded-md p-2 w-full min-h-[200px]"
      ></textarea>
      <div class="divider"></div>
      <div class="title">Output</div>
      <textarea
        class="border-2 border-gray-300 rounded-md p-2 w-full min-h-[200px]"
        value={output.value}
      ></textarea>
      <button
        class="border bg-blue-500 text-white rounded-md p-2 mt-2"
        onClick$={() => {
          navigator.clipboard.writeText(output.value);
          justCopied.value = true;
          setTimeout(() => {
            justCopied.value = false;
          }, 2000);
        }}
      >
        {justCopied.value ? "Copied!" : "Copy to clipboard"}
      </button>
    </div>
  );
});

export const getMeta = (): DocumentHead => ({
  title: "Convert text to lowercase",
  meta: [
    {
      name: "description",
      content: "Convert text to lowercase",
    },
  ],
});
