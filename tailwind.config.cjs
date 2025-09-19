// Arquivo: tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'diinc-red': '#a01d23',
        'diinc-dark': '#1a1a1a',
        'diinc-gray': '#333333',
        'diinc-light-gray': '#f4f4f4',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}