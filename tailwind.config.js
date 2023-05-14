import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,ts,jsx,tsx,mdx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Rubik", fontFamily.sans],
    },
  },
};
export const plugins = [];
