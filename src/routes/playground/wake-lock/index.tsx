import {
  $,
  type NoSerialize,
  component$,
  noSerialize,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const ScreenWakeLock = component$(() => {
  const wakeLock = useSignal<NoSerialize<WakeLockSentinel> | null>(null);
  const isActive = useSignal(false);

  // Function to request wake lock
  const requestWakeLock = $(async () => {
    if (typeof navigator !== "undefined" && "wakeLock" in navigator) {
      try {
        const lock = await navigator.wakeLock.request("screen");
        wakeLock.value = noSerialize(lock);
        isActive.value = true;
        console.log("Wake Lock is active");
      } catch (err) {
        console.error(`Failed to request wake lock: ${err}`);
      }
    }
  });

  // Function to release wake lock
  const releaseWakeLock = $(() => {
    if (wakeLock.value) {
      wakeLock.value.release();
      wakeLock.value = null;
      isActive.value = false;
      console.log("Wake Lock is released");
    }
  });

  // Use useVisibleTask$ to ensure this runs only on the client-side
  useTask$(() => {
    // Check if the Wake Lock API is supported
    if (typeof navigator !== "undefined" && "wakeLock" in navigator) {
      // Add event listener for visibility change
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          requestWakeLock();
        } else {
          releaseWakeLock();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Initial request for wake lock
      requestWakeLock();

      // Cleanup function
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        releaseWakeLock();
      };
    }
    console.warn("Wake Lock API is not supported in this browser");
  });

  return (
    <div>
      <h2 class="text-">Screen Wake Lock</h2>
      <p
        class={`text-lg ${isActive.value ? "text-green-500" : "text-red-500"}`}
      >
        Status: {isActive.value ? "Active" : "Inactive"}
      </p>
      <div class="flex gap-2">
        <button
          type="button"
          onClick$={requestWakeLock}
          disabled={isActive.value}
          class={`${
            isActive.value
              ? "bg-gray-200 text-gray-900"
              : "bg-blue-500 text-white"
          } hover:bg-blue-700 font-bold py-2 px-4 rounded`}
        >
          Activate Wake Lock
        </button>
        <button
          type="button"
          onClick$={releaseWakeLock}
          disabled={!isActive.value}
          class={`${
            isActive.value
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-900"
          } hover:bg-red-700 font-bold py-2 px-4 rounded`}
        >
          Release Wake Lock
        </button>
      </div>
    </div>
  );
});

export default ScreenWakeLock;

export const head: DocumentHead = {
  title: "Browser Screen Wake Lock",
  meta: [
    {
      name: "description",
      content:
        "Wake Lock API allows a web page to prevent the device from going to sleep.",
    },
  ],
};
