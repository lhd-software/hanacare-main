import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				'brand-cyan': '#00C2FF',
				'brand-green': '#7FD700',
				'cyan-50': '#E5F7FF',
				'cyan-100': '#CCF0FF',
				'cyan-200': '#99E0FF',
				'cyan-300': '#66D1FF',
				'cyan-400': '#33C1FF',
				'cyan-500': '#00C2FF',
				'cyan-600': '#009BCC',
				'cyan-700': '#007599',
				'cyan-800': '#004E66',
				'cyan-900': '#003543',
				'green-50': '#DFF7D6',
				'green-100': '#CEED9E',
				'green-200': '#B8E366',
				'green-300': '#A2D92E',
				'green-400': '#8CCF00',
				'green-500': '#7FD700',
				'green-600': '#66AB00',
				'green-700': '#4D8000',
				'green-800': '#335500',
				'green-900': '#1A2B00'
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

export default config;
