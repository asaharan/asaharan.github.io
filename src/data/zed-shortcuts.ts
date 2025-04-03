export interface ShortcutItem {
	key: string[][];
	name: string;
	description?: string;
	categories: string[];
	/**
	* This command is available when the focus is on these panels
	*/
	availableIn?: PanelType[];
	/**
	* Works in these panels
	*/
	worksIn?: PanelType[];
}

enum PanelType {
	Assistant = "AI Assistant",
	Terminal = "Terminal",
	Git = "Git",
	FileExplorer = "File Explorer",
	Editor = "Editor",
	Everywhere = "Everywhere",
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
		key: [["c", "d"]],
		name: "Rename variable/function",
		description: "Rename the variable or function under the cursor",
		categories: [ShortcutCategory.Editing, ShortcutCategory.CodeIntelligence],
		worksIn: [PanelType.Editor],
	},
	{
		key: [["ctrl+enter"]],
		name: "Inline AI Assistant",
		description: "Generate code suggestions inline, it works even in Assistant panel and Terminal",
		categories: [ShortcutCategory.Assistant, ShortcutCategory.Terminal],
		worksIn: [PanelType.Editor, PanelType.Terminal, PanelType.Assistant],
	},
	{
		key: [["cmd+r"]],
		name: "Toggle right sidebar",
		description: "I usually keep everything on the right",
		categories: [ShortcutCategory.UIWindowManagement, ShortcutCategory.Navigation],
		worksIn: [PanelType.Everywhere],
	},
	{
		key: [["shift+esc"]],
		name: "Enter zen mode",
		description:
			"Enter fullscreen mode, this works for files, terminal, AI assistant and Git text input",
		categories: [ShortcutCategory.UIWindowManagement],
		worksIn: [PanelType.Editor, PanelType.Terminal, PanelType.Assistant, PanelType.Git],
	},
	{
		key: [["ctrl+shift+~"]],
		name: "Add a new terminal",
		description: "Add a new terminal to the terminal panel",
		categories: [ShortcutCategory.Terminal],
		availableIn: [PanelType.Everywhere],
	},
	{
		key: [["cmd+j"]],
		name: "Toggle terminal panel",
		description: "To toggle the terminal panel",
		categories: [ShortcutCategory.Terminal, ShortcutCategory.UIWindowManagement, ShortcutCategory.Navigation],
		availableIn: [PanelType.Everywhere],
	},
	{
		key: [["cmd+shift+e"]],
		name: "Open Project Explorer",
		description: "You can navigate the project using vim keys(j, k, l, h)",
		categories: [ShortcutCategory.Navigation, ShortcutCategory.UIWindowManagement, ShortcutCategory.FileSystemOperations],
		availableIn: [PanelType.Editor, PanelType.FileExplorer, PanelType.Terminal, PanelType.Git],
	},
	{
		key: [["cmd+shift+?"]],
		name: "Open Assistant Panel",
		description: "Open the assistant panel to chat with the assistant",
		categories: [ShortcutCategory.CodeIntelligence, ShortcutCategory.UIWindowManagement, ShortcutCategory.Navigation, ShortcutCategory.Assistant],
		availableIn: [PanelType.Everywhere],
	},
	{
		key: [[":n"]],
		name: "Go to line number",
		description: ":10 will take you to line 10",
		categories: [ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor],
	},
	{
		key: [["ctrl+d"]],
		name: "Scroll down half page",
		description: "Scrolls and moves the cursor",
		categories: [ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor, PanelType.Assistant],
	},
	{
		key: [["ctrl+u"]],
		name: "Scroll up half page",
		description: "Scrolls and moves the cursor",
		categories: [ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor, PanelType.Assistant],
	},
	{
		key: [["u"]],
		name: "Undo",
		description: "Undo the last change",
		categories: [ShortcutCategory.Editing],
		worksIn: [PanelType.Editor, PanelType.Assistant],
	},
	{
		key: [["ctrl+r"]],
		name: "Redo",
		description: "Redo the last undone change. Opposite of undo.",
		categories: [ShortcutCategory.Editing],
		worksIn: [PanelType.Editor, PanelType.Assistant],
	},
	{
		key: [["cmd+shift+o"], ["g", "s"]],
		name: "Open outline",
		description: "View the structure of the current file",
		categories: [ShortcutCategory.Navigation, ShortcutCategory.CodeIntelligence],
		worksIn: [PanelType.Editor],
		availableIn: [PanelType.Everywhere]
	},
	{
		key: [["cmd+p"]],
		name: "Search project files",
		description: "Search for a file in the project",
		categories: [ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor],
		availableIn: [PanelType.Everywhere]
	},
	{
		key: [["cmd+shift+r"]],
		name: "Run a task",
		description: "Define tasks in .zed/tasks.json",
		categories: [ShortcutCategory.FileSystemOperations],
		availableIn: [PanelType.Everywhere]
	},
	{
		key: [["$"]],
		name: "End of line",
		description: "Move the cursor to the end of the line",
		categories: [ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor, PanelType.Assistant]
	},
	{
		key: [["A"]],
		name: "Insert at end of line",
		description: "Move to end of line and enter edit mode",
		categories: [ShortcutCategory.Editing, ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor, PanelType.Assistant]
	},
	{
		key: [["I"]],
		name: "Insert at start of line",
		description: "Move to start of line and enter edit mode",
		categories: [ShortcutCategory.Editing, ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor, PanelType.Assistant]
	},
	{
		key: [["i"]],
		name: "Insert at cursor",
		description: "Enter edit mode at the current cursor position",
		categories: [ShortcutCategory.Editing],
		worksIn: [PanelType.Editor, PanelType.Assistant]
	},
	{
		key: [["o"]],
		name: "Add line below",
		description: "Add a new line below the current line",
		categories: [ShortcutCategory.Editing],
		worksIn: [PanelType.Editor, PanelType.Assistant]
	},
	{
		key: [["O"]],
		name: "Add line above",
		description: "Add a new line above the current line",
		categories: [ShortcutCategory.Editing],
		worksIn: [PanelType.Editor, PanelType.Assistant]
	},
	{
		key: [["g", "g"]],
		name: "Go to top of file",
		description: "Move the cursor to the top of the file",
		categories: [ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor, PanelType.Assistant, PanelType.FileExplorer]
	},
	{
		key: [["G"], ["shift", "g"]],
		name: "Go to bottom of file",
		description: "Move the cursor to the bottom of the file",
		categories: [ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor, PanelType.Assistant, PanelType.FileExplorer]
	},
	{
		key: [["x"]],
		name: "Show file in finder",
		description: "When focus is on the project, show the file in finder",
		categories: [ShortcutCategory.FileSystemOperations],
		worksIn: [PanelType.FileExplorer]
	},
	{
		key: [["g", "h"]],
		name: "Hover",
		description: "Hover over a word to see its definition",
		categories: [ShortcutCategory.CodeIntelligence],
		worksIn: [PanelType.Editor]
	},
	{
		key: [["g", "d"]],
		name: "Go to definition",
		description: "Jump to the definition of the word under the cursor",
		categories: [ShortcutCategory.CodeIntelligence, ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor]
	},
	{
		key: [["g", "]"]],
		name: "Jump to next diagnostic",
		description: "Quicky loop through errors",
		categories: [ShortcutCategory.CodeIntelligence, ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor]
	},
	{
		key: [["g", "["]],
		name: "Jump to previous diagnostic",
		description: "Quicky loop through errors",
		categories: [ShortcutCategory.CodeIntelligence, ShortcutCategory.Navigation],
		worksIn: [PanelType.Editor]
	},
	{
		key: [["ctrl+shift+g"]],
		name: "toggle git panel",
		description:
			"You can use vim navigation keys to navigate through the git panel",
		categories: [ShortcutCategory.GitVersionControl, ShortcutCategory.UIWindowManagement, ShortcutCategory.Navigation],
		availableIn: [PanelType.Everywhere]
	},
	{
		key: [["option+tab"]],
		name: "Generate commit message",
		description:
			"When focused on commit message in Git Panel, let AI generate a commit message",
		categories: [ShortcutCategory.GitVersionControl, ShortcutCategory.Assistant],
		worksIn: [PanelType.Git]
	},
	{
		key: [["ctrl+g", "ctrl+g"]],
		name: "git fetch",
		description: "fetch changes from remote",
		categories: [ShortcutCategory.GitVersionControl],
		availableIn: [PanelType.Git]
	},
	{
		key: [["ctrl+g", "down"]],
		name: "git pull",
		description: "pull changes from remote",
		categories: [ShortcutCategory.GitVersionControl],
		availableIn: [PanelType.Git]
	},
	{
		key: [["ctrl+g", "up"]],
		name: "git push",
		description: "push changes to remote",
		categories: [ShortcutCategory.GitVersionControl],
		availableIn: [PanelType.Git]
	},
	{
		key: [["ctrl+g", "shift+up"]],
		name: "git push --force",
		description: "forcepush changes to remote",
		categories: [ShortcutCategory.GitVersionControl],
		availableIn: [PanelType.Git]
	},
	{
		key: [["ctrl+g", "d"]],
		name: "git diff",
		description: "show all changes",
		categories: [ShortcutCategory.GitVersionControl],
		availableIn: [PanelType.Git]
	},
	{
		key: [["ctrl+cmd+y"]],
		name: "git add --all",
		description: "stage all changes",
		categories: [ShortcutCategory.GitVersionControl],
		availableIn: [PanelType.Git]
	},
	{
		key: [["shift+x"]],
		name: "git add --all",
		description: "stage all changes",
		categories: [ShortcutCategory.GitVersionControl],
		availableIn: [PanelType.Git]
	},
	{
		key: [["shift+u"]],
		name: "unstage all changes",
		description: "unstage all changes",
		categories: [ShortcutCategory.GitVersionControl],
		availableIn: [PanelType.Git]
	},
	{
		key: [["ctrl+enter"]],
		name: "Chat with Assistant",
		description: "Send message to the assistant",
		categories: [ShortcutCategory.Assistant],
		worksIn: [PanelType.Assistant]
	},
	{
		key: [["cmd+shift+enter"]],
		name: "Suggest Edits",
		description: "AI will suggest edits to your code. You must have at least one file attached for it to work.",
		categories: [ShortcutCategory.Assistant],
		worksIn: [PanelType.Assistant]
	},
	{
		key: [["z", "a"]],
		name: "Toggle code fold",
		description: "Close or open a code fold",
		categories: [ShortcutCategory.Editing],
		availableIn: [PanelType.Editor, PanelType.Assistant]
	},
	{
		key: [["z", "R"]],
		name: "Open all folds in the file",
		description: "This opens all the folds in the file",
		categories: [ShortcutCategory.Editing],
		availableIn: [PanelType.Editor, PanelType.Assistant]
	},
	{
		key: [["z", "M"]],
		name: "Close all folds in the file",
		description: "Very useful when you want to have a quick overview of the file",
		categories: [ShortcutCategory.Editing],
		availableIn: [PanelType.Editor, PanelType.Assistant]
	}
];

export const shortcutsByCategory = shortcuts.reduce((acc, shortcut) => {
	if (!acc[shortcut.categories[0]]) {
		acc[shortcut.categories[0]] = [];
	}
	acc[shortcut.categories[0]].push(shortcut);
	return acc;
}, {} as Record<string, ShortcutItem[]>);
