module.exports = {
  '*.{js,jsx,ts,tsx,css,json}': [
    'yarn soda lint',
    'yarn soda pretty',
    'git add',
  ],
}
