/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        customBlue1: "#164765",
        customBlue2: "#447C9D",
        customBlue3: "#9CBEC8",
        customBlue4: "#DEF2FD",
        customGreen1: "#73CA5C",
        customPurple1: "#A06ECE",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
