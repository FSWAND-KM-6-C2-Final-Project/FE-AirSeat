/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        customBlue1: "#164765",
        customBlue2: "#447C9D",
        customBlue3: "#9CBEC8",
        customBlue4: "#DEF2FD",
        customRed: "#B22C45",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
