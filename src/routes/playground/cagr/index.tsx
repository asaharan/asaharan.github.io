import { component$, useSignal } from "@builder.io/qwik";

export default component$(function Cagr() {
  const entries = useSignal([]);
  return (
    <div>
      <h1>CAGR Calculator</h1>
      <div>{entries.value.map((entry, index) => {})}</div>
    </div>
  );
});
