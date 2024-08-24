import { component$, useSignal, useTask$ } from "@builder.io/qwik";

enum Role {
  System = "system",
  User = "user",
  Assistant = "assistant",
}
interface Message {
  role: Role;
  content: string;
}

export default component$(() => {
  const token = useSignal<string>("");
  const messages = useSignal<Message[]>([
    {
      role: Role.System,
      content: "Welcome to the ChatGPT Experiment!",
    },
  ]);
  useTask$(({ track }) => {
    track(() => messages.value);
    if (messages.value.length > 1) {
      localStorage.setItem("openapi-token", token.value);
    }
  });
  useTask$(async () => {
    await fetch("https://api.openai.com/v1/engines/davinci/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        prompt: "This is a test",
        max_tokens: 5,
        temperature: 0.9,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
        stop: ["\n"],
      }),
    });
  });
  return (
    <div>
      <h1 class="text-4xl font-bold">Chat GPT Experiment</h1>
      <div class="flex gap-2">
        <button
          class="border rounded-md p-2 bg-gray-100 hover:bg-gray-200"
          onClick$={() => {
            messages.value = [
              ...messages.value,
              { role: Role.User, content: "" },
            ];
          }}
        >
          Add User Message
        </button>
        <input
          placeholder="Enter your API token"
          type="text"
          bind:value={token}
          class="text-gray-500 border rounded-md p-2 grow"
        />
      </div>
      <div class="flex flex-col">
        {messages.value.map((message, index) => (
          <div key={index} class="flex flex-col border-b p-2 gap-1">
            <div>
              <select
                value={message.role}
                onInput$={(e) => {
                  const updatedRole = (e.target as HTMLSelectElement)
                    .value as Role;
                  messages.value = messages.value.map((m, i) =>
                    index === i ? { ...m, role: updatedRole } : m
                  );
                }}
                class="text-gray-500 p-2 border border-gray-300 rounded-md"
              >
                {Object.values(Role).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              class="text-gray-500 border rounded-md p-2 grow"
              onInput$={(e) => {
                const updatedContent = (e.target as HTMLTextAreaElement).value;
                messages.value = messages.value.map((m, i) =>
                  index === i ? { ...m, content: updatedContent } : m
                );
              }}
              value={message.content}
            ></textarea>
          </div>
        ))}
      </div>
    </div>
  );
});
