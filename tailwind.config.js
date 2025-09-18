/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Paleta de Cores Original da DIINC
      colors: {
        'diinc-red': '#a01d23',
        'diinc-dark': '#1a1a1a',     // Para fundos escuros e rodapé
        'diinc-gray': '#333333',   // Para textos principais
        'diinc-light-gray': '#f4f4f4', // Para fundos de seção claros
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}