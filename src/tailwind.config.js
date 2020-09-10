/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/

module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'src/**/*.vue',
      'src/**/*.js',
      'layout/**/*',
      'templates/**/*',
    ]
  },
  future: {
    // Learn more on https://tailwindcss.com/docs/upcoming-changes
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
}
