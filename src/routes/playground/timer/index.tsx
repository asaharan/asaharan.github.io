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
		<div class="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:max-w-2xl p-8 border border-gray-100">
			<div>
				<h1 class="text-3xl font-bold text-center mb-2 text-gray-800">Timer</h1>
				<h2
					class={[
						"text-lg font-medium text-center mb-6 text-gray-700",
						{
							hidden: isRunning.value,
						},
					]}
				>
					Select number of minutes and seconds to start the timer.
				</h2>
				<div
					class={[
						"flex gap-8 justify-center mb-10 px-4",
						{ hidden: isRunning.value },
					]}
				>
					<div class="flex flex-col">
						<label for="minutes" class="text-sm font-medium text-gray-700 mb-2">
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
							class="w-24 px-4 py-3 border shadow-md border-gray-300 rounded-xl text-lg font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-400 bg-gray-50"
							disabled={isRunning.value}
						/>
					</div>
					<div class="flex flex-col">
						<label for="seconds" class="text-sm font-medium text-gray-700 mb-2">
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
							class="w-24 px-4 py-3 border shadow-md border-gray-300 rounded-xl text-lg font-medium text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-400 bg-gray-50"
							disabled={isRunning.value}
						/>
					</div>
				</div>

				<div class={["text-center mb-10", { hidden: !isRunning.value }]}>
					<div
						class="text-7xl font-bold font-mono"
					>
						{String(minutes.value).padStart(2, "0")}:
						{String(seconds.value).padStart(2, "0")}
					</div>
				</div>
			</div>

			<div class="flex justify-center gap-4">
				{!isRunning.value ? (
					<button
						onClick$={startTimer}
						type="button"
						class="btn transition-all duration-200 hover:scale-105 active:scale-95"
					>
						Start
					</button>
				) : (
					<button
						type="button"
						onClick$={pauseTimer}
						class="btn transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
					>
						Pause
					</button>
				)}
				<button
					type="button"
					onClick$={resetTimer}
					class="btn transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
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
