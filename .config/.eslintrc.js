module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended' // use 'plugin:vue/essential' for less strict linting rules - https://eslint.vuejs.org/rules
  ],
  plugins: [
    'vue'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true
  },
  ignorePatterns: [
    /**
     * ignore certain files
     * docs: https://eslint.org/docs/user-guide/configuring#ignorepatterns-in-config-files
     */
    // 'my-file.js',
    // '**/my-directory/*.js'
  ],
  rules: {
    "quotes":["error","double"]
    /**
     * add custom rules
     * docs: https://eslint.org/docs/rules
     */
    // 'quotes': ['error', 'single'],
    // 'semi': ['error', 'never']
  }
}