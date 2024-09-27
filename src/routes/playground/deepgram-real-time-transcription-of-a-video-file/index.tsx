import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { DeepgramRealTimeTranscription } from "~/components/DeepgramRealTimeTranscription";

const TranscriptionApp = component$(() => {
  const apiKey = useSignal("");
  return (
    <div>
      <input type="text" bind:value={apiKey} placeholder="Enter API Key" />
      {apiKey.value && <DeepgramRealTimeTranscription apiKey={apiKey} />}
    </div>
  );
});
export default TranscriptionApp;

export const head: DocumentHead = {
  title: "Deepgram Real-time transcription for Video File",
  meta: [
    {
      name: "description",
      content:
        "Upload a video file and get real-time transcription using Deepgram",
    },
  ],
};
