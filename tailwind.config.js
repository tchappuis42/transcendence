/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './public/index.html',
        './front/src/**/*.{js,jsx,ts,tsx}'
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
            }
        },
    },
    plugins: [],
}
