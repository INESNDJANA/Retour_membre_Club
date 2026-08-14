/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: "#FBF3EA",
          100: "#F5E5D6",
          400: "#D98A63",
          500: "#BE5B32",
          600: "#BE5B32",
          700: "#8F4526",
        },
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
