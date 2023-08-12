import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import bcrypt from "bcryptjs";


export default component$(() => {
    const rounds = useSignal("8");
    const password = useSignal<string>("");
    const hash = useSignal<string>("");
    const timeSpent = useSignal(0);
    const seconds = Math.floor(timeSpent.value / 1000);
    const milliseconds = timeSpent.value % 1000;
    const isProcessing = useSignal(false);
  useVisibleTask$(async ({ track }) => {
      track(() => rounds.value);
      track(() => password.value);
      if (password.value.length > 0) {
          isProcessing.value = true;
        const numRounds = parseInt(rounds.value);
          if (numRounds > 0 && !Number.isNaN(numRounds)) {
            const timestamp = Date.now();
            hash.value = await bcrypt.hash(password.value, bcrypt.genSaltSync(numRounds))
              const elapsed = Date.now() - timestamp;
              timeSpent.value = elapsed;
              isProcessing.value = false;
        }
      }
  });
  return (
    <div>
      <h1 class="text-4xl font-bold">Bcrypt Hash Generator</h1>
      <div class="text-xl font-bold">Rounds</div>
      <input class='border' bind:value={rounds} type='number'/>
      <div class="text-xl font-bold">Password</div>
      <input class='border' bind:value={password} type='text' placeholder="Your strong password" />
          <div class="text-xl font-bold">Hash { isProcessing.value?'...':''}</div>
      <input class='border' bind:value={hash} type='text' readOnly placeholder="Has will be shown here" />
      <div class="text-xl font-bold">Time spent</div>
      <div>{seconds ? `${seconds} sec `:'' }{milliseconds} milliseconds</div>
    </div>
  );
});
