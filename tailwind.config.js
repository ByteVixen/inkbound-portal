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
    },
  },
  plugins: [],
};