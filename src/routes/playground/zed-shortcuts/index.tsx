import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const head: DocumentHead = {
	title: "Zed Shortcuts Playground",
	meta: [
		{
			name: "description",
			content: "A page for searching and listing Zed shortcuts",
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
		name: "Open right sidebar",
		description:
			"Open the right sidebar. I usually keep everything on the right",
	},
	{
		key: "cmd+shift+e",
		name: "Open Project Explorer",
		description:
			"Open the project explorer to navigate files. You can navigate the project using vim keys(j, k, l, h)",
	},
	{
		key: "cmd+shift+?",
		name: "Open Assistant Panel",
		description: "Open the assistant panel to chat with the assistant",
	},
	{
		key: ":line_number",
		name: "Go to line number",
		description:
			"Go to the line number in the current file. Example: :10 will take you to line 10",
	},
	{
		key: "ctrl+d",
		name: "Scroll down half page",
	},
	{
		key: "ctrl+u",
		name: "Scroll up half page",
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
		key: "cmd+shift+o",
		name: "Open outline",
		description:
			"Open the outline view to see the structure of the current file. Press escape to close the outline",
	},
	{
		key: "cmd+p",
		name: "Search file",
		description: "Search for a file in the project",
	},
	{
		key: "cmd+shift+r",
		name: "Run a task",
		description:
			"Run a task from the task runner. You can define tasks in .zed/tasks.json",
	},
	{
		key: "$",
		name: "End of line",
		description: "Move the cursor to the end of the line",
	},
	{
		key: "A",
		name: "Move to end of line and enter edit mode",
	},
];

function doesMatch(search: string, shortcut: ShortcutIcon) {
	const searchTerm = search.toLowerCase();
	const key = shortcut.key.toLowerCase();
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
		<div class="p-4">
			<h1 class="text-xl font-bold">Zed Shortcuts</h1>
			<p>
				Use vim mode with Zed editor, it's super fast and efficient. Here are
				some of the shortcuts that I use frequently.
			</p>
			<div class="mt-2">
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
			<ul class="mt-4 space-y-2">
				{shortcuts.map((shortcut) => (
					<li
						class={[
							"p-2 border-b",
							{
								hidden: !doesMatch(searchTerm.value, shortcut),
							},
						]}
						key={shortcut.name}
					>
						<div class="flex gap-2 items-center">
							<span class="text-sm text-gray-500 bg-gray-200 px-2 rounded-md">
								{shortcut.key}
							</span>
							<div class="text-lg text-gray-800 font-medium">
								{shortcut.name}
							</div>
						</div>

						{shortcut.description && (
							<div class="text-sm text-gray-500">{shortcut.description}</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
});
