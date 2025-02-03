import { component$ } from "@builder.io/qwik";

const MenuIcon = component$(() => {
	return (
		<svg
			class="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Menu"
			title="Menu"
			alt="Menu"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16m-7 6h7"
			/>
		</svg>
	);
});

export default MenuIcon;
