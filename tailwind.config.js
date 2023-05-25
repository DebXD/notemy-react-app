/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        bebas: ["var(--font-bebas)"],
        rubik: ["var(--font-rubik)"],
        spaceMono: ["var(--font-spaceMono)"],
      },
    },
  },
  plugins: [],
};
