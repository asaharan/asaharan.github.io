import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

/**
 * @description counts number of characters in a string.
 */
export default component$(() => {
  const input = useSignal("");
  const output = useComputed$(() => {
    return input.value.length;
  });
  return (
    <div class="mainBody">
      <h3>Count number of characters in given text</h3>
      <div class="title">Paste your text below</div>
      <textarea
        bind:value={input}
        id="inputTextarea"
        class="border-2 border-gray-300 rounded-md p-2 w-full min-h-[200px]"
      ></textarea>
      <div class="divider"></div>
      <div class="title">Output</div>
      <div class="border-2 border-gray-300 rounded-md p-2 w-full min-h-[200px]">
        {output.value} characters
      </div>
    </div>
  );
});

export const getMeta = (): DocumentHead => ({
  title: "Count number of characters in a string",
  meta: [
    {
      name: "description",
      content: "Count number of characters in a string",
    },
  ],
});
