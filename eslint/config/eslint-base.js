module.exports = {
  plugins: ['unicorn', 'eslint-plugin-import-helpers'],
  extends: ["airbnb-base", 'plugin:unicorn/recommended', "prettier"],
  rules: {
    "no-undef": 0,
    "unicorn/filename-case": 0,
    "class-methods-use-this": 0,
    "unicorn/prevent-abbreviations": 0,
    "unicorn/prefer-query-selector": 0,
    "unicorn/prefer-number-properties": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          ['/^app/', '/^lib/', '/^config/', '/^src/', '/^ui/'],
          ['/^$/', '/^&/'],
          ['/^@shared/', '/^@app/', '/^@back/', '/^@front/'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'ignore', ignoreCase: true },
      },
    ],
  },
};