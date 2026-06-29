/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f4f6fa',
          100: '#e5eaf3',
          200: '#c5d0e4',
          300: '#94aacb',
          400: '#5e7ca9',
          500: '#3e5c8c',
          600: '#304973',
          700: '#283c5e',
          800: '#23334f',
          900: '#1e293b', // slate-800 or slate-900 equivalent
          950: '#030712', // dark-gray/black equivalent
          bgDark: '#0a1128', // Deep navy main background
          bgDarkSecondary: '#101f42', // Deep navy secondary background
        },
        electric: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
