import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
	return (
		<div class="bg-white rounded-lg border border-transparent relative p-[1px]">
			<div class="absolute z-20 left-0 top-0 w-full h-full rounded-lg border border-black" />
			<div class="absolute z-10 left-1 top-1 w-full h-full bg-red-400 rounded-lg" />
			<div class="p-4 z-20 relative bg-white rounded-lg border border-transparent h-full flex flex-col justify-between">
				<Slot />
			</div>
		</div>
	);
});
