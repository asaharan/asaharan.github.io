import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { jsonDiff } from "~/utils/diff";

export default component$(() => {
	const actualJsonSignal = useSignal("");
	const targetJsonSignal = useSignal("");
	const actualJsonParsedSignal = useSignal<Record<string, unknown> | null>(
		null,
	);
	const targetJsonParsedSignal = useSignal<Record<string, unknown> | null>(
		null,
	);
	const diffResultSignal = useSignal<{
		extra: Record<string, unknown>;
		missing: Record<string, unknown>;
		different: {
			actual: Record<string, unknown>;
			target: Record<string, unknown>;
		};
	} | null>(null);
	const errorSignal = useSignal<string | null>(null);

	useTask$(({ track }) => {
		track(() => actualJsonSignal.value);
		track(() => targetJsonSignal.value);

		errorSignal.value = null;
		diffResultSignal.value = null;

		if (!actualJsonSignal.value || !targetJsonSignal.value) return;

		try {
			actualJsonParsedSignal.value = JSON.parse(actualJsonSignal.value);
		} catch (e) {
			errorSignal.value = "Error parsing actual JSON";
			return;
		}

		try {
			targetJsonParsedSignal.value = JSON.parse(targetJsonSignal.value);
		} catch (e) {
			errorSignal.value = "Error parsing target JSON";
			return;
		}

		if (
			actualJsonParsedSignal.value === null ||
			targetJsonParsedSignal.value === null ||
			typeof actualJsonParsedSignal.value !== "object" ||
			typeof targetJsonParsedSignal.value !== "object" ||
			Array.isArray(actualJsonParsedSignal.value) ||
			Array.isArray(targetJsonParsedSignal.value)
		) {
			errorSignal.value = "Both inputs must be valid JSON objects";
			return;
		}

		diffResultSignal.value = jsonDiff(
			actualJsonParsedSignal.value,
			targetJsonParsedSignal.value,
		);
	});

	return (
		<div class="container mx-auto p-4">
			<h1 class="text-3xl font-bold mb-4">JSON Diff</h1>
			<p class="mb-2">
				Quickly compare your JSON data against target JSON data. Instantly
				detect extra properties in the actual JSON, missing properties in the
				target, and mismatched values to streamline your debugging workflow
				effectively.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div>
					<label for="actual-json" class="block mb-2 font-semibold">
						Actual JSON
					</label>
					<textarea
						id="actual-json"
						rows={10}
						class="w-full p-2 border border-gray-300 rounded font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						placeholder='{"name": "John", "age": 30}'
						value={actualJsonSignal.value}
						onInput$={(ev, el) => {
							actualJsonSignal.value = el.value;
						}}
					/>
				</div>
				<div>
					<label for="target-json" class="block mb-2 font-semibold">
						Target JSON
					</label>
					<textarea
						id="target-json"
						rows={10}
						class="w-full p-2 border border-gray-300 rounded font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
						placeholder='{"name": "John", "age": 25, "city": "New York"}'
						value={targetJsonSignal.value}
						onInput$={(ev, el) => {
							targetJsonSignal.value = el.value;
						}}
					/>
				</div>
			</div>

			{errorSignal.value && (
				<div class="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded">
					{errorSignal.value}
				</div>
			)}

			{diffResultSignal.value && (
				<div class="mb-6">
					<h2 class="text-2xl font-bold mb-4">Differences</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h3 class="text-xl font-semibold mb-2 text-red-600">
								Extra Properties (in Actual)
							</h3>
							<pre class="p-4 bg-gray-100 rounded overflow-auto max-h-80">
								{Object.keys(diffResultSignal.value.extra).length
									? JSON.stringify(diffResultSignal.value.extra, null, 2)
									: "No extra properties"}
							</pre>
						</div>
						<div>
							<h3 class="text-xl font-semibold mb-2 text-green-600">
								Missing Properties (in Target)
							</h3>
							<pre class="p-4 bg-gray-100 rounded overflow-auto max-h-80">
								{Object.keys(diffResultSignal.value.missing).length
									? JSON.stringify(diffResultSignal.value.missing, null, 2)
									: "No missing properties"}
							</pre>
						</div>
					</div>

					{Object.keys(diffResultSignal.value.different.actual).length > 0 && (
						<div class="mt-4">
							<h3 class="text-xl font-semibold mb-2 text-amber-600">
								Different Values
							</h3>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h4 class="font-medium mb-1">Actual Values</h4>
									<pre class="p-4 bg-gray-100 rounded overflow-auto max-h-80">
										{JSON.stringify(
											diffResultSignal.value.different.actual,
											null,
											2,
										)}
									</pre>
								</div>
								<div>
									<h4 class="font-medium mb-1">Target Values</h4>
									<pre class="p-4 bg-gray-100 rounded overflow-auto max-h-80">
										{JSON.stringify(
											diffResultSignal.value.different.target,
											null,
											2,
										)}
									</pre>
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			<div class="mb-6">
				<h2 class="text-2xl font-bold mb-4">Actions</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<button
						type="button"
						class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
						onClick$={() => {
							actualJsonSignal.value = JSON.stringify(
								{
									name: "John",
									age: 30,
									skills: ["js", "css"],
									address: {
										city: "San Francisco",
										zip: 94107,
									},
								},
								null,
								2,
							);
							targetJsonSignal.value = JSON.stringify(
								{
									name: "John",
									age: 25,
									city: "New York",
									skills: ["js", "css", "html"],
									address: {
										city: "New York",
										zip: 10001,
									},
								},
								null,
								2,
							);
						}}
					>
						Load Sample Data
					</button>
					<button
						type="button"
						class="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
						onClick$={() => {
							actualJsonSignal.value = "";
							targetJsonSignal.value = "";
							diffResultSignal.value = null;
							errorSignal.value = null;
						}}
					>
						Clear
					</button>
					<button
						type="button"
						class="p-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
						onClick$={() => {
							// Swap actual and target JSON
							const temp = actualJsonSignal.value;
							actualJsonSignal.value = targetJsonSignal.value;
							targetJsonSignal.value = temp;
						}}
					>
						Swap Inputs
					</button>
				</div>
			</div>
			<p class="mb-6 text-gray-700">
				Our JSON Difference Checker tool is a simple yet powerful solution to
				identify differences between actual and target JSON structures. Ideal
				for debugging React components, reviewing API responses, or validating
				configuration files, this tool highlights disparities to assist
				developers in swiftly pinpointing and resolving issues. Clearly
				classified results—Extra Properties, Missing Properties, and Different
				Values—make the debugging and testing processes simpler and more
				effective.
			</p>
		</div>
	);
});

export const head: DocumentHead = {
	title:
		"JSON Difference Checker: Easily Spot Differences Between Actual and Target JSON",
	meta: [
		{
			name: "description",
			content:
				"Quickly compare your JSON data against target structures. Instantly detect extra properties in the actual JSON, missing properties in the target, and mismatched values to streamline your debugging workflow effectively.",
		},
	],
};
