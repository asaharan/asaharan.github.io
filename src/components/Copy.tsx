import { component$, useSignal, $ } from "@builder.io/qwik";
import {
	MatCheckOutlined,
	MatContentCopyOutlined,
} from "@qwikest/icons/material";
import clsx from "clsx";

interface CopyButtonProps {
	content: string;
	class: string;
}

export const CopyButton = component$<CopyButtonProps>(
	({ content, class: className }) => {
		const isCopied = useSignal(false);

		const copyToClipboard = $(async () => {
			try {
				await navigator.clipboard.writeText(content);
				isCopied.value = true;

				setTimeout(() => {
					isCopied.value = false;
				}, 2000);
			} catch (err) {
				console.error("Failed to copy text:", err);
			}
		});

		return (
			<button
				onClick$={copyToClipboard}
				class={clsx(
					"inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 gap-1",
					"bg-primary-500 text-white hover:bg-primary-700",
					className,
				)}
				type="button"
			>
				{isCopied.value ? (
					<>
						<MatCheckOutlined />
						Copied!
					</>
				) : (
					<>
						<MatContentCopyOutlined />
						Copy
					</>
				)}
			</button>
		);
	},
);
