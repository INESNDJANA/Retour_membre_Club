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
        waveA: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        waveB: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        waveC: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.45s ease-out',
        waveA: 'waveA 20s linear infinite',
        waveB: 'waveB 14s linear infinite reverse',
        waveC: 'waveC 26s linear infinite',
      },
    },
  },
  plugins: [],
};
