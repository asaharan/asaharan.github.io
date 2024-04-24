import { component$, useSignal } from "@builder.io/qwik";

const ArrayIndex = component$(() => {
    const input = useSignal("");
    return <div>
        <textarea class='w-full border h-28' placeholder="Enter your text here" bind:value={input} />
        <div class='flex flex-wrap gap-1'>
            {input.value.split('').map((char, index) => <span key={index}>
                <div class={['flex flex-col w-10 whitespace-pre', {
                    'bg-red-200': index % 2 === 0,
                }]}>
                    <div>{char}</div>
                    <div>{index}</div>
                </div>
            </span>)}
        </div>
    </div>
})

export default ArrayIndex;