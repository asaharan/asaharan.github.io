import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import bcrypt from "bcryptjs";

export default component$(() => {
	const rounds = useSignal("8");
	const password = useSignal<string>("");
	const hash = useSignal<string>("");
	const timeSpent = useSignal(0);
	const seconds = Math.floor(timeSpent.value / 1000);
	const milliseconds = timeSpent.value % 1000;
	const isProcessing = useSignal(false);
	useTask$(async ({ track }) => {
		track(() => rounds.value);
		track(() => password.value);
		if (password.value.length > 0) {
			isProcessing.value = true;
			const numRounds = Number.parseInt(rounds.value);
			if (numRounds > 0 && !Number.isNaN(numRounds)) {
				const timestamp = Date.now();
				hash.value = await bcrypt.hash(
					password.value,
					bcrypt.genSaltSync(numRounds),
				);
				const elapsed = Date.now() - timestamp;
				timeSpent.value = elapsed;
				isProcessing.value = false;
			}
		}
	});
	return (
		<div class="flex flex-col gap-2 items-start">
			<h1 class="text-2xl font-bold">Bcrypt Hash Generator</h1>
			<div class="text-sm">
				Quickly generate bcrypt hash for your password.
				<p>No password is stored or sent to the server.</p>
			</div>
			<div class="text-md font-semibold">No of rounds</div>
			<input class="border" bind:value={rounds} type="number" />
			<div class="text-md font-semibold">Password</div>
			<input
				class="border"
				bind:value={password}
				type="text"
				placeholder="Your strong password"
			/>
			<div class="text-md font-semibold">
				Hash {isProcessing.value ? "..." : ""}
			</div>
			<input
				class="border"
				bind:value={hash}
				type="text"
				readOnly
				placeholder="Has will be shown here"
			/>
			<div class="text-md font-semibold">Time spent in generating hash</div>
			<div>
				{seconds ? `${seconds} sec ` : ""}
				{milliseconds} milliseconds
			</div>
		</div>
	);
});
