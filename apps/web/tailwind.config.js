/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        am: {
          bg: '#0A0A0C',
          surface: '#121216',
          border: '#222228',
          accent: '#3B82F6',
          muted: '#8E8E9B',
          text: '#F4F4F6'
        }
      }
    },
  },
  plugins: [],
}
