const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(path.resolve(__dirname, '../src/tailwind.config.js')),
    require('autoprefixer'),
    /**
     * use tomorrow’s CSS today
     * docs: https://preset-env.cssdb.org/features
     */
    require('postcss-preset-env')({ stage: 1 })
  ]
}