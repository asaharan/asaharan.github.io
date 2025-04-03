import { component$ } from "@builder.io/qwik";
import type { ShortcutItem } from "~/data/zed-shortcuts";
import WorksIn from "./WorksIn";



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
				<p class="flex gap-2">
					{Array.isArray(shortcut.key) ? (
						shortcut.key.map((key, index) => (
							<>
								{index > 0 && <span class="text-gray-500">or</span>}
								<kbd key={key} class="kbd">{key}</kbd>
							</>
						))
					) : (
						<kbd class="kbd">
							{shortcut.key}
						</kbd>
					)}
				</p>
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
