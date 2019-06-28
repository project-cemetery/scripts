const path = require('path')
const spawn = require('cross-spawn')
const fse = require('fs-extra')

const defineProjectPlugins = require('../utils/defineProjectPlugins')
const createExtString = require('../utils/createExtString')

const isFastMode = args => args.includes('--fast')

module.exports = async ({ projectPath, args }) => {
  const { exts } = await defineProjectPlugins(projectPath)

  const config = {
    linters: {},
    concurrent: false,
  }
  if (isFastMode(args)) {
    // on commit run only prettier
    const prettyExtensions = createExtString(exts.pretty)

    config.linters[`*.{${prettyExtensions}}`] = ['yarn soda pretty', 'git add']
  } else {
    // on push run all checks
    const jsExtensions = createExtString(exts.js)
    const tsExtensions = createExtString(exts.ts)
    const cssExtensions = createExtString(exts.css)

    config.linters[`*.{${jsExtensions}}`] = ['yarn soda lint --js']
    config.linters[`*.{${tsExtensions}}`] = ['yarn soda lint --ts']
    config.linters[`*.{${cssExtensions}}`] = ['yarn soda lint --css']
  }

  const varDir = path.join(__dirname, '../var')
  const rcPath = path.join(varDir, 'lint-staged.json')

  await fse.ensureDir(varDir)
  await fse.writeFile(rcPath, JSON.stringify(config))

  return spawn.sync('lint-staged', ['--config', rcPath], { stdio: 'inherit' })
}
