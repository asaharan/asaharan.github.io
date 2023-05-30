import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import pluginList from "../../../data/ChatGPTExtensionList";
import { matchSearchQuery } from "~/utils/chatGPTPluginSearch";
import clsx from "clsx";
const categories = pluginList
  .map((plugin) => plugin.categories.map((category) => category.title))
  .flat()
  .filter((category, index, self) => self.indexOf(category) === index);
categories.unshift("All");

export default component$(() => {
  const query = useSignal("");
  const selectedCategory = useSignal("All");
  const filteredItems = useComputed$(() => {
    return pluginList
      .filter((plugin) => {
        if (selectedCategory.value === "All") {
          return true;
        }
        return plugin.categories.some(
          (category) => category.title === selectedCategory.value
        );
      })
      .map((plugin) => {
        return {
          ...plugin,
          score: matchSearchQuery(query.value, plugin),
        };
      })
      .filter((plugin) => plugin.score > 0)
      .sort((a, b) => b.score - a.score);
  });
  return (
    <div>
      <h1 class="text-3xl text-bold">Chat GPT Extensions</h1>
      <h3 class="text-xl">
        We all know that ChatGPT extensions have a bad UX. You can't search for
        extension.
      </h3>
      <p>But here I am trying to make it better.</p>
      <input
        autoFocus
        type="text"
        class="border-2 border-gray-300 rounded-md p-2 w-full"
        bind:value={query}
      />
      <div>
        <span>Categories: </span>
        <div class="flex gap-2">
          {categories.map((category) => {
            return (
              <span class="p-2 inline-flex gap-1">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onInput$={(e) => {
                    selectedCategory.value = e.target?.value;
                  }}
                />
                {category}
              </span>
            );
          })}
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4 mb-4">
        {filteredItems.value.map((plugin, index) => {
          return (
            <div
              key={plugin.id}
              class="border shadow rounded-xl p-3 flex gap-2"
            >
              <img
                src={plugin.manifest.logo_url}
                class="w-24 rounded-2xl"
                loading={index < 10 ? "eager" : "lazy"}
              />
              <div>
                <div class="flex gap-2">
                  <h3 class="text-xl">{plugin.manifest.name_for_human}</h3>
                  {typeof plugin.originalIndex !== "undefined" ? (
                    <span>
                      Page: {Math.ceil((plugin.originalIndex + 1) / 8)}#
                      {plugin.originalIndex}
                    </span>
                  ) : null}
                  <div>
                    {plugin.categories.map((category) => {
                      return (
                        <span
                          class={clsx(
                            "inline-flex gap-1 bg-gray-100 rounded-md p-1 text-xs",
                            {
                              "bg-green-100": category.title === "Most popular",
                              "bg-blue-100": category.title === "New",
                            }
                          )}
                        >
                          {category.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    plugin.rootDomain
                      ? `https://${plugin.rootDomain}`
                      : `https://${plugin.domain}`
                  }
                  class="text-gray-500"
                >
                  {plugin.rootDomain || plugin.domain}
                </a>
                <p class="text-gray-500 line-clamp-2">
                  {plugin.manifest.description_for_human}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
