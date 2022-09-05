/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background_primary: "#fef3c",
        text_primary: "#fbbe24",
      },
    },
  },
  plugins: [],
};
