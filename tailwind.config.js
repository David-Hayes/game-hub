const colors = require('tailwindcss/colors')

module.exports = {
  purge: { content: ['./src/**/*.js', './public/index.html'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
      },
    },
    fontFamily: {
      sans: ['"Open Sans"'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
