/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        evae: {
          e: "#FF4500",      // E - Impulse
          v: "#1E3A8A",      // V - Possibility
          lambda: "#84CC16", // Λ - Choice
          echo: "#B833F5",   // Ǝ - Observation
        },
      },
    },
  },
  plugins: [],
};
