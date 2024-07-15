/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5F5", // Light background color
        secondary: {
          DEFAULT: "#FF9C01", // Bright accent color, keeping it the same
          100: "#FF9001", // Bright accent variation
          200: "#FF8E01", // Bright accent variation
        },
        black: {
          DEFAULT: "#333333", // Darker shade for text and elements
          100: "#666666", // Lighter dark shade
          200: "#999999", // Even lighter dark shade
        },
        gray: {
          100: "#E0E0E0", // Light gray for borders and backgrounds
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
