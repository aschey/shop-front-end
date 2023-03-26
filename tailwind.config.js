module.exports = {
  content: [
    "index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue,html}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "320px",
      // => @media (min-width: 576px) { ... }

      // md: "760px",
      // // => @media (min-width: 960px) { ... }

      // lg: "992px",
      // // => @media (min-width: 1440px) { ... }

      // xl: "1200px",
    },
    extend: {
      colors: {
        primary: {
          50: "#fbe5e5",
          100: "#f5c5c5",
          200: "#ea9a9a",
          300: "#df6f6f",
          400: "#d54646",
          500: "#bc2d2d",
          600: "#9e2525",
          700: "#7f1d1d",
          800: "#611616",
          900: "#420e0e",
        },
        secondary: {
          50: "#f0faf2",
          100: "#d1f2db",
          200: "#a0e6b8",
          300: "#6fd892",
          400: "#3fcf6f",
          500: "#1aa539",
          600: "#178f31",
          700: "#137a29",
          800: "#0f641f",
          900: "#0b4e17",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
