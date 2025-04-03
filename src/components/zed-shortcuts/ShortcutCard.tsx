import { component$ } from "@builder.io/qwik";
import type { ShortcutItem } from "~/data/zed-shortcuts";
import WorksIn from "./WorksIn";
import ShortcutKey from "./ShortcutKey";

export default component$(({ shortcut, hidden }: { shortcut: ShortcutItem, hidden?: boolean }) => {
	return (
		<div
			class={[
				"card bg-base-100 shadow-sm hover:shadow-xl transition",
				{
					hidden,
				},
				"col-span-1 md:col-span-1 lg:col-span-1",
			]}
			key={shortcut.name}
		>
			<div class="card-body">
				<div class="card-title">
					{shortcut.name}
				</div>
				<div class="flex flex-col gap-1">
					<ShortcutKey shortcuts={shortcut.key} />
				</div>
				{shortcut.description && (
					<p class="">
						{shortcut.description}
					</p>
				)}
				<WorksIn worksIn={shortcut.worksIn} />
			</div>
		</div>
	);
});
