import { ChatGPTPluginItem } from "~/data/ChatGPTExtensionList";

export function matchSearchQuery(
  query: string,
  item: ChatGPTPluginItem
): number {
  // we will search a couple of fields and assign search match weights to them
  let matchWeight = 0;
  if (!query) return 1;
  const queryWords = query.toLowerCase().split(" ");
  const domain = item.domain.toLowerCase().split(" ");
  const name = item.manifest.name_for_human.toLowerCase().split(" ");
  const description = item.manifest.description_for_human
    .toLowerCase()
    .split(" ");
  const categories = item.categories
    .map((category) => category.title.toLowerCase().split(" "))
    .flat();

  // check if query is in domain
  if (queryWords.some((word) => domain.includes(word))) {
    matchWeight += 10;
  }

  // check if query is in name
  if (queryWords.some((word) => name.some((item) => item.includes(word)))) {
    matchWeight += 10;
  }

  // check if query is in description
  if (queryWords.some((word) => description.includes(word))) {
    matchWeight += 1;
  }

  // check if query is in categories
  if (queryWords.some((word) => categories.includes(word))) {
    matchWeight += 10;
  }

  return matchWeight;
}
