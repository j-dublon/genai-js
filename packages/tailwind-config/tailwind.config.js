/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../../apps/**/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/component-library/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        garnett: ['Garnett', 'sans-serif'], // 'Garnett' is the font name, with 'sans-serif' as a fallback
      },
    },
  },
  plugins: [],
};
