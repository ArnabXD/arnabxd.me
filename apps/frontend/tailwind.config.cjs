/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5AE4A8",
        surface: "#4C5B60",
        "bg-light": "#FFFFFF",
        "bg-dark": "#1A2E35",
      },
    },
    fontFamily: {
      sans: ["Outfit", "sans-serif"],
      serif: ["Outfit", "serif"],
    },
  },
  plugins: [],
  darkMode: "class",
};
