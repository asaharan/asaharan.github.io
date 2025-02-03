/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Rubik"],
			},
			colors: {
				primary: {
					50: "#F2FAFF",
					100: "#E6F4FF",
					200: "#BFDFFF",
					300: "#99C5FF",
					400: "#4F87FF",
					500: "#0336ff",
					600: "#022CE6",
					700: "#0221BF",
					800: "#021B99",
					900: "#001173",
					950: "#000A4A",
				},
			},
		},
	},
	plugins: [],
};
