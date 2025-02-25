import { type JSXOutput, component$, useComputed$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
	type PlaygroundPageItem,
	playgroundItemGroups,
} from "~/data/tools.config";
import Card from "./Card";

interface ToolCardProps {
	title: string;
	description: string;
	path: string;
	icon?: JSXOutput;
	category?: string;
	isExternal?: boolean;
}

const ToolCard = component$(
	({ title, path, icon, category, isExternal }: ToolCardProps) => {
		return (
			<Card>
				<>
					<Link target={isExternal ? "_blank" : undefined} href={path}>
						<span class="inline-flex justify-start items-start gap-2  text-blue-500 text-xl font-medium">
							<span class="text-2xl mr-1">{icon}</span>
							<p class="uppercase tracking-wide">{title}</p>
						</span>
					</Link>
					<span class="block text-sm text-gray-500">{category}</span>
				</>
			</Card>
		);
	},
);

interface PlaygroundItemGroupProps {
	tags?: string[];
	titleRemapping?: Record<string, string>;
	lightHeading?: boolean;
	categories?: string[];
}

export const PlaygroundItemGroups = component$(
	(props: PlaygroundItemGroupProps) => {
		const filteredPlaygroundItemGroups = useComputed$(() => {
			return playgroundItemGroups
				.filter(([title, pages]) => {
					// on playground page show all items
					if (!props.tags && !props.categories) return true;
					// hide legacy items from non playground pages
					if (title === 'Legacy') return false;
					if (props.categories) {
						return props.categories.some((category) => {
							return pages.some((page) => page.category === category);
						});
					}
					return props.tags?.some((tag) => {
						return pages.some((page) => page.tags?.includes(tag))
					}
					);
				})
				.map(([title, pages]) => {
					const t: [string, PlaygroundPageItem[]] = [
						title,
						pages.filter((page) => {
							if (!props.tags && !props.categories) return true;
							if (props.categories) {
								return props.categories.some((category) => {
									return page.category === category;
								});
							}
							if (!props.tags) {
								return true;
							}
							return props.tags.some((tag) => page.tags?.includes(tag) || page.category === tag);
						}),
					];
					return t;
				});
		});
		return (
			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-4">
					{filteredPlaygroundItemGroups.value.map(([_title, pages]) => {
						const title = props.titleRemapping?.[_title] || _title;
						return (
							<div key={title}>
								<h3 class={["text-2xl mb-3", {
									"font-bold": !props.lightHeading,
									"font-medium text-gray-600": props.lightHeading,
								}]}>{title}</h3>
								<div class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{pages.map((page) => {
										const C = page.icon;
										return (
											<ToolCard
												key={page.path}
												path={page.path}
												title={page.title}
												description={page.description}
												icon={C ? <C /> : undefined}
												category={page.category}
												isExternal={page.isExternal}
											/>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
);
