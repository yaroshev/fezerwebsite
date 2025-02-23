/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#000000',
          text: '#ffffff',
          muted: '#9ca3af',
          accent: 'rgba(255, 255, 255, 0.1)'
        },
        light: {
          bg: '#ffffff',
          text: '#000000',
          muted: '#4b5563',
          accent: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', '.light &');
    }
  ],
};
