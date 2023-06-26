/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			screens: {
				celS: '350px',
			},
			boxShadow: {
				input: '0 1.5px 2px 2px rgba(0,0,0,0.2)',
				img: '0 2px 3px 2px rgba(0,0,0,0.3)',
				BlueSky: '0 0 3px 0 #4AAFFF',
				Orange: '0 0 3px 0 #FF5903',
				inset_custom: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
				inset_BlueSky: 'inset 0 0 4px 0 #4AAFFF',
				inset_orange: 'inset 0 0 4px 0 #FF5903',
			},
			colors: {
				iconsPurple: '#3F0071F7',
				orangeBg: '#FF5903',
				darkBlue: '#082032',
				blueSky: '#4AAFFF',
				blueDark: '#3D446B',
			},
			fontSize: {
				little: '10px',
				subTitle: '20px',
			},
			width: {
				sizeLogo: '128px',
			},
			fontFamily: {
				josefin: ['var(--font-josefin-sans)'],
			},
		},
	},
	plugins: [],
};
