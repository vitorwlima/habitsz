/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "460px",
        xxs: "380px",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
