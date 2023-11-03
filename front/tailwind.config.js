/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx,css}'
  ],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '3rem',
      },
      width: {
        '112': '28rem'
      },
      height: {
        '125': '500px',
        '1/20': '5%',
        '19/20': '95%'
      }
    },
  },
  plugins: [],
}

