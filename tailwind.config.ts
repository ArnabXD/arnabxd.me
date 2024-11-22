import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
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
} satisfies Config;
