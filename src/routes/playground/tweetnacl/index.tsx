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
        <span>Public Key:</span>
        <DisplayKey k={boxKeyPair.publicKey} />
      </div>
      <div>
        <span>Private Key:</span>
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
      <h1>TweetNaCl</h1>
      <button
        onClick$={handleGenerateKeyPair}
        class="b-1 p-1 m-1 rounded bg-blue-500 text-white"
      >
        Generate Key Pair TweetNaCl
      </button>
      <div>
        <div>
          <h2>Client</h2>
          <div class="pl-2">
            <DisplayKeys boxKeyPair={store.client} />
          </div>
          <h2>Server</h2>
          <div class="pl-2">
            <DisplayKeys boxKeyPair={store.server} />
          </div>
        </div>
      </div>
    </div>
  );
});
