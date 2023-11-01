/** @type {import('tailwindcss').Config} */
const {hover} = require("@testing-library/user-event/dist/hover");
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      height: {
        '100px': '100px'
      },
      width: {
        'min-w': '330px'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '4/5': '8.5 / 10',
      },
      fontSize: {
        'text-xxs': '10px',
      },
      backgroundColor: {
        'nice-g': '#5F9EA0'
      },
    },
  },
  plugins: [],
}
