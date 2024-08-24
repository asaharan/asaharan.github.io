import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const isExtended = useSignal<boolean>();
  const screensharePermission = useSignal<boolean>();
  const numberOfScreens = useSignal<number>();
  const displays = useSignal<any[]>();
  const handleClick = $(async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.permissions.query({
          name: "window-management",
        });
        isExtended.value = (window.screen as any).isExtended;
        const screenDetails = await window.getScreenDetails();
        screensharePermission.value = true;
        numberOfScreens.value = screenDetails.screens.length;
        displays.value = screenDetails.screens.map((screen) => {
          return {
            label: screen.label,
            isInternal: screen.isInternal,
            isPrimary: screen.isPrimary,
            isExtended: screen.isExtended,
            avaiWidth: screen.availWidth,
            avaiHeight: screen.availHeight,
            width: screen.width,
            height: screen.height,
          };
        });
        console.log("Permission granted");
        console.log(screenDetails);
      }
    } catch (err) {
      screensharePermission.value = false;
      console.error("Permission denied", err);
    }
  });
  return (
    <div>
      <div>
        <p>
          MDN Reference:{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window_Management_API"
            target="_blank"
            class="text-blue-500 underline"
          >
            Window Management API
          </a>
        </p>
      </div>
      <h1 class="text-3xl">Window Management API testing</h1>
      <div>
        Browser is in extended display?{isExtended.value ? "Yes" : "No"}
      </div>
      <div>
        Screen Details permission:{" "}
        {typeof screensharePermission.value === "undefined"
          ? "Not asked"
          : screensharePermission.value
          ? "Permission Granted"
          : "Permission Denied"}
      </div>
      <div>
        No. Of screens:
        {screensharePermission.value ? numberOfScreens.value : "NA"}
      </div>
      <button
        class="border border-blue-500 text-blue-500 rounded-md px-4 py-2 m-2"
        onClick$={handleClick}
      >
        Get permission
      </button>
      <div class="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3">
        {displays.value?.map((display, index) => {
          return (
            <div key={index} class="border border-gray-500 rounded-md p-2 m-2">
              <div class="text-2xl font-semibold">{display.label}</div>
              <div>Internal: {display.isInternal ? "true" : "false"}</div>
              <div>Primary: {display.isPrimary ? "true" : "false"}</div>
              <div>Extended: {display.isExtended ? "true" : "false"}</div>
              {[
                {
                  label: "Available Width",
                  value: display.avaiWidth,
                },
                {
                  label: "Available Height",
                  value: display.avaiHeight,
                },
                {
                  label: "Width",
                  value: display.width,
                },
                {
                  label: "Height",
                  value: display.height,
                },
              ].map((item, index) => {
                return (
                  <div key={index}>
                    {item.label}: {item.value}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Window Management API",
  meta: [
    {
      name: "description",
      content:
        "This page demonstrates the usage of the Window Management API in modern browsers. Learn how to request permissions, enumerate displays, and access detailed screen information for better window management and multi-screen setups.",
    },
  ],
};
