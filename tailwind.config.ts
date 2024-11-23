import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5AE4A8",
        "surface-light": "#F3F3F3",
        "surface-dark": "#4C5B60",
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
