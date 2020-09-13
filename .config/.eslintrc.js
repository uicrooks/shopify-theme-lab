module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'prefer-const': ['error', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never']
  }
}