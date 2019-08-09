module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  rules: {
    'selector-pseudo-class-no-unknown': null,
    'no-descending-specificity': [
      true,
      {
        severity: 'warning',
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['define-mixin', 'mixin'],
      },
    ],
  },
}
