const colors = require('tailwindcss/colors')
console.log(colors)
/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media', // or 'class'
	theme: {
		colors: {
			...colors,
			transparent: 'transparent',
			current: 'currentColor',
			slate:colors.zinc,
			cyan: colors.cyan,
		},
		extend: {
			fontSize: {
				h1: '3rem', // Define custom font size for h1 heading
				h2: '2.5rem', // Define custom font size for h2 heading
				h3: '2rem', // Define custom font size for h3 heading
				p: '1rem', // Define custom font size for paragraphs
			},
		},
	},
	plugins: [],
}
