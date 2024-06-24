import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        100: "#95C9AA",
        500: "#238F4F",
        700: "#00491E",
      },
      white: {
        0: "#FFFFFF",
        50: "#FAFAFA",
        200: "#D9D9D9",
      },
      black: "#000000",
      grey: "#F4F4F4",
      border_grey: "#B5B5B5",
      transparent: "transparent",
      feedback: {
        success: "green",
        warning: "yellow",
        failed: "red",
      },
    },
  },
  plugins: [],
};
export default config;
