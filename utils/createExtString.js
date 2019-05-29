const createExtString = (normal, additional) =>
  [...normal, ...additional].join(',')

module.exports = createExtString
