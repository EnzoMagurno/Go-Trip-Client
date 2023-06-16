/** @type {import('tailwindcss').Config} */
module.exports = {
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
        "celS": "350px"
      },
      boxShadow: {
        input: "0 1.5px 2px 2px rgba(0,0,0,0.2)",
        img: "0 2px 3px 2px rgba(0,0,0,0.3)"
      },
      colors: {
        iconsPurple: "#3F0071F7"
      },
      fontSize: {
        "little": "10px"
      }
  
    },
  },
  plugins: [],
}
