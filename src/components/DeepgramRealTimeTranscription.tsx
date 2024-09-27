import type { Signal } from "@builder.io/qwik";
import { component$, useStore, useSignal, $ } from "@builder.io/qwik";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

export const DeepgramRealTimeTranscription = component$(
  ({ apiKey }: { apiKey: Signal<string> }) => {
    const store = useStore({
      transcription: "",
      isTranscribing: false,
    });
    const fileInputSignal = useSignal<HTMLInputElement>();

    // Create audio element from video file
    const createAudioFromFile = $(async (file: File) => {
      return new Promise<HTMLAudioElement>((resolve, reject) => {
        const audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.crossOrigin = "anonymous";

        audio.oncanplaythrough = () => {
          resolve(audio);
          audio.play();
        };

        audio.onerror = (error) => {
          reject("Error processing file: " + error.message);
        };
      });
    });
    // Function to extract audio from video and stream to Deepgram
    const startTranscription = $(async (file: File) => {
      const deepgram = createClient(apiKey.value);
      const live = deepgram.listen.live({
        model: "nova-2",
        vad_events: true,
        interim_results: true,
      });
      const audioContext = new AudioContext();
      console.log("live starting");
      live.on(LiveTranscriptionEvents.Open, async () => {
        console.log("live started");
        live.on(LiveTranscriptionEvents.Unhandled, (e) => {
          console.log("Unhandled: ", e);
        });
        live.on(LiveTranscriptionEvents.SpeechStarted, (e) => console.log(e));
        live.on(LiveTranscriptionEvents.Transcript, (transcription) => {
          console.log("Transcription: ", transcription);
        });
        live.on(LiveTranscriptionEvents.Metadata, console.log);
        live.on(LiveTranscriptionEvents.Error, console.error);
        // Load the AudioWorklet processor script
        await audioContext.audioWorklet.addModule(
          URL.createObjectURL(
            new Blob([audioProcessorScript], { type: "application/javascript" })
          )
        );

        // Create AudioWorkletNode to process audio data
        const audioWorkletNode = new AudioWorkletNode(
          audioContext,
          "audio-processor"
        );

        // Create a MediaElementSource from the video/audio file
        const audioElement = await createAudioFromFile(file);
        const mediaSource = audioContext.createMediaElementSource(audioElement);

        // Connect the source to the worklet processor and the destination (speakers)
        mediaSource.connect(audioWorkletNode);
        audioWorkletNode.connect(audioContext.destination);
        setTimeout(() => {
          live.finalize();
        }, 10000);

        // Handle the audio processing in chunks
        audioWorkletNode.port.onmessage = (event) => {
          console.log("adding data");
          live.send(event.data);
          // const audioChunk = event.data;
          // if (socket.readyState === WebSocket.OPEN) {
          // socket.send(audioChunk);
          // }
        };
      });
      return () => {
        console.log("live closing");
        audioContext.close();
        // socket.close();
      };
    });
    // Handle file input and start transcription
    const handleFileChange = $(async () => {
      const file = fileInputSignal.value?.files?.[0];
      if (file) {
        store.isTranscribing = true;
        await startTranscription(file);
      }
    });

    return (
      <div class="App">
        <h1>Deepgram Real-Time Video Transcription</h1>
        <p>API Key: {apiKey}</p>
        <input
          type="file"
          accept="audio/*"
          ref={fileInputSignal}
          onChange$={handleFileChange}
          disabled={store.isTranscribing}
        />

        <div>
          <h2>Transcription</h2>
          <p>{store.transcription}</p>
        </div>
      </div>
    );
  }
);

// AudioWorkletProcessor script
const audioProcessorScript = `
  class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.chunkSize = 4096; // Define chunk size
    }

    process(inputs, outputs, parameters) {
      const input = inputs[0];
      if (input) {
        const channelData = input[0]; // Get audio data from the first channel
        if (input && input.length > 0 && input[0]) {
          this.port.postMessage(channelData.buffer); // Send data to the main thread
        }
      }
      return true; // Keep processor alive
    }
  }

  registerProcessor('audio-processor', AudioProcessor);
`;
