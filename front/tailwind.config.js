/** @type {import('tailwindcss').Config} */
// const {hover} = require("@testing-library/user-event/dist/hover");
const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = withMT({
//   content: [
//       './public/index.html',
//       "./src/**/*.{js,jsx,ts,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });

module.exports = withMT({
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
      gridTemplateRows: {
        'grid-rows-7': 'repeat(7, minmax(0, 1fr))',
        'grid-rows-8': 'repeat(8, minmax(0, 1fr))',
        'grid-rows-9': 'repeat(9, minmax(0, 1fr))',
        'grid-rows-10': 'repeat(10, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
});
