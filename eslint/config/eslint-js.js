module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        legacyDecorators: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      'no-useless-constructor': 'error',
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
    },
  };