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
					50: "#E3F2FD",
					100: "#BBDEFB",
					200: "#90CAF9",
					300: "#64B5F6",
					400: "#42A5F5",
					500: "#2196F3",
					600: "#1E88E5",
					700: "#1976D2",
					800: "#1565C0",
					900: "#0D47A1",
					950: "#0A3781",
				},
				secondary: {
					50: "#fffde7",
					100: "#fff9c5",
					200: "#fff49f",
					300: "#fff079",
					400: "#fdeb5a",
					500: "#fbe53d",
					600: "#fdd73d",
					700: "#fbbf35",
					800: "#f8a82e",
					900: "#f37f21",
					950: "#f06d1b",
				},
			},
		},
	},
	plugins: [],
};
