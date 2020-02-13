module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['./eslint-base.js'],
  rules: {
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'react/prop-types': 0,
  },
};
