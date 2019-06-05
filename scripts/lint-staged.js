const path = require('path')
const spawn = require('cross-spawn')
const fs = require('fs')
const { promisify } = require('util')

const defineProjectPlugins = require('../utils/defineProjectPlugins')
const createExtString = require('../utils/createExtString')

const writeFile = promisify(fs.writeFile)

module.exports = async ({ projectPath }) => {
  const { exts } = await defineProjectPlugins(projectPath)

  const prettyExtensions = createExtString(exts.pretty)
  const lintExtensions = createExtString([], ...exts.js, ...exts.ts, ...exts.css)

  const config = {
    linters: {
      [`*.{${prettyExtensions}}`]: ['yarn soda pretty', 'git add'],
      [`*.{${lintExtensions}}`]: ['yarn soda lint', 'git add'],
    },
  }

  const rcPath = path.join(__dirname, '../var/lint-staged.json')

  await writeFile(rcPath, JSON.stringify(config))

  return spawn.sync('lint-staged', ['--config', rcPath], { stdio: 'inherit' })
}
