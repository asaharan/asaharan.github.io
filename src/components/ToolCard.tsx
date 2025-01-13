import { type JSXOutput, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface ToolCardProps {
	title: string;
	description: string;
	path: string;
	icon?: JSXOutput;
	category?: string;
}

export const ToolCard = component$(
	({ title, path, icon, category }: ToolCardProps) => {
		return (
			<div class="bg-white rounded-lg border border-transparent relative p-[1px]">
				<div class="absolute z-20 left-0 top-0 w-full h-full rounded-lg border border-black" />
				<div class="absolute z-10 left-1 top-1 w-full h-full bg-red-400 rounded-lg" />
				<div class="p-4 z-20 relative bg-white rounded-lg border border-transparent h-full flex flex-col justify-between">
					<Link href={path}>
						<span class="inline-flex justify-start items-start gap-2  text-blue-500 text-xl font-medium">
							<span class="text-2xl mr-1">{icon}</span>
							<p class="uppercase tracking-wide">{title}</p>
						</span>
					</Link>
					<span class="block text-sm text-gray-500">{category}</span>
				</div>
			</div>
		);
	},
);
