import { component$, useTask$, $ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

interface Trade {
  date: string;
  type: "buy" | "sell";
  amount: number;
}

interface Props {
  entries: Signal<Trade[]>;
  onChange: (entries: Trade[]) => void;
}

/**
 * @description Component for taking in trades and displaying them
 */
const Trades = component$(({ entries, onChange }: Props) => {
  const c = $(onChange);
  const add = $(() => {
    const newEntries = [...entries.value];
    newEntries.push({
      date: new Date().toISOString(),
      type: "buy",
      amount: 0,
    });
    c(newEntries);
  });
  return (
    <div>
      <h1>Enter Trades</h1>
      <div>{entries.value.map((entry, index) => {})}</div>
      <div>
        <button onClick$={() => add()}>Add Trade</button>
      </div>
    </div>
  );
});

const Trade = component$(
  ({
    entry,
    onChange,
  }: {
    entry: Signal<Trade>;
    onChange: (entry: Trade) => void;
  }) => {
    const c = $(onChange);
    const update = $(() => {
      c(entry);
    });
    return (
      <div>
        <input
          type="date"
          value={entry.value.date}
          onChange$={(e) => c({ ...entry.value, date: e.target.value })}
        />
        <select
          value={entry.value.type}
          onChange$={(e) =>
            c({ ...entry, type: e.target.value as "buy" | "sell" })
          }
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          type="number"
          value={entry.value.amount}
          onChange$={(e) => c({ ...entry, amount: +e.target.value })}
        />
        <button onClick$={() => update()}>Update</button>
      </div>
    );
  }
);

export default Trades;
