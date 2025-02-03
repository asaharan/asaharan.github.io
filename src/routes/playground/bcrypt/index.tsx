import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import bcrypt from "bcryptjs";
import { CopyButton } from "~/components/Copy";
import { MatPasswordOutlined } from "@qwikest/icons/material";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
	const rounds = useSignal("8");
	const password = useSignal<string>("");
	const hash = useSignal<string>("");
	const timeSpent = useSignal(0);
	const seconds = Math.floor(timeSpent.value / 1000);
	const milliseconds = timeSpent.value % 1000;
	const isProcessing = useSignal(false);
	const generatePassword = $(() => {
		const length = 16;
		const charset =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
		let result = "";
		for (let i = 0; i < length; i++) {
			result += charset.charAt(Math.floor(Math.random() * charset.length));
		}
		password.value = result;
	});
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
		<div class="max-w-2xl mx-auto p-6 space-y-6">
			<div class="space-y-2">
				<h1 class="text-3xl font-bold text-gray-900">
					Online Bcrypt Hash Generator
				</h1>
				<div class="text-gray-600">
					<p>
						Generate secure bcrypt hashes for your passwords with customizable
						rounds. Create strong random passwords and hash them instantly.
					</p>
					<p class="text-sm">
						All processing happens in your browser - no passwords are stored or
						transmitted.
					</p>
				</div>
			</div>

			<div class="space-y-4">
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700" for="rounds">
						Number of rounds
					</label>
					<input
						id="rounds"
						class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
						bind:value={rounds}
						type="number"
						min="4"
						max="31"
					/>
				</div>

				<div class="space-y-2">
					<div class="flex justify-start gap-4 items-center">
						<label
							class="block text-sm font-medium text-gray-700"
							for="password"
						>
							Password
						</label>
						{password.value && (
							<CopyButton
								content={password.value}
								class="shrink-0"
								size="sm"
								variant="secondary"
							/>
						)}
					</div>
					<div class="flex gap-2">
						<input
							class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
							bind:value={password}
							type="text"
							placeholder="Enter your password"
						/>
						<button
							onClick$={generatePassword}
							title="Generate Strong Password"
							class="px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors flex items-center gap-2"
						>
							<MatPasswordOutlined />
							Generate
						</button>
					</div>
				</div>

				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">
						Generated Hash{" "}
						{isProcessing.value && (
							<span class="text-primary-500">(processing...)</span>
						)}
					</label>
					<div class="flex gap-2">
						<input
							class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm"
							bind:value={hash}
							type="text"
							readOnly
							placeholder="Hash will appear here"
						/>
						{hash.value && <CopyButton content={hash.value} class="shrink-0" />}
					</div>
				</div>

				<div class="pt-2">
					<label class="block text-sm font-medium text-gray-700">
						Processing Time
					</label>
					<div class="text-gray-600">
						{seconds ? `${seconds} seconds ` : ""}
						{milliseconds} milliseconds
					</div>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = {
	title: "Bcrypt Hash Generator",
	meta: [
		{
			name: "description",
			content:
				"Generate secure bcrypt hashes for your passwords with customizable rounds. Create strong random passwords and hash them instantly.",
		},
	],
};
