/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'watt-yellow': '#ffee00',
        'watt-yellow-light': '#fff44f',
        'watt-gray': '#717070',
        'watt-dark': '#343434',
      },
      fontFamily: {
        'quantico': ['Quantico', 'sans-serif'],
        'electrolize': ['Electrolize', 'sans-serif'],
      },
    },
  },
  plugins: [],
}