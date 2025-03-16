import { component$, Slot } from "@builder.io/qwik";
import { Topbar } from "~/components/Topbar";
import { LanguageSelector } from "~/components/LanguageSelector";

export default component$(() => {
  return (
    <>
      <Topbar />
      <div class="container pt-16 pb-4 px-2 mx-auto">
        <Slot />
        <footer class="mt-8 pt-4 border-t border-gray-200">
          <div class="flex justify-end py-2">
            <div class="flex items-center">
              <span class="text-sm text-gray-500 mr-2">Language:</span>
              <LanguageSelector />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
});
