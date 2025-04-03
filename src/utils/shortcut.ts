import type { ShortcutItem } from "~/data/zed-shortcuts";

export function filterShortcuts(
	search: string,
	selectedCategories: Set<string>,
	shortcut: ShortcutItem,
): boolean | undefined {
	// Category filter
	const categoryMatch =
		selectedCategories.size === 0 ||
		shortcut.categories?.some((cat) => selectedCategories.has(cat));

	if (!categoryMatch) {
		return false;
	}

	// Search term filter
	if (!search) {
		return true; // No search term, only category filter applies
	}

	const searchTerm = search.toLowerCase();
	const key = Array.isArray(shortcut.key)
		? shortcut.key.join(" or ").toLowerCase()
		: shortcut.key.toLowerCase();
	const name = shortcut.name.toLowerCase();
	const description = shortcut.description?.toLowerCase();

	return (
		key.includes(searchTerm) ||
		name.includes(searchTerm) ||
		description?.includes(searchTerm)
	);
}
