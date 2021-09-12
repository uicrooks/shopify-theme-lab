const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss')(path.resolve(__dirname, '../src/tailwind.config.js')),
    require('autoprefixer')
  ]
}