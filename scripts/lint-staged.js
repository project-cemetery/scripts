const path = require('path')
const spawn = require('cross-spawn')
const fse = require('fs-extra')

const defineProjectPlugins = require('../utils/defineProjectPlugins')
const createExtString = require('../utils/createExtString')

module.exports = async ({ projectPath }) => {
  const { exts } = await defineProjectPlugins(projectPath)

  const prettyExtensions = createExtString(exts.pretty)
  const jsExtensions = createExtString(exts.js)
  const tsExtensions = createExtString(exts.ts)
  const cssExtensions = createExtString(exts.css)

  const config = {
    linters: {
      [`*.{${prettyExtensions}}`]: ['yarn soda pretty', 'git add'],
      [`*.{${jsExtensions}}`]: ['yarn soda lint --js', 'git add'],
      [`*.{${tsExtensions}}`]: ['yarn soda lint --ts', 'git add'],
      [`*.{${cssExtensions}}`]: ['yarn soda lint --css', 'git add'],
    },
    concurrent: false,
  }

  const varDir = path.join(__dirname, '../var')
  const rcPath = path.join(varDir, 'lint-staged.json')

  await fse.ensureDir(varDir)
  await fse.writeFile(rcPath, JSON.stringify(config))

  return spawn.sync('lint-staged', ['--config', rcPath], { stdio: 'inherit' })
}
