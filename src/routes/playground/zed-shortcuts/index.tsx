import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const head: DocumentHead = {
	title: "Zed Shortcuts",
	meta: [
		{
			name: "description",
			content: "Shortcuts for Zed editor that are useful for developers",
		},
	],
};

interface ShortcutIcon {
	key: string;
	name: string;
	description?: string;
}
const shortcuts: ShortcutIcon[] = [
	{
		key: "c d",
		name: "Rename variable/function",
		description: "Rename the variable or function under the cursor",
	},
	{
		key: "cmd r",
		name: "Toggle right sidebar",
		description: "I usually keep everything on the right",
	},
	{
		key: "cmd+shift+e",
		name: "Open Project Explorer",
		description: "You can navigate the project using vim keys(j, k, l, h)",
	},
	{
		key: "cmd+shift+?",
		name: "Open Assistant Panel",
		description: "Open the assistant panel to chat with the assistant",
	},
	{
		key: ":line_number",
		name: "Go to line number",
		description: ":10 will take you to line 10",
	},
	{
		key: "ctrl+d",
		name: "Scroll down half page",
		description: "Scrolls and moves the cursor",
	},
	{
		key: "ctrl+u",
		name: "Scroll up half page",
		description: "Scrolls and moves the cursor",
	},
	{
		key: "u",
		name: "Undo",
		description: "Undo the last change",
	},
	{
		key: "ctrl+r",
		name: "Redo",
		description: "Redo the last undone change. Opposite of undo.",
	},
	{
		key: ["cmd+shift+o", "g s"],
		name: "Open outline",
		description: "View the structure of the current file",
	},
	{
		key: "cmd+p",
		name: "Search file by name",
		description: "Search for a file in the project",
	},
	{
		key: "cmd+shift+r",
		name: "Run a task",
		description: "Define tasks in .zed/tasks.json",
	},
	{
		key: "$",
		name: "End of line",
		description: "Move the cursor to the end of the line",
	},
	{
		key: "A",
		name: "Insert at end of line",
		description: "Move to end of line and enter edit mode",
	},
	{
		key: "I",
		name: "Insert at start of line",
		description: "Move to start of line and enter edit mode",
	},
	{
		key: "i",
		name: "Insert at cursor",
		description: "Enter edit mode at the current cursor position",
	},
	{
		key: "o",
		name: "Add line below",
		description: "Add a new line below the current line",
	},
	{
		key: "O",
		name: "Add line above",
		description: "Add a new line above the current line",
	},
	{
		key: "gg",
		name: "Go to top of file",
		description: "Move the cursor to the top of the file",
	},
	{
		key: "G",
		name: "Go to bottom of file",
		description: "Move the cursor to the bottom of the file",
	},
	{
		key: "x",
		name: "Show file in finder",
		description: "When focus is on the project, show the file in finder",
	},
	{
		key: "gh",
		name: "Hover",
		description: "Hover over a word to see its definition",
	},
	{
		key: "g]",
		name: "Jump to next diagnostic",
		description: "Quicky loop through errors",
	},
	{
		key: "g[",
		name: "Jump to previous diagnostic",
		description: "Quicky loop through errors",
	},
];

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
					<img src="/icons/zed.png" width={48} height={48} alt="Zed Logo" />
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
