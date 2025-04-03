import { component$ } from "@builder.io/qwik";


export default component$(({ shortcuts }: { shortcuts: string[][] }) => {
	return shortcuts.map((shortcut, index) => {
		return <div key={index} class="flex gap-1 flex-nowrap">
			{shortcut.map(key => <kbd class="kbd" key={index}>{key}</kbd>)}
		</div>
	})
})
