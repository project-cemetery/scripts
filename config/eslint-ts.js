module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['./eslint-base.js'],
  rules: {
    'no-empty-function': ['error', { allow: ['constructors'] }],
  },
}
