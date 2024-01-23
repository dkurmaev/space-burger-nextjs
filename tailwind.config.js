/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#1E1E1E",
        primary: "#DC8827",
        submit: "#332c28",
        secondary: "#d9d9d9",
        blue: "#3DC8F9",
      },
    },
  },
  plugins: [],
};
