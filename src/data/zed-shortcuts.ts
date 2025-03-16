export interface ShortcutIcon {
	key: string | string[];
	name: string;
	description?: string;
}
export const shortcuts: ShortcutIcon[] = [
	{
		key: "cd",
		name: "Rename variable/function",
		description: "Rename the variable or function under the cursor",
	},
	{
		key: "cmd+r",
		name: "Toggle right sidebar",
		description: "I usually keep everything on the right",
	},
	{
		key: "shift+esc",
		name: "Enter zen mode",
		description:
			"Enter fullscreen mode, this works for files, terminal, AI assistant and Git text input",
	},
	{
		key: "ctrl+shift+~",
		name: "Add a new terminal",
		description: "Add a new terminal to the terminal panel",
	},
	{
		key: "cmd+j",
		name: "Toggle terminal panel",
		description: "To toggle the terminal panel",
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
		key: ":[line_number]",
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
		key: "gd",
		name: "Go to definition",
		description: "Jump to the definition of the word under the cursor",
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
	{
		key: "ctrl+shift+g",
		name: "toggle git panel",
		description:
			"You can use vim navigation keys to navigate through the git panel",
	},
	{
		key: "option+tab",
		name: "Generate commit message",
		description:
			"When focused on commit message in Git Panel, let AI generate a commit message",
	},
	{
		key: "ctrl+g ctrl+g",
		name: "git fetch",
		description: "fetch changes from remote",
	},
	{
		key: "ctrl+g down",
		name: "git pull",
		description: "pull changes from remote",
	},
	{
		key: "ctrl+g up",
		name: "git push",
		description: "push changes to remote",
	},
	{
		key: "ctrl+g shift+up",
		name: "git push --force",
		description: "forcepush changes to remote",
	},
	{
		key: "ctrl+g d",
		name: "git diff",
		description: "show all changes",
	},
	{
		key: "ctrl+cmd+y",
		name: "git add --all",
		description: "stage all changes",
	},
	{
		key: "shift+x",
		name: "git add --all",
		description: "stage all changes",
	},
	{
		key: "shift+u",
		name: "unstage all changes",
		description: "unstage all changes",
	},
];
