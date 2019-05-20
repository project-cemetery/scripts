module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['define-mixin', 'mixin'],
      },
    ],
  },
}
