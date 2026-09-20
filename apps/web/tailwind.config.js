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
        coral: {
          50: '#FFF5F2',
          100: '#FFE8E2',
          200: '#FFD1C5',
          300: '#FFAF9E',
          400: '#FF886E',
          500: '#FF6B4A',
          600: '#F04E27',
          700: '#C83814',
          800: '#A42E13',
          900: '#842B16',
        },
        am: {
          bg: '#FAFAF8',
          surface: '#FFFFFF',
          border: '#E5E5E0',
          accent: '#FF6B4A',
          'accent-hover': '#F04E27',
          muted: '#71717A',
          text: '#1A1A1A',
          dark: {
            bg: '#0A0A0C',
            surface: '#121216',
            border: '#27272A',
            text: '#F4F4F6',
            muted: '#A1A1AA'
          }
        }
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 25px -4px rgba(0, 0, 0, 0.06), 0 4px 10px -3px rgba(0, 0, 0, 0.03)',
        'coral': '0 4px 20px -2px rgba(255, 107, 74, 0.35)',
      }
    },
  },
  plugins: [],
}
