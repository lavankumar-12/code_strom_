/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-color': '#ff416c',
                'secondary-color': '#ff4b1f',
                'accent-color': '#00f2ff',
            },
            fontFamily: {
                'main': ['Inter', 'sans-serif'],
                'heading': ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
