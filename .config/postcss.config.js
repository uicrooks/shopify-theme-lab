const path = require('path')

module.exports = {
  plugins: [
    require('tailwindcss')(path.resolve(__dirname, '../src/tailwind.config.js')),
    require('autoprefixer'),
    require('precss')
  ]
}