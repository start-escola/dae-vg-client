import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "acesso-background": "url('/bgAuth.jpeg')",
      },
    },
    colors: {
      primary: {
        100: "#38D0F2",
        500: "#1763A6",
        700: "#1763A6",
      },
      white: {
        0: "#FFFFFF",
        50: "#FAFAFA",
        200: "#D9D9D9",
      },
      black: "#000000",
      grey: "#F4F4F4",
      placeholder: "#8e8273",
      border_grey: "#B5B5B5",
      transparent: "transparent",
      feedback: {
        success: "green",
        warning: "yellow",
        failed: "red",
      },
      dark: {
        bg: "#0D0D0D"
      }
    },
  },
  plugins: [],
};
export default config;
