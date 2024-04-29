/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mywhite: "#FFFFFF",
        mymint: "#A3FFD6",
        mypurple: "#8576FF",
        myblue: "#7BC9FF",
        mybgcolor: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
