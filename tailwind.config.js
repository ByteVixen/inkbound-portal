/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        inkblack: "#0c0c0c",
        fairygold: "#efad00",
        twilight: "#223d80",
        vinegreen: "#092e20",
        bloodberry: "#872657",
      },
      fontFamily: {
        marcellus: ['Marcellus', 'serif'],
      },
      boxShadow: {
        glow: "0 0 15px 5px rgba(255,255,255,0.1)",
        goldglow: "0 0 12px 4px rgba(239, 173, 0, 0.3)",
      },
      backgroundImage: {
        'vanta-overlay': "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03), transparent)",
        'parchment': "url('/images/parchment-bg.jpg')",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeSlideDown: {
          '0%': { opacity: 0, transform: 'translateY(-10%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeSlideDown: 'fadeSlideDown 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out',
        flip: 'flip 0.6s ease-in-out forwards',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: "class",
};
