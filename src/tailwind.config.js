/**
 * Tailwind CSS configuration file
 *
 * docs: https://tailwindcss.com/docs/configuration
 * default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const path = require('path')

module.exports = {
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem'
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      path.resolve(__dirname, '**/*.{js,vue}'),
      path.resolve(__dirname, '../shopify/**/*.liquid')
    ]
  }
}
