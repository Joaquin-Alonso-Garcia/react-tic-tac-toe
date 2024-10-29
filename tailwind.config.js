/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Outfit', 'sans-serif'],
      },
      colors: {
        'light-blue-400': '#31C3BD',
        'light-blue-500': '#65E9E4',
        'light-yellow-400': '#F2B137',
        'light-yellow-500': '#FFC860',
        'dark-navi-400': '#1A2A33',
        'dark-navi-500': '#1F3641',
        'silver-400': '#A8BFC9',
        'silver-500': '#DBE8ED',
      },
      fontSize: {
        'heding-lg': '40px',
        'heding-md': '24px',
        'heding-sm': '20px',
        'heding-xs': '16px',
        'body': '14px',
      }
    },
  },
  plugins: [],
}

