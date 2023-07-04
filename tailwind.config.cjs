/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flex: {
        'screen': '0 0 100%'
      },
      fontFamily: {
        'sans': ['sans-serif'],
      }
    },
  },
  plugins: [],
};

module.exports = config;
