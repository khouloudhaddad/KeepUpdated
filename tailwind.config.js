/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
     "./src/**/*.{html,ts}",
  ],
  theme: {
   extend: {
      fontFamily: {
       'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
