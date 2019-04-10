module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint'],
  extends: ['./eslint-base.js'],
  rules: {
    'no-empty-function': ['error', { allow: ['constructors'] }],
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'no-shadowed-variable': true,
          'react/prop-types': 0,
        },
      },
    ],
  },
}
