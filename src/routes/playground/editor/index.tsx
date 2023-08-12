import { component$ } from "@builder.io/qwik";

// full screen text area
export default component$(() => {
  return (
    <div>
      <textarea
        class="w-full fixed top-12 bottom-0 left-0 bg-gray-300 p-2"
        autoFocus
        placeholder="Type your code here..."
      />
    </div>
  );
});
