const spawn = require('cross-spawn')
const path = require('path')

const ignoreToStirng = require('../utils/ignoreToString')
const defineProjectPlugins = require('../utils/defineProjectPlugins')
const createExtString = require('../utils/createExtString')

const getPrettierExts = async projectPath => {
  const { exts } = await defineProjectPlugins(projectPath)

  return createExtString(exts)
}

module.exports = async ({ projectPath, args }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')
  const rcFile = path.join(__dirname, '../config/prettier.js')

  const ignorePaths = ignoreToStirng(projectPath, ignoreFile)
  const exts = await getPrettierExts(projectPath)

  const result = spawn.sync(
    'prettier',
    [
      '--write',
      `${projectPath}/{.,,!(${ignorePaths})/**}/*.{${exts}}`,
      '--config',
      rcFile,
      '--plugin-search-dir=.',
      ...args,
    ],
    { stdio: 'inherit' },
  )

  return result
}
