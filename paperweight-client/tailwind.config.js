const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['elza-text', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      fontFamily: {
        'title': ['greycliff-cf', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}

export default config