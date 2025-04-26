/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-mist',
    'animate-mist'
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px 5px rgba(255,255,255,0.3)' },
          '50%': { boxShadow: '0 0 25px 10px rgba(212,194,252,0.5)' },
        },
        mist: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      boxShadow: {
        'glow': '0 0 15px 5px rgba(255,255,255,0.3)',
      },
      fontFamily: {
        marcellus: ['Marcellus', 'serif'],
      },
      colors: {
        midnight: '#0A0A23',
        moonlight: '#D4C2FC',
        royal: '#726DA8',
        mist: '#C5D2E0',
        shadow: '#1D1B38',
      },
    },
  },
  plugins: [],
}
