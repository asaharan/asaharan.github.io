import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import OpenAI from "openai";

export default component$(() => {
  const token = useSignal("");
  const message = useSignal("");
  const imageUrl = useSignal("");
  const isGenerating = useSignal(false);
  const isKeyVisible = useSignal(false);
  useVisibleTask$((track) => {
    track.track(() => token.value);
    if (token.value) {
      localStorage.setItem("dalle-token", token.value);
    } else {
      if (typeof window !== "undefined") {
        token.value = localStorage.getItem("dalle-token") || "";
      }
    }
  });
  const generateImage = $(async () => {
    isGenerating.value = true;
    imageUrl.value = "";
    try {
      const openai = new OpenAI({
        apiKey: token.value,
        dangerouslyAllowBrowser: true,
      });
      const res = await openai.images.generate({
        model: "dall-e-3",
        prompt: message.value,
        n: 1,
        size: "1024x1024",
      });
      const im = res.data[0].url;
      if (im) {
        imageUrl.value = im;
      }
      console.log("generating image");
    } catch (e) {
      console.error(e);
    }

    isGenerating.value = false;
  });
  return (
    <div>
      <div>
        <label class="block">GPT API Key</label>
        <button onClick$={() => (isKeyVisible.value = !isKeyVisible.value)}>
          {isKeyVisible.value ? "Hide" : "Show"}
        </button>
        <input
          class="border rounded-md p-2 w-full"
          type={isKeyVisible.value ? "text" : "password"}
          bind:value={token}
        />
      </div>
      <div>
        <label class="block ">Message</label>
        <textarea
          class="border w-full rounded-md p-2"
          placeholder="Enter your message"
          bind:value={message}
        ></textarea>
      </div>
      <button
        onClick$={generateImage}
        class="border rounded-md p-2 bg-gray-100 hover:bg-gray-200"
      >
        Generate Image
      </button>
      {imageUrl.value ? (
        <div>
          <img width="1024" height="1024" src={imageUrl.value} />
        </div>
      ) : isGenerating.value ? (
        <div>Generating Image...</div>
      ) : null}
    </div>
  );
});
