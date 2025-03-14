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
      "core-blue": "#ACB9FE",
      "core-red": "#FF8A65",
      "core-teal": "#C3F9FD",
      "core-purple": "#5A06D8",
      "secondary-blue": "#6F89FF",
      "secondary-orange": "#FFC633",
      "core-pink": "#F3B0FF",
      "core-black": "#1F1F1F",
      "core-white": "#FFFFFF",
      "ui-grey-100": "#F7F7F5",
      "ui-grey-150": "#f4f3ef",
      "ui-grey-200": "#F0F0E9",
      "ui-grey-300": "#D8D8D0",
      "ui-grey-400": "#818181",
      "ui-grey-500": "#565656",
      "outline-ui-grey-300": "#DBD8D0",
      "link-ui": "#5A06D8",
      "light-green": "#A4FFA7",
      "light-blue": "#C3F9FD",
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
      scaleOpen: "scaleOpen 0.1s forwards",
      marquee: "marquee 25s linear infinite",
      marquee2: "marquee2 25s linear infinite",
      shimmer: "shimmer 1.5s infinite ease-in-out",
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
  safelist: [
    "before:border-core-black",
    "before:border-core-yellow",
    "before:border-core-white",
    "before:border-secondary-blue",
    "before:border-secondary-blue-dark",
    "before:border-ui-grey-300",
  ],
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
  ],
};
