// import scrollbar from "tailwind-scrollbar"
const scrollbar = require("tailwind-scrollbar");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // backgroundGray:"rgb(68,70,84)",
        backgroundGray: "rgb(52,53,65)",
        InputbackgroundGray: "rgb(64,65,79)",
        sidebarBakground: "rgb(32,33,35)",
        answerBoxBackground: "rgb(68,70,84)",
      },
    },
  },
  plugins: [scrollbar],
  mode: "jit",
  variants: {},
};
