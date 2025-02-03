import { component$, useSignal, $ } from "@builder.io/qwik";
import {
	MatCheckOutlined,
	MatContentCopyOutlined,
} from "@qwikest/icons/material";
import clsx from "clsx";

interface CopyButtonProps {
	content: string;
	class?: string;
	size?: "sm" | "md" | "lg";
	variant?: "primary" | "secondary";
}

export const CopyButton = component$<CopyButtonProps>(
	({ content, class: className, size, variant }) => {
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
					"inline-flex items-center rounded-md font-medium transition-colors duration-200 gap-1",
					// Size variations
					{
						"px-2 py-1 text-xs": size === "sm",
						"px-4 py-2 text-sm": size === "md",
						"px-6 py-3 text-base": size === "lg",
					},
					// Variant variations
					{
						"bg-primary-500 text-white hover:bg-primary-700":
							variant === "primary",
						"bg-gray-200 text-gray-900 hover:bg-gray-300":
							variant === "secondary",
					},
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
