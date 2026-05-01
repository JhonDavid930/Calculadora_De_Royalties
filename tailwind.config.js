/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        spotify: {
          green: '#1DB954',
          light: '#1ed760',
          dark: '#169c46',
        },
        dark: {
          bg: '#0a0a0a',
          surface: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.05)',
          hover: 'rgba(255, 255, 255, 0.1)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#a1a1aa',
          muted: '#71717a',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'neon': '0 0 20px rgba(29, 185, 84, 0.3)',
      }
    },
  },
  plugins: [],
}