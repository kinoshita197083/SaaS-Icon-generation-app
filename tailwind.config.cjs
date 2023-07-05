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
      },
      gridTemplateColumns: {
        'card': 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))'
      },
      // animation: {
      //   rapidSpin
      // }
    },
  },
  plugins: [],
};

module.exports = config;
