module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      project: 'tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      'no-unused-vars': 0,
      'no-useless-constructor': 0,
      'no-empty-function': ['error', { allow: ['constructors'] }],
      'react/prop-types': 0,
    },
  };