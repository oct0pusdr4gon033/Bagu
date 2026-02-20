/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#702e36',
        'primary-wine': '#722F37',
        'background-light': '#f7f6f6',
        'background-dark': '#1d1516',
        'accent-gold': '#D4AF37',
        'off-white': '#f9f8f6',
        'pure-white': '#FFFFFF',
        'soft-gray': '#F5F5F5',
        'text-main': '#1A1A1A',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
