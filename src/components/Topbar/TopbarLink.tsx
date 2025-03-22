import type { JSXOutput, PropFunction } from "@builder.io/qwik";
import { component$, isServer, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ITopbarLink } from ".";
import {
	MatCodeOutlined,
	MatFeedOutlined,
	MatSportsEsportsOutlined,
	MatHomeOutlined,
	MatTextFormatOutlined,
	MatCurrencyRupeeOutlined,
} from "@qwikest/icons/material";

const iconsByName: {
	[key: string]: JSXOutput;
} = {
	Home: <MatHomeOutlined />,
	Playground: <MatCodeOutlined />,
	Blog: <MatFeedOutlined />,
	Tax: <MatCurrencyRupeeOutlined />,
	Game: <MatSportsEsportsOutlined />,
	Text: <MatTextFormatOutlined />,
};

function RenderIcon({ name }: { name: ITopbarLink["icon"] }) {
	if (typeof name === "undefined") return null;
	const icon = iconsByName[name];
	return icon;
}

interface TopbarLinkProps {
	onClick$: PropFunction<() => void>;
	onMouseEnter$: PropFunction<() => void>;
	onMouseLeave$: PropFunction<() => void>;
	hoveredIndex: number;
	lastHoveredIndex: number;
	index: number;
}
function getHoverState(hoveredIndex: number, index: number) {
	const isHovered = hoveredIndex === index;
	return isHovered;
}
function getDirection(
	isHovered: boolean,
	hoveredIndex: number,
	lastHoveredIndex: number,
	index: number,
) {
	if (isHovered) {
		if (lastHoveredIndex <= index) return "left";
		return "right";
	}
	if (hoveredIndex > index) return "right";
	return "left";
}
export const TopbarLink = component$<TopbarLinkProps>(
	({
		text,
		href,
		onClick$,
		onMouseEnter$,
		onMouseLeave$,
		hoveredIndex,
		lastHoveredIndex,
		index,
		isHidden,
		icon,
	}) => {
		const isActive = useSignal(false);
		const dir = useSignal("left");

		useTask$(({ track, cleanup }) => {
			const isHovered = track(() => getHoverState(hoveredIndex, index));
			const direction = track(() =>
				getDirection(isHovered, hoveredIndex, lastHoveredIndex, index),
			);
			const update = () => {
				if (isHovered === false) {
					dir.value = direction;
					const timeoutId = requestAnimationFrame(() => {
						isActive.value = isHovered;
					});
					cleanup(() => {
						cancelAnimationFrame(timeoutId);
					});
				} else {
					isActive.value = true;
				}
			};
			if (!isServer) {
				update();
			}
		});

		return (
			<Link
				class={[
					"text-gray-700 text-sm hover:text-blue-500 hover:bg-blue-50 align-middle items-center px-4 h-12 relative",
					"transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full",
					"after:bg-blue-500 after:transition-transform after:duration-300",
					{
						"after:scale-x-100": isActive.value,
						"after:scale-x-0": !isActive.value,
						"after:origin-left": dir.value === "left",
						"after:origin-right": dir.value === "right",
						hidden: isHidden,
						flex: !isHidden,
					},
				]}
				href={href}
				onClick$={onClick$}
				onMouseEnter$={onMouseEnter$}
				onMouseLeave$={onMouseLeave$}
			>
				<span class="text-xl mr-1">
					<RenderIcon name={icon} />{" "}
				</span>
				{text}
			</Link>
		);
	},
);
