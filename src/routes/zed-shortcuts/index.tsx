import { component$, useSignal } from "@builder.io/qwik";
import ImgZed from "~/media/zed.png?w=64&h=64&jsx";
import {
	allShortcutCategories,
	shortcutsByCategory,
} from "~/data/zed-shortcuts";
import ShortcutCard from "~/components/zed-shortcuts/ShortcutCard";
import { filterShortcuts } from "~/utils/shortcut";
import { LuSearch } from "@qwikest/icons/lucide";


export const head = {
	title: "Zed Shortcuts",
	meta: [
		{
			name: "description",
			content:
				"Shortcuts and hotkeys for Zed editor that are useful for developers and will enhance your productivity.",
		},
		{
			name: "last-updated",
			content: "2025-04-03",
		},
	],
};



export default component$(() => {
	const searchTerm = useSignal("");
	const selectedCategories = useSignal<Set<string>>(new Set());

	return (
		<div class="lg:p-2">
			<div class="flex gap-4 mb-4">
				<div class="aspect-square w-12">
					<a href="https://zed.dev" target="_blank" rel="noreferrer">
						<ImgZed alt="Zed Logo" />
					</a>
				</div>
				<div>
					<h1 class="text-xl font-bold">
						<span>Zed Shortcuts</span>
					</h1>
					<p class="text-gray-600">
						Zed is my favorite editor. I use vim mode with Zed editor, it's
						super fast and efficient. Here are some of the shortcuts that I use
						frequently.
					</p>
					<p>
						You can read{" "}
						<a class="link" href="/blogs/why-zed-is-my-primary-code-editor/">
							my blog post
						</a>{" "}
						if you want to know why Zed is my primary editor.
					</p>
					<div class="text-gray-400 text-sm">
						<p>Last updated: 3rd March 2025</p>
					</div>
				</div>
			</div>

			<div class="mb-1">
				<label class="input w-full">
					<LuSearch />
					<input
						type="text"
						placeholder="Search shortcuts..."
						value={searchTerm.value}
						onInput$={(e) => {
							searchTerm.value = (e.target as HTMLInputElement).value;
						}}
						class="grow"
					/>
				</label>
			</div>
			<div class="mb-4 mt-4 flex flex-wrap gap-2">
				{allShortcutCategories.map((category) => {
					const isSelected = selectedCategories.value.has(category);
					return (
						<button
							class={["badge badge-lg badge-soft", isSelected ? "badge-primary" : "badge-neutral"]}
							key={category}
							onClick$={() => {
								const newSelection = new Set(selectedCategories.value);
								if (isSelected) {
									newSelection.delete(category);
								} else {
									newSelection.add(category);
								}
								selectedCategories.value = newSelection;
							}}
						>
							{category}
						</button>
					);
				})}
				{selectedCategories.value.size > 0 && (
					<button
						class="badge badge-error badge-lg"
						onClick$={() => {
							selectedCategories.value = new Set();
						}}
						title="Clear all category filters"
					>
						Clear Filters &times;
					</button>
				)}
			</div>
			<div class="flex flex-col gap-4">
				{allShortcutCategories.map(category => {
					const shortcuts = shortcutsByCategory[category]?.filter(shortcut => filterShortcuts(searchTerm.value, selectedCategories.value, shortcut))
					if (!shortcuts?.length) return null;
					return <section key={category}>
						<h2 class="text-xl font-bold mb-2">{category}</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
							{shortcuts.map((shortcut) => (
								<ShortcutCard key={shortcut.name} shortcut={shortcut} hidden={false} />
							))}
						</div>
					</section>
				})}
			</div>
		</div>
	);
});
