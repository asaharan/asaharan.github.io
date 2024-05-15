import { $, component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const isExtended = useSignal<boolean>();
  const screensharePermission = useSignal<boolean>();
  const numberOfScreens = useSignal<number>();
  const handleClick = $(async () => {
    try {
      if (typeof window !== "undefined") {
        await (navigator.permissions.query as any)({
          name: "window-management",
        });
        isExtended.value = (window.screen as any).isExtended;
        const screenDetails = await (window as any).getScreenDetails();
        screensharePermission.value = true;
        numberOfScreens.value = screenDetails.screens.length;
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
      <h1>Browser: Window Management API testing</h1>
      <div>window.screen.isExtended: {isExtended.value ? "true" : "false"}</div>
      <div>
        Screen Details:{" "}
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
    </div>
  );
});
