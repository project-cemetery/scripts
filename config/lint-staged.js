module.exports = {
  '*.{js,jsx,ts,tsx,css}': ['yarn soda lint', 'git add'],
  '*.{js,jsx,ts,tsx,css,json}': ['yarn soda pretty', 'git add'],
}
