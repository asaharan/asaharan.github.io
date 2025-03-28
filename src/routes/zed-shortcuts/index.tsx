import { component$, useSignal } from "@builder.io/qwik";
import ImgZed from "~/media/zed.png?w=64&h=64&jsx";
import { shortcuts, type ShortcutIcon } from "~/data/zed-shortcuts";

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
			content: "2025-03-16",
		},
	],
};

function doesMatch(search: string, shortcut: ShortcutIcon) {
	const searchTerm = search.toLowerCase();
	const key = Array.isArray(shortcut.key)
		? shortcut.key.join(" or ")
		: shortcut.key;
	const name = shortcut.name.toLowerCase();
	const description = shortcut.description?.toLowerCase();
	return (
		key.includes(searchTerm) ||
		name.includes(searchTerm) ||
		description?.includes(searchTerm)
	);
}

export default component$(() => {
	const searchTerm = useSignal("");

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
				<input
					type="text"
					placeholder="Search shortcuts..."
					value={searchTerm.value}
					onInput$={(e) => {
						searchTerm.value = (e.target as HTMLInputElement).value;
					}}
					class="w-full p-2 border rounded-md"
				/>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{shortcuts.map((shortcut) => (
					<div
						class={[
							"pr-2 py-3 border-b",
							{
								hidden: !doesMatch(searchTerm.value, shortcut),
							},
							"col-span-1 md:col-span-1 lg:col-span-1",
						]}
						key={shortcut.name}
					>
						<div class="flex gap-2 items-center">
							{Array.isArray(shortcut.key) ? (
								shortcut.key.map((key) => (
									<span
										key={key}
										class="text-lg text-black bg-secondary-600 px-2 rounded-md"
									>
										{key}
									</span>
								))
							) : (
								<span class="text-lg text-black bg-secondary-600 px-2 rounded-md">
									{shortcut.key}
								</span>
							)}
							<div class="text-lg text-gray-800 font-medium">
								{shortcut.name}
							</div>
						</div>

						{shortcut.description && (
							<div class="text-md text-gray-500 mt-2">
								{shortcut.description}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
});
