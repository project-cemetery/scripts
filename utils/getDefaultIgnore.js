const { lines } = require('mrm-core')

const getDefaultIgnore = () => [
    '.yarn', 'node_modules', '.pnp.js', '.vscode',
    ...lines('.gitignore').get(),
]

module.exports = getDefaultIgnore