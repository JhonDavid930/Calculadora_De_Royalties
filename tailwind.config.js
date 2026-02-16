/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          light: '#1ed760',
          dark: '#169c46',
        },
        dark: {
          bg: '#121212',
          surface: '#181818',
          border: '#282828',
          hover: '#333333',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B3B3B3',
          muted: '#535353',
        }
      }
    },
  },
  plugins: [],
}