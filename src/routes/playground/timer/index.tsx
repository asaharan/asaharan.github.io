import {
	$,
	type NoSerialize,
	component$,
	noSerialize,
	useSignal,
	useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
	const minutes = useSignal(5);
	const seconds = useSignal(0);
	const totalSeconds = useSignal(0);
	const isRunning = useSignal(false);
	const intervalId = useSignal<NoSerialize<{ id: NodeJS.Timeout }>>();

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup, track }) => {
		track(() => isRunning.value);

		if (isRunning.value && totalSeconds.value >= 0) {
			intervalId.value = noSerialize({
				id: setInterval(() => {
					if (totalSeconds.value > 0) {
						totalSeconds.value--;
						minutes.value = Math.floor(totalSeconds.value / 60);
						seconds.value = totalSeconds.value % 60;
					} else {
						isRunning.value = false;
						intervalId.value?.id && clearInterval(intervalId.value.id);
					}
				}, 1000),
			});
		}

		cleanup(() => {
			if (intervalId.value?.id) clearInterval(intervalId.value.id);
		});
	});

	const startTimer = $(() => {
		if (minutes.value === 0 && seconds.value === 0) return;
		totalSeconds.value = minutes.value * 60 + seconds.value;
		isRunning.value = true;
	});

	const pauseTimer = $(() => {
		isRunning.value = false;
		if (intervalId.value?.id) clearInterval(intervalId.value.id);
	});

	const resetTimer = $(() => {
		isRunning.value = false;
		if (intervalId.value?.id) clearInterval(intervalId.value.id);
		minutes.value = 5;
		seconds.value = 0;
		totalSeconds.value = 0;
	});

	return (
		<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 border">
			<h1 class="text-2xl font-bold text-center mb-8">Timer</h1>

			<div
				class={[
					"flex gap-4 justify-center mb-8",
					{
						hidden: isRunning.value,
					},
				]}
			>
				<div class="flex flex-col">
					<label for="minutes" class="text-sm text-gray-600 mb-1">
						Minutes
					</label>
					<input
						type="number"
						min="0"
						value={minutes.value}
						onInput$={(e) => {
							minutes.value = +(e.target as HTMLInputElement).value;
						}}
						id="minutes"
						class="w-20 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isRunning.value}
					/>
				</div>
				<div class="flex flex-col">
					<label for="seconds" class="text-sm text-gray-600 mb-1">
						Seconds
					</label>
					<input
						type="number"
						min="0"
						max="59"
						value={seconds.value}
						onInput$={(e) => {
							seconds.value = +(e.target as HTMLInputElement).value;
						}}
						id="seconds"
						class="w-20 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isRunning.value}
					/>
				</div>
			</div>

			<div class={["text-center mb-8", { hidden: !isRunning.value }]}>
				<div class="text-6xl font-bold">
					{String(minutes.value).padStart(2, "0")}:
					{String(seconds.value).padStart(2, "0")}
				</div>
			</div>

			<div class="flex justify-center gap-4">
				{!isRunning.value ? (
					<button
						onClick$={startTimer}
						type="button"
						class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md transition-colors"
					>
						Start
					</button>
				) : (
					<button
						type="button"
						onClick$={pauseTimer}
						class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
					>
						Pause
					</button>
				)}
				<button
					type="button"
					onClick$={resetTimer}
					class="bg-secondary-900 hover:bg-secondary-950 text-white px-6 py-2 rounded-md transition-colors"
				>
					Reset
				</button>
			</div>
		</div>
	);
});

export const head: DocumentHead = {
	title: "Online Timer: Simple, Customizable Countdown Tool",
	meta: [
		{
			name: "description",
			content:
				"Free online timer tool with customizable countdown. Perfect for work, study, cooking, or exercise. Easy to use, no download required. Start timing now!",
		},
	],
};
