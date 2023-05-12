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
        pixel: ["var(--font-pixel)"],
        mulish: ["var(--font-mulish)"],
      },
      colors: {
        "pixel-orange": "#eb836a",
        "pixel-grey": "#26252e",
      },
    },
  },
  plugins: [],
};
