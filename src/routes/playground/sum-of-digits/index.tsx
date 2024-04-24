import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

function getDigitSum(num: number) {
  if (num < 10) {
    return num;
  }
  const sum: number = (num % 10) + getDigitSum(Math.floor(num / 10));
  if (sum > 9) {
    return getDigitSum(sum);
  }
  return sum;
}

function getNumberBetweenRangeWithDigitSum(
  fromRaw: number,
  tillRaw: number,
  digitSum: number
) {
  const from = fromRaw <= tillRaw ? fromRaw : tillRaw;
  const till = fromRaw <= tillRaw ? tillRaw : fromRaw;
  const solutions = [];
  for (let i = from; i <= till; i += 1) {
    if (getDigitSum(i) === digitSum) {
      solutions.push(i);
    }
  }
  return solutions;
}

function compute(from: number, till: number, sum: number) {
  if (isNaN(from) && isNaN(till)) {
    return;
  }
  let digits: (number | string)[] = [];
  let statement = "";
  if (isNaN(from) || isNaN(till)) {
    const fixedNumber = isNaN(from) ? till : from;
    const digitSum = getDigitSum(fixedNumber);
    statement = "Does sum of digits of " + fixedNumber + " equals " + sum + "?";
    if (digitSum === sum) {
      digits = ["Yes"];
    }
  } else {
    digits = getNumberBetweenRangeWithDigitSum(from, till, sum);
    statement =
      "Numbers between " +
      from +
      " and " +
      till +
      " which have sum of digits equal to " +
      sum;
  }
  return { digits, statement };
}

/**
 * @description Find numbers between two numbers which have sum of digits equal to a given number.
 */
export default component$(() => {
  const from = useSignal("0");
  const till = useSignal("200");
  const sum = useSignal("9");
  const output = useComputed$(() => {
    return compute(Number(from.value), Number(till.value), Number(sum.value));
  });
  return (
    <div class="mainBody">
      <h3 class="text-xl text-black font-semibold">
        Count numbers between two numbers which have sum of digits equal to a
        given number
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="col">
          <label>From</label>
          <input
            autoFocus
            type="number"
            bind:value={from}
            class="border-2 border-gray-300 rounded-md p-2 w-full"
            placeholder="From"
          />
        </div>
        <div class="col">
          <label>Till</label>
          <input
            type="number"
            bind:value={till}
            class="border-2 border-gray-300 rounded-md p-2 w-full"
            placeholder="Till"
          />
        </div>
        <div class="col">
          <label>Sum</label>
          <input
            type="number"
            bind:value={sum}
            min={1}
            max={9}
            class="border-2 border-gray-300 rounded-md p-2 w-full"
            placeholder="Sum"
          />
        </div>
      </div>
      <div class="divider mt-2"></div>
      <div class="title">{output.value?.statement}</div>
      <div class="border-2 border-gray-300 rounded-md p-2 w-full min-h-[200px]">
        {output.value?.digits.map((digit, index) => (
          <div key={index}>{digit}</div>
        ))}
      </div>
    </div>
  );
});

export const getMeta = (): DocumentHead => ({
  title:
    "Find numbers between two numbers which have sum of digits equal to a given number",
  meta: [
    {
      name: "description",
      content:
        "Find numbers between two numbers which have sum of digits equal to a given number",
    },
  ],
});
