import {
  $,
  type NoSerialize,
  component$,
  noSerialize,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

export default component$(() => {
  const state = useStore({
    isRecording: false,
    recordedVideoURL: null as string | null,
    mediaStream: null as NoSerialize<MediaStream> | null,
    mediaRecorder: null as NoSerialize<MediaRecorder> | null,
    chunks: [] as NoSerialize<Blob>[],
  });

  const videoRef = useSignal<HTMLVideoElement | null>(null);

  const startScreenShare = $(async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          sampleRate: 44100,
          channelCount: 2,
        },
      });
      // const audioStream = await navigator.mediaDevices.getUserMedia({
      //   audio: {
      //     echoCancellation: true,
      //     noiseSuppression: true,
      //     sampleRate: 44100,
      //   },
      // });
      const tracks = [...displayStream.getTracks()]; // ...audioStream.getTracks()];
      const stream = new MediaStream(tracks);
      for (const track of stream.getTracks()) {
        console.log(track.kind);
      }
      state.mediaStream = noSerialize(stream);
      const mediaRecorder = new MediaRecorder(stream);
      state.mediaRecorder = noSerialize(mediaRecorder);

      if (videoRef.value) {
        videoRef.value.srcObject = stream;
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          state.chunks = [...state.chunks, noSerialize(event.data)];
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(
          state.chunks.filter((c) => !!c),
          { type: "video/webm" }
        );
        state.recordedVideoURL = URL.createObjectURL(blob);
        state.chunks = [];
        state.isRecording = false;
      };

      mediaRecorder.start();
      state.isRecording = true;
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  });

  const stopRecording = $(() => {
    if (state.mediaRecorder) {
      state.mediaRecorder.stop();
    }
    if (state.mediaStream) {
      for (const track of state.mediaStream.getTracks()) {
        track.stop();
      }
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    cleanup(() => {
      if (state.mediaStream) {
        for (const track of state.mediaStream.getTracks()) {
          track.stop();
        }
      }
      if (state.recordedVideoURL) {
        URL.revokeObjectURL(state.recordedVideoURL);
      }
    });
  });

  return (
    <div>
      {!state.isRecording && !state.recordedVideoURL && (
        <button type="button" onClick$={startScreenShare}>
          Start Screen Share and Recording
        </button>
      )}

      {state.isRecording && (
        <div>
          <video ref={videoRef} autoPlay muted />
          <button type="button" onClick$={stopRecording}>
            Stop Recording
          </button>
        </div>
      )}

      {state.recordedVideoURL && (
        <div>
          <video src={state.recordedVideoURL} controls>
            <track kind="captions" />
          </video>
          <a href={state.recordedVideoURL} download="screen-recording.webm">
            Download Recording
          </a>
        </div>
      )}
    </div>
  );
});
