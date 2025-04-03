export interface ShortcutItem {
	key: string | string[];
	name: string;
	description?: string;
	categories?: string[]
}

enum ShortcutCategory {
	Navigation = "Navigation",
	Editing = "Editing",
	UIWindowManagement = "UI & Window Management",
	CodeIntelligence = "Code Intelligence",
	Terminal = "Terminal",
	GitVersionControl = "Git & Version Control",
	Assistant = "AI Assistant",
	FileSystemOperations = "File System Operations",
}

export const allShortcutCategories = Object.values(ShortcutCategory);

export const shortcuts: ShortcutItem[] = [
	{
		key: "cd",
		name: "Rename variable/function",
		description: "Rename the variable or function under the cursor",
		categories: [ShortcutCategory.Editing, ShortcutCategory.CodeIntelligence]
	},
	{
		key: "ctrl+enter",
		name: "Inline AI Assistant",
		description: "Generate code suggestions inline, it works even in Assistant panel and Terminal",
		categories: [ShortcutCategory.Assistant, ShortcutCategory.Terminal]
	},
	{
		key: "cmd+r",
		name: "Toggle right sidebar",
		description: "I usually keep everything on the right",
		categories: [ShortcutCategory.UIWindowManagement, ShortcutCategory.Navigation]
	},
	{
		key: "shift+esc",
		name: "Enter zen mode",
		description:
			"Enter fullscreen mode, this works for files, terminal, AI assistant and Git text input",
		categories: [ShortcutCategory.UIWindowManagement]
	},
	{
		key: "ctrl+shift+~",
		name: "Add a new terminal",
		description: "Add a new terminal to the terminal panel",
		categories: [ShortcutCategory.Terminal]
	},
	{
		key: "cmd+j",
		name: "Toggle terminal panel",
		description: "To toggle the terminal panel",
		categories: [ShortcutCategory.Terminal, ShortcutCategory.UIWindowManagement, ShortcutCategory.Navigation]
	},
	{
		key: "cmd+shift+e",
		name: "Open Project Explorer",
		description: "You can navigate the project using vim keys(j, k, l, h)",
		categories: [ShortcutCategory.Navigation, ShortcutCategory.UIWindowManagement]
	},
	{
		key: "cmd+shift+?",
		name: "Open Assistant Panel",
		description: "Open the assistant panel to chat with the assistant",
		categories: [ShortcutCategory.CodeIntelligence, ShortcutCategory.UIWindowManagement, ShortcutCategory.Navigation, ShortcutCategory.Assistant]
	},
	{
		key: ":[line_number]",
		name: "Go to line number",
		description: ":10 will take you to line 10",
		categories: [ShortcutCategory.Navigation]
	},
	{
		key: "ctrl+d",
		name: "Scroll down half page",
		description: "Scrolls and moves the cursor",
		categories: [ShortcutCategory.Navigation]
	},
	{
		key: "ctrl+u",
		name: "Scroll up half page",
		description: "Scrolls and moves the cursor",
		categories: [ShortcutCategory.Navigation]
	},
	{
		key: "u",
		name: "Undo",
		description: "Undo the last change",
		categories: [ShortcutCategory.Editing]
	},
	{
		key: "ctrl+r",
		name: "Redo",
		description: "Redo the last undone change. Opposite of undo.",
		categories: [ShortcutCategory.Editing]
	},
	{
		key: ["cmd+shift+o", "g s"],
		name: "Open outline",
		description: "View the structure of the current file",
		categories: [ShortcutCategory.Navigation, ShortcutCategory.CodeIntelligence]
	},
	{
		key: "cmd+p",
		name: "Search file by name",
		description: "Search for a file in the project",
		categories: [ShortcutCategory.Navigation]
	},
	{
		key: "cmd+shift+r",
		name: "Run a task",
		description: "Define tasks in .zed/tasks.json",
		categories: [ShortcutCategory.FileSystemOperations]
	},
	{
		key: "$",
		name: "End of line",
		description: "Move the cursor to the end of the line",
		categories: [ShortcutCategory.Navigation]
	},
	{
		key: "A",
		name: "Insert at end of line",
		description: "Move to end of line and enter edit mode",
		categories: [ShortcutCategory.Editing, ShortcutCategory.Navigation]
	},
	{
		key: "I",
		name: "Insert at start of line",
		description: "Move to start of line and enter edit mode",
		categories: [ShortcutCategory.Editing, ShortcutCategory.Navigation]
	},
	{
		key: "i",
		name: "Insert at cursor",
		description: "Enter edit mode at the current cursor position",
		categories: [ShortcutCategory.Editing]
	},
	{
		key: "o",
		name: "Add line below",
		description: "Add a new line below the current line",
		categories: [ShortcutCategory.Editing]
	},
	{
		key: "O",
		name: "Add line above",
		description: "Add a new line above the current line",
		categories: [ShortcutCategory.Editing]
	},
	{
		key: "gg",
		name: "Go to top of file",
		description: "Move the cursor to the top of the file",
		categories: [ShortcutCategory.Navigation]
	},
	{
		key: "G",
		name: "Go to bottom of file",
		description: "Move the cursor to the bottom of the file",
		categories: [ShortcutCategory.Navigation]
	},
	{
		key: "x",
		name: "Show file in finder",
		description: "When focus is on the project, show the file in finder",
		categories: [ShortcutCategory.FileSystemOperations]
	},
	{
		key: "gh",
		name: "Hover",
		description: "Hover over a word to see its definition",
		categories: [ShortcutCategory.CodeIntelligence]
	},
	{
		key: "gd",
		name: "Go to definition",
		description: "Jump to the definition of the word under the cursor",
		categories: [ShortcutCategory.CodeIntelligence, ShortcutCategory.Navigation]
	},
	{
		key: "g]",
		name: "Jump to next diagnostic",
		description: "Quicky loop through errors",
		categories: [ShortcutCategory.CodeIntelligence, ShortcutCategory.Navigation]
	},
	{
		key: "g[",
		name: "Jump to previous diagnostic",
		description: "Quicky loop through errors",
		categories: [ShortcutCategory.CodeIntelligence, ShortcutCategory.Navigation]
	},
	{
		key: "ctrl+shift+g",
		name: "toggle git panel",
		description:
			"You can use vim navigation keys to navigate through the git panel",
		categories: [ShortcutCategory.GitVersionControl, ShortcutCategory.UIWindowManagement, ShortcutCategory.Navigation]
	},
	{
		key: "option+tab",
		name: "Generate commit message",
		description:
			"When focused on commit message in Git Panel, let AI generate a commit message",
		categories: [ShortcutCategory.GitVersionControl, ShortcutCategory.Assistant]
	},
	{
		key: "ctrl+g ctrl+g",
		name: "git fetch",
		description: "fetch changes from remote",
		categories: [ShortcutCategory.GitVersionControl]
	},
	{
		key: "ctrl+g down",
		name: "git pull",
		description: "pull changes from remote",
		categories: [ShortcutCategory.GitVersionControl]
	},
	{
		key: "ctrl+g up",
		name: "git push",
		description: "push changes to remote",
		categories: [ShortcutCategory.GitVersionControl]
	},
	{
		key: "ctrl+g shift+up",
		name: "git push --force",
		description: "forcepush changes to remote",
		categories: [ShortcutCategory.GitVersionControl]
	},
	{
		key: "ctrl+g d",
		name: "git diff",
		description: "show all changes",
		categories: [ShortcutCategory.GitVersionControl]
	},
	{
		key: "ctrl+cmd+y",
		name: "git add --all",
		description: "stage all changes",
		categories: [ShortcutCategory.GitVersionControl]
	},
	{
		key: "shift+x",
		name: "git add --all",
		description: "stage all changes",
		categories: [ShortcutCategory.GitVersionControl]
	},
	{
		key: "shift+u",
		name: "unstage all changes",
		description: "unstage all changes",
		categories: [ShortcutCategory.GitVersionControl]
	},
];
