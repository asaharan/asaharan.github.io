import { component$, Slot } from "@builder.io/qwik";
import { Topbar } from "~/components/Topbar";

export default component$(() => {
  return (
    <>
      <Topbar />
      <div class="container pt-16 pb-4 px-2 mx-auto">
        <Slot />
      </div>
    </>
  );
});
