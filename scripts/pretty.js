const spawn = require('cross-spawn')
const path = require('path')

const ignoreToStirng = require('../utils/ignoreToString')

module.exports = async ({ projectPath, args }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')
  const rcFile = path.join(__dirname, '../config/prettier.js')

  const ignorePaths = ignoreToStirng(projectPath, ignoreFile)

  const result = spawn.sync(
    'prettier',
    [
      '--write',
      `${projectPath}/{.,,!(${ignorePaths})/**}/*.{ts,tsx,js,jsx,css,json}`,
      '--config',
      rcFile,
      ...args,
    ],
    { stdio: 'inherit' },
  )

  return result
}
