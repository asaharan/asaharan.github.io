import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import clsx from "clsx";
import { generateKeyPair } from "~/utils/crypto";

interface BoxKeyPair {
	/**
	 * base 64 encoded Uint8Array
	 */
	publicKey: string | null;
	/**
	 * base 64 encoded Uint8Array
	 */
	privateKey: string | null;
}

const DisplayKey = component$(({ k }: { k: string | null }) => {
	const hasCopied = useSignal(false);
	return (
		<span>
			<span
				onClick$={() => {
					if (k) {
						navigator.clipboard.writeText(k);
						hasCopied.value = true;
					}
				}}
				class={clsx("ml-2 inline-code", {
					"bg-neutral-400": hasCopied.value,
				})}
			>
				{k || "NA"}
			</span>
			{hasCopied.value && <span class="ml-2 text-sm">Copied</span>}
		</span>
	);
});

function DisplayKeys({ boxKeyPair }: { boxKeyPair: BoxKeyPair }) {
	return (
		<div>
			<div>
				<span>Public key:</span>
				<DisplayKey k={boxKeyPair.publicKey} />
			</div>
			<div>
				<span>Private key:</span>
				<DisplayKey k={boxKeyPair.privateKey} />
			</div>
		</div>
	);
}

export default component$(() => {
	const store = useStore<{ client: BoxKeyPair; server: BoxKeyPair }>({
		client: {
			publicKey: null,
			privateKey: null,
		},
		server: {
			publicKey: null,
			privateKey: null,
		},
	});
	const handleGenerateKeyPair = $(() => {
		const clientKeyPair = generateKeyPair();
		store.client.publicKey = clientKeyPair.publicKey;
		store.client.privateKey = clientKeyPair.privateKey;
		const serverKeyPair = generateKeyPair();
		store.server.publicKey = serverKeyPair.publicKey;
		store.server.privateKey = serverKeyPair.privateKey;
	});

	return (
		<div>
			<h1 class="text-xl font-bold">TweetNaCl</h1>
			<p class="text-sm">
				Generate key pair using{" "}
				<a
					target="_blank"
					href="https://tweetnacl.js.org/#/"
					rel="noreferrer"
					class="text-blue-500"
				>
					TweetNaCl
				</a>
				.
			</p>
			<p class="text-sm">No key is stored or sent to the server.</p>
			<button
				onClick$={handleGenerateKeyPair}
				class="b-1 py-2 px-4 my-1 rounded bg-blue-500 text-white"
			>
				Generate Key Pair
			</button>
			<div class="grid grid-cols-2 gap-2">
				{[
					{ name: "Client", data: store.client },
					{ name: "Server", data: store.server },
				].map(({ name, data }) => (
					<div key={name} class="bg-gray-100 p-2 rounded-md">
						<h2 class="text-xl font-semibold">{name}</h2>
						<div>
							<DisplayKeys boxKeyPair={data} />
						</div>
					</div>
				))}
			</div>

			<h2 class="text-xl font-bold mt-4">Use case</h2>
			<p class="whitespace-pre-line mt-1 bg-gray-100 p-2 font-sans rounded-md">
				If you want to securly transfer data between client and server, you can
				use this key pair to encrypt and decrypt data.{"\n"}
				If the payload is encrypted using client's public key, it can only be
				decrypted using client's private key.{"\n"}
				So, even if a person opens network tab and sees the payload, it will be
				encrypted and can't be decrypted without private key.
			</p>
			<p class="text-sm code mt-4">
				TweetNaCl is a compact and portable cryptographic library, designed as a
				minimal implementation of Daniel J. Bernstein's NaCl (Networking and
				Cryptography library).
				<br /> True to its name, the entire library can fit within 100 tweets
				(hence "Tweet" NaCl), making it one of the smallest secure cryptographic
				libraries available.
			</p>
		</div>
	);
});
