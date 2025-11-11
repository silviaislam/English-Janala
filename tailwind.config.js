/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // <-- add all html files or ./src/**/*.{html,js} if you have folders
  theme: {
    extend: {
      colors: {
        text: "#18181B",
        primary: "#422AD5", // better not use DEFAULT, use custom name
        secondary: "#00BCFF",
        grey: "#292524",
        accent: "#79716B",
        btnbg: "#1A91FF",
      },
    },
  },
  plugins: [],
};
