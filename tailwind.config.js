/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)'
      },
      fontFamily: {
        sans: ['Baloo 2', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
};