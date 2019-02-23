module.exports = {
  '*.{ts,tsx,js,jsx}': ['yarn soda lint'],
  '*.{js,jsx,ts,tsx,css,json}': ['yarn soda pretty', 'git add'],
}
