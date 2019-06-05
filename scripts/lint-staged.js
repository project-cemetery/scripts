const path = require('path')
const spawn = require('cross-spawn')
const fse = require('fs-extra')

const defineProjectPlugins = require('../utils/defineProjectPlugins')
const createExtString = require('../utils/createExtString')

module.exports = async ({ projectPath }) => {
  const { exts } = await defineProjectPlugins(projectPath)

  const prettyExtensions = createExtString(exts.pretty)
  const lintExtensions = createExtString(
    [],
    ...exts.js,
    ...exts.ts,
    ...exts.css,
  )

  const config = {
    linters: {
      [`*.{${prettyExtensions}}`]: ['yarn soda pretty', 'git add'],
      [`*.{${lintExtensions}}`]: ['yarn soda lint', 'git add'],
    },
    concurrent: false,
  }

  const varDir = path.join(__dirname, '../var')
  const rcPath = path.join(varDir, 'lint-staged.json')

  await fse.ensureDir(varDir)
  await fse.writeFile(rcPath, JSON.stringify(config))

  return spawn.sync('lint-staged', ['--config', rcPath], { stdio: 'inherit' })
}
