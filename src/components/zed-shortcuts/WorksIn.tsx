import { component$ } from "@builder.io/qwik";
import type { ShortcutItem } from "~/data/zed-shortcuts";
import { LuAsterisk, LuCode, LuFolder, LuGitBranch, LuSparkles, LuTerminal } from '@qwikest/icons/lucide'

const panelIcons = {
	Terminal: <LuTerminal />,
	'AI Assistant': <LuSparkles />,
	Git: <LuGitBranch />,
	'File Explorer': <LuFolder />,
	'Editor': <LuCode />,
	"Everywhere": <LuAsterisk />
};

export default component$(({ worksIn }: { worksIn: ShortcutItem['worksIn'] }) => {
	if (!worksIn) { return null; }
	return (
		<div class="flex gap-2 flex-wrap">
			<span class="inline-flex">Works in:</span>
			{worksIn?.map((panel) => (
				<span class="badge badge-ghost" key={panel}>{panelIcons[panel]}{panel}</span>
			))}
		</div>
	);
});
