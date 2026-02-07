/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#702e36',
        'background-light': '#f7f6f6',
        'background-dark': '#1d1516',
        'accent-gold': '#D4AF37',
        'off-white': '#f9f8f6',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
