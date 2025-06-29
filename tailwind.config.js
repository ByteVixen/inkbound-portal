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
      },
      backgroundImage: {
        'vanta-overlay': "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.03), transparent)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
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
