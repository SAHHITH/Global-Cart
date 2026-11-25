/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#101828',
          light: '#1D2939',
          dark: '#070B14',
        },
        marketplace: {
          orange: '#FF9900',
          orangeHover: '#E68A00',
          blue: '#2874F0',
          blueHover: '#1C5ED6',
          cloud: '#F5F7FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};