module.exports = {
  linters: {
    '*': ['yarn soda pretty', 'git add'],
  },
  ignore: ['**/*.{lock,workflow}'],
}
