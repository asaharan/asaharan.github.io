import {
	type JSXNode,
	type SVGProps,
	component$,
	useStore,
	JSXOutput,
} from "@builder.io/qwik";
import { TopbarLink } from "./TopbarLink";
import clsx from "clsx";
import MenuIcon from "./menu.svg";
import allAboutMe from "~/lang/me";
import { SupportedLanguages } from "~/lang/me";

export interface ITopbarLink {
	text: string;
	href: string;
	isExternal?: boolean;
	isHidden?: boolean;
	icon?: "Home" | "Playground" | "Game" | "Tax" | "Text" | "Blog" | "Prepleaf";
}

const links: ITopbarLink[] = [
	{
		text: "Home",
		href: "/",
		icon: "Home",
	},
	{
		text: "Playground",
		href: "/playground",
		icon: "Playground",
	},
	{
		text: "Bit Bubble",
		href: "https://bit-bubble.saharan.me?utm_source=home-nav",
		icon: "Game",
	},
	{
		text: "Tax Calculator",
		href: "https://tax.saharan.me?utm_source=home-nav",
		icon: "Tax",
	},
	{
		text: "Text tools",
		href: "/playground/string-tools",
		icon: "Text",
	},
	{
		text: "JEE Ready",
		href: "https://jeeready.com",
		isExternal: true,
		isHidden: true,
	},
	{
		text: "Blog",
		href: "/blogs",
		icon: "Blog",
	},
	{
		text: "Prepleaf",
		href: "https://prepleaf.com",
		isExternal: true,
		isHidden: true,
	},
	{
		text: "Masai School",
		href: "https://www.masaischool.com",
		isExternal: true,
		isHidden: true,
	},
	{
		text: "College Profile",
		href: "https://home.iitk.ac.in/~amitkum",
		isExternal: true,
		isHidden: true,
	},
];

export const Topbar = component$(() => {
	const store = useStore({
		open: false,
		hoveredIndex: -1,
		lastHoveredIndex: -1,
	});
	return (
		<div class="shadow-sm h-12 fixed top-0 left-0 right-0 z-50 bg-white">
			<div class="container mx-auto flex justify-between align-middle h-12">
				<div class="md:hidden relative h-full">
					<button
						type="button"
						aria-label={store.open ? "Close Menu" : "Open Menu"}
						onclick$={() => {
							store.open = !store.open;
						}}
						class="focus:outline-none z-10 h-12 w-12 flex justify-center items-center"
					>
						<img
							src={MenuIcon}
							alt="Menu"
							class="h-6 w-6"
							height={24}
							width={24}
						/>
					</button>
					<div
						class={clsx(
							"fixed w-full bg-white rounded-md overflow-hidden shadow-xl z-20 transition-all duration-300",
							{
								"-left-full": !store.open,
								"left-0": !!store.open,
								"right-0": !!store.open,
							},
						)}
					>
						<div class="container mx-auto">
							{links.map((link, index) => {
								return (
									<TopbarLink
										onClick$={() => {
											store.open = false;
										}}
										key={link.href}
										{...link}
										index={index}
										hoveredIndex={store.hoveredIndex}
										lastHoveredIndex={store.lastHoveredIndex}
										onMouseEnter$={() => {
											// store.lastHoveredIndex = store.hoveredIndex;
											// store.hoveredIndex = index;
										}}
										onMouseLeave$={() => {
											// store.lastHoveredIndex = store.hoveredIndex;
											// store.hoveredIndex = -1;
										}}
									/>
								);
							})}
						</div>
					</div>
				</div>

				<div class="md:flex hidden group/nav">
					{links.map((link, index) => {
						return (
							<TopbarLink
								onClick$={() => {
									store.open = false;
								}}
								key={link.href}
								onMouseEnter$={() => {
									store.lastHoveredIndex = store.hoveredIndex;
									store.hoveredIndex = index;
								}}
								onMouseLeave$={() => {
									store.lastHoveredIndex = store.hoveredIndex;
									store.hoveredIndex = -1;
								}}
								hoveredIndex={store.hoveredIndex}
								lastHoveredIndex={store.lastHoveredIndex}
								index={index}
								{...link}
							/>
						);
					})}
				</div>
				<div class="flex items-center">
					{allAboutMe[SupportedLanguages.en].socialLinks.map((social) => {
						const iconSrc = social.icon;

						// Use local SVG files for specific social platforms
						return (
							<a
								key={social.name}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center mx-2 h-12"
								aria-label={social.name}
							>
								<img src={iconSrc} alt={social.name} width={22} height={22} />
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
});
