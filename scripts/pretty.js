const spawn = require('cross-spawn')
const path = require('path')

const ignoreToStirng = require('../utils/ignoreToString')

module.exports = async ({ projectPath }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')
  const rcFile = path.join(__dirname, '../config/prettier.js')

  const ignorePaths = ignoreToStirng(projectPath, ignoreFile)
  console.log(ignorePaths)

  const result = spawn.sync(
    'prettier',
    [
      '--write',
      `${projectPath}/{.,,!(${ignorePaths})/**}/*.{ts,tsx,js,jsx,css,json}`,
      '--config',
      rcFile,
    ],
    { stdio: 'inherit' },
  )

  return result
}
