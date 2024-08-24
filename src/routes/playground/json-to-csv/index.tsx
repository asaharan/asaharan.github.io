import { $, component$, useComputed$, useSignal } from "@builder.io/qwik";
import Papa from "papaparse";

function transformArrayToObject(input: any, config: string[]) {
  const acc: any = {};
  return config.reduce((acc, key, index) => {
    acc[key] = input[index];
    return acc;
  }, acc);
}

type Config = { key: string; type: string; config: string[] };
function parseConfig(config: string): Config[] {
  const lines = config
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const parseSyntax = (line: string) => {
    const [key, value] = line.split(":");
    if (!key || !value) {
      throw new Error(`Invalid syntax: ${line}`);
    }
    if (value.startsWith("[")) {
      const values = value.slice(1, -1).split(",");
      return { key, type: "arrayToObject", config: values };
    } else {
      throw new Error(`Invalid syntax: ${line}`);
    }
  };
  return lines.map(parseSyntax);
}

function applyConfig(input: any, configs: Config[]) {
  return configs.reduce((input, config) => {
    if (config.type === "arrayToObject") {
      const transformedData = transformArrayToObject(
        input[config.key],
        config.config
      );
      return {
        ...input,
        ...transformedData,
        [config.key]: "transformed",
      };
    }
    return input;
  }, input);
}

export default component$(() => {
  const config = useSignal(
    "values:[Payin,Payout,c,Cash Balance,e,Equity,Mutual Funds]"
  );
  const jsonInput = useSignal(`[{"value":[1,2,3]},{"value":[2,3,4]}]`);
  const configArray = useComputed$(() => {
    if (!config.value) return [];
    try {
      return parseConfig(config.value);
    } catch (e) {
      return [];
    }
  });
  const csvString = useComputed$(() => {
    if (!jsonInput.value) return "";
    try {
      const json = JSON.parse(jsonInput.value);
      if (!Array.isArray(json)) {
        return "Not an array of objects";
      }
      const jsonWithConfig = json.map((j) => applyConfig(j, configArray.value));
      const csv = Papa.unparse(jsonWithConfig);
      return csv;
    } catch (e) {
      console.error(e);
      return "Invalid JSON";
    }
  });

  const download = $(() => {
    if (csvString.value) {
      const blob = new Blob([csvString.value], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  });
  return (
    <div>
      <h1 class="text-xl mb-4">JSON to CSV</h1>
      <textarea
        bind:value={config}
        class="w-full min-h-8 border p-2 mt-2 rounded-md"
        placeholder="Enter config"
      />
      <div class="mb-4">
        <label>Enter JSON</label>
        <textarea
          autoFocus
          class="w-full h-64 border mt-2 rounded-md"
          bind:value={jsonInput}
        />
      </div>
      <div>
        <label>CSV</label>
        <textarea
          value={csvString.value}
          readOnly
          class="w-full h-64 border mt-2 rounded-md"
        />
      </div>
      <div class="flex gap-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick$={() => {
            if (csvString.value) {
              navigator.clipboard.writeText(csvString.value);
            }
          }}
        >
          Copy
        </button>
        <button
          onClick$={download}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Download
        </button>
      </div>
    </div>
  );
});
