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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatA: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(24px, -30px) scale(1.06)' },
        },
        floatB: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-28px, 22px) scale(1.08)' },
        },
        floatC: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(18px, 18px) scale(1.04)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.45s ease-out',
        floatA: 'floatA 14s ease-in-out infinite',
        floatB: 'floatB 18s ease-in-out infinite',
        floatC: 'floatC 22s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
