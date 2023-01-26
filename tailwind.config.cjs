/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};
