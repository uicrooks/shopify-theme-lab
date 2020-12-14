module.exports = {
  extends: 'stylelint-config-recommended',
  plugins: [
    /**
     * docs: https://stylelint.io/user-guide/configure#plugins
     */
    // 'stylelint-scss' // not included by default, add with a package manager
  ],
  ignoreFiles: [
    /**
     * docs: https://stylelint.io/user-guide/configure#ignorefiles
     */
    // 'my-file.css',
    // '**/my-directory/*.css'
  ],
  rules: {
    /**
     * docs: https://stylelint.io/user-guide/rules/list
     */
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ],
    'no-descending-specificity': null
  }
}