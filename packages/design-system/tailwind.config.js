// @ts-check
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./lib/**/*.{js,ts,tsx}"],
  theme: {
    colors: {
      currentColor: "currentColor",
      transparent: "transparent",
      "core-yellow": "#FCFF59",
      "core-blue": "#ACB9FE",
      "core-pink": "#F3B0FF",
      "core-black": "#1F1F1F",
      "core-white": "#FFFFFF",
      "ui-grey-200": "#F0F0E9",
      "ui-grey-500": "#565656",
      "outline-ui-grey-300": "#DBD8D0",
      "link-ui": "#5A06D8",
    },
    borderRadius: {
      none: "0",
      xs: "8px",
      sm: "12px",
      md: "16px",
      lg: "22px",
      xl: "34px",
      full: "9999px",
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ["Garnett", "sans-serif"],
    },
    outlineWidth: {
      3: "3px",
    },
    opacity: {
      15: ".15",
    },
    boxShadow: {
      sm: "0px 4px 12px 0px #0000001A;",
      md: "0px 0px 7px 0px rgba(0, 0, 0, 0.17)",
    },
    fadeInFromBottom: {
      "0%": { transform: "translateY(2000px)", opacity: "0" },
      "60%": { transform: "translateY(-30px)", opacity: "0.5" },
      "80%": { transform: "translateY(10px)", opacity: "100" },
      "100%": { transform: "translateY(0)", opacity: "100" },
    },
    fadeInFromTop: {
      "0%": { transform: "translateY(-2000px)", opacity: "0" },
      "60%": { transform: "translateY(30px)", opacity: "0.5" },
      "80%": { transform: "translateY(-10px)", opacity: "100" },
      "100%": { transform: "translateY(0)", opacity: "100" },
    },
    scaleOpen: {
      "0%": {
        transform: "scale(0.8) translateX(-60%)",
      },
      "100%": {
        opacity: "1",
        transform: "scale(1) translateX(-50%)",
      },
    },
    animation: {
      scaleOpen: "scaleOpen 0.1s forwards",
      marquee: "marquee 25s linear infinite",
      marquee2: "marquee2 25s linear infinite",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      marquee2: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
