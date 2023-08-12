import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { encode } from 'gpt-tokenizer'

const GPTTokenCounter = component$(() => {
    const text= useSignal<string>('');
    const tokensCount = useSignal<number>(0);
    useTask$( ({track}) => {
        track(() => text.value);
        const tokens = encode(text.value)
        tokensCount.value =tokens.length ;
        
    });
    return (
        <div>
            <textarea class='w-full h-52 border p-2' placeholder="enter your text here" bind:value={text}/>            
            <div>
                <span>Number of tokens: </span>
                <span>{tokensCount.value}</span>
            </div>
        </div>
    );
})

export default GPTTokenCounter;