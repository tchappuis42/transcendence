/** @type {import('tailwindcss').Config} */

const { hover } = require("@testing-library/user-event/dist/hover");
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '3rem',
      },
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      height: {
        '100px': '100px',
        '125': '500px',
        '1/20': '5%',
        '19/20': '95%'
      },
      width: {
        'min-w': '330px',
        '112': '28rem'
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
      gridTemplateRows: {
        'grid-rows-7': 'repeat(7, minmax(0, 1fr))',
        'grid-rows-8': 'repeat(8, minmax(0, 1fr))',
        'grid-rows-9': 'repeat(9, minmax(0, 1fr))',
        'grid-rows-10': 'repeat(10, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
