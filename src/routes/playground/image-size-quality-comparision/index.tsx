import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

const description = `This page is designed to capture and display screenshots from the user's screen. It allows the user to share their screen, capture a screenshot of the current display, and then view or close the captured images. The captured images are processed in various formats, qualities, and sizes, and are organized for display based on their dimensions. Users can interact with the screen captures by clicking on them to view an enlarged version or close them.
You can compare the quality and size of the images captured in different formats and sizes.`;
export default component$(() => {
  const videoRef = useSignal<HTMLVideoElement | undefined>();
  const selectedImageSrc = useSignal<string | null>(null);
  const images = useStore({
    list: [] as {
      src: string;
      type: string;
      quality: number;
      size: number;
      width: number;
      height: number;
    }[],
  });

  const captureScreen = $(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (videoRef.value) {
        videoRef.value.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  });

  const captureImage = $(async () => {
    if (!videoRef.value) return;

    const canvas = document.createElement("canvas");
    const video = videoRef.value;
    const stream: MediaStream = video.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings();

    canvas.width = settings.width || video.videoWidth;
    canvas.height = settings.height || video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const types = ["image/jpeg", "image/png", "image/webp"];
    const qualities = [1, 0.75, 0.5, 0.25, 0.1, 0.05, 0];
    const sizes = [1, 0.75, 0.5];

    types.forEach((type) => {
      qualities.forEach((quality) => {
        sizes.forEach((size) => {
          const width = canvas.width * size;
          const height = canvas.height * size;
          const resizedCanvas = document.createElement("canvas");
          resizedCanvas.width = width;
          resizedCanvas.height = height;
          const resizedCtx = resizedCanvas.getContext("2d");
          resizedCtx?.drawImage(canvas, 0, 0, width, height);
          resizedCanvas.toBlob(
            (blob) => {
              if (blob) {
                const src = URL.createObjectURL(blob);
                images.list.push({
                  src,
                  type,
                  quality,
                  size: blob.size / 1024, // size in KB
                  width,
                  height,
                });
              }
            },
            type,
            quality
          );
        });
      });
    });
  });

  const groups = useComputed$(() => {
    const grouped = new Map<
      string,
      Array<{
        src: string;
        type: string;
        quality: number;
        size: number;
        width: number;
        height: number;
      }>
    >();

    images.list.forEach(({ src, type, quality, size, width, height }) => {
      const dimension = `${width}x${height}`;
      if (!grouped.has(dimension)) {
        grouped.set(dimension, []);
      }
      grouped.get(dimension)?.push({ src, type, quality, size, width, height });
    });

    return grouped;
  });

  return (
    <div>
      <h1 class="text-3xl font-semibold">Screen Sharing and Experiments</h1>
      <p class="mb-2">{description}</p>
      {selectedImageSrc.value && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
          onClick$={() => (selectedImageSrc.value = null)}
        >
          <div
            style={{
              position: "relative",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick$={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick$={() => {
                selectedImageSrc.value = null;
              }}
            >
              Close
            </button>
            <img
              src={selectedImageSrc.value}
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
              alt="Selected"
              width="100"
              height={"100"}
            />
          </div>
        </div>
      )}
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick$={captureScreen}
      >
        Share Screen
      </button>
      <video ref={videoRef} autoplay style={{ maxWidth: "400px" }} />
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick$={captureImage}
      >
        Capture Screenshot
      </button>
      <div class="flex flex-col gap-8">
        {Array.from(groups.value.entries()).map(([dimension, items]) => (
          <div key={dimension}>
            <h3 class="text-4xl">{dimension}</h3>
            <div class="grid grid-col-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {items
                .sort((a, b) => b.size - a.size)
                .map(({ src, type, quality, size, width, height }) => (
                  <figure key={`${quality}-${size}-${width}-${height}`}>
                    <img
                      width={200}
                      height={200}
                      src={src}
                      alt={`${width}x${height}`}
                      style={{ maxWidth: "100%" }}
                    />
                    <button
                      onClick$={() => (selectedImageSrc.value = src)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                      class="bg-gray-50 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                      Show
                    </button>
                    <figcaption>
                      <span
                        class={`${
                          type === "image/webp"
                            ? "bg-green-400"
                            : type === "image/jpeg"
                            ? "bg-indigo-400"
                            : "bg-red-400"
                        } text-white`}
                      >
                        {type.split("/")[1]}
                      </span>
                      , Quality: {quality}, Size: {size.toFixed(2)} KB
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Screen Capture",
  meta: [
    {
      name: "description",
      content: description.split(".")[0],
    },
  ],
};
