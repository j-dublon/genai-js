import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    screens: {
      sm: "600px",
      md: "960px",
      lg: "1152px",
      xl: "1440px",
      "2xl": "1750px",
    },
    colors: {
      currentColor: "currentColor",
      transparent: "transparent",
      "core-yellow": "#FCFF59",
      "core-black": "#1F1F1F",
      "core-white": "#FFFFFF",
      "core-grey-200": "#F0F0E9",
      "secondary-green": "#CDFFCF",
      "secondary-teal": "#C3F9FD",
      "secondary-blue": "#ACB9FE",
      "secondary-pink": "#F3B0FF",
      "tertiary-green-dark": "#0C541A",
      "tertiary-purple": "#5516B3",
      "tertiary-blue-dark": "#6F89FF",
      "tertiary-orange": "#FFC633",
      "tertiary-peach": "#FF8A65",
      "tertiary-blue-light": "#E6EAFF",
      "tertiary-pink-light": "#FBE7FF",
      "tertiary-green-light": "#F0FFF1",
      "tertiary-peach-light": "#FFDCD1",
      "tertiary-orange-light": "#FFEEC2",
      "ui-yellow": "#FBFF42",
      "ui-link": "#5A06D8",
      "ui-teal": "#009EA8",
      "ui-grey-100": "#F7F7F5",
      "ui-grey-300": "#D8D8D0",
      "ui-grey-400": "#818181",
      "ui-grey-500": "#565656",
      "ui-error": "#DB3737",
    },
    backgroundImage: {
      "offer-gradient": "linear-gradient(227deg, #A4FFA7 25%, #C3F9FD 74%)",
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
    padding: {
      ...defaultTheme.padding,
      mobile: "20px",
      tablet: "64px",
      desktop: "144px",
    },
    margin: {
      ...defaultTheme.margin,
      mobile: "20px",
      tablet: "64px",
      desktop: "144px",
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
      ...defaultTheme.animation,
      scaleOpen: "scaleOpen 0.1s forwards",
      marquee: "marquee 25s linear infinite",
      "marquee-slow": "marquee 70s linear infinite",
      shimmer: "shimmer 1.5s infinite ease-in-out",
    },
    keyframes: {
      ...defaultTheme.keyframes,
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      shimmer: {
        "0%": { opacity: "0.5" },
        "50%": { opacity: "1" },
        "100%": { opacity: "0.5" },
      },
    },
    text: {
      xxs: "0.75rem",
      xs: "0.875rem",
      sm: "1rem",
      md: "1.25rem",
      lg: "1.5rem",
      xl: "1.75rem",
      "2xl": "2rem",
      "3xl": "2.25rem",
      "4xl": "2.5rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
  },
  safelist: [],
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        html: {
          color: theme("colors.core-black"),
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      });
    },
    require("tailwind-scrollbar")
  ],
};
