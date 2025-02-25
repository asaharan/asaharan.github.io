import { component$, useStore } from "@builder.io/qwik";
import { LanguageSelector } from "../LanguageSelector";
import { TopbarLink } from "./TopbarLink";
import clsx from "clsx";
import MenuIcon from "./menu.svg";

const links = [
	{
		text: "Home",
		href: "/",
	},
	{
		text: "Playground",
		href: "/playground",
	},
	{
		text: "String tools",
		href: "/playground/string-tools",
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
	},
	{
		text: "Prepleaf",
		href: "https://prepleaf.com",
		isExternal: true,
	},
	{
		text: "Masai School",
		href: "https://www.masaischool.com",
		isExternal: true,
	},

	{
		text: "College Profile",
		href: "https://home.iitk.ac.in/~amitkum",
		isExternal: true,
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
							{links.map((link, index) => (
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
							))}
						</div>
					</div>
				</div>

				<div class="md:flex hidden group/nav">
					{links.map((link, index) => (
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
					))}
				</div>
				<div class="flex">
					<LanguageSelector />
				</div>
			</div>
		</div>
	);
});
