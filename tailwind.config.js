/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rda: {
          50: "#EAF6E5",
          100: "#D8EECE",
          200: "#AEDB99",
          300: "#87CA68",
          400: "#61AD3D",
          500: "#467D2C",
          600: "#376223",
          700: "#2A4B1B",
          800: "#1B3111",
          900: "#0F1A09",
          950: "#060B04",
        },
        brown: {
          50: "#F5EAE5",
          100: "#ECD4CB",
          200: "#D9A996",
          300: "#C67E62",
          400: "#A45A3C",
          500: "#703D29",
          600: "#5A3121",
          700: "#432519",
          800: "#2D1810",
          900: "#160C08",
          950: "#0B0604",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
