/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        colors: {
            text: '#848482',
            accent: '#ff6347',
            'background-blurred': '#e0c9c5',
            background: '#cfcfcf',
            'background-card': '#9bb8f0',
            'background-settings': '#d9e6ff',
            'background-app': '#2c3e50',
            'background-shield': '#7a96eb',
            'background-accept': '#2c3e50',
        },
        // extend: {},
    },
    plugins: [],
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};
