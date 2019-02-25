const spawn = require('cross-spawn')
const path = require('path')

const countFiles = require('../utils/countFiles')

module.exports = async ({ projectPath }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')

  const filesAvailable = async exts => {
    const count = await countFiles(exts, projectPath, ignoreFile)
    return count > 0
  }

  const jsRcPath = path.join(__dirname, '../config/eslint-js.js')
  const tsRcPath = path.join(__dirname, '../config/eslint-ts.js')

  const [jsFilesExists, tsFilesExists] = await Promise.all([
    filesAvailable('js|jsx'),
    filesAvailable('ts|tsx'),
  ])

  const resultJs = jsFilesExists
    ? spawn.sync(
        'eslint',
        [
          `${projectPath}/**/*.{js,jsx}`,
          '-c',
          jsRcPath,
          '--ignore-path',
          ignoreFile,
        ],
        { stdio: 'inherit' },
      )
    : {}

  const resultTs = tsFilesExists
    ? spawn.sync(
        'eslint',
        [
          `${projectPath}/**/*.{ts,tsx}`,
          '-c',
          tsRcPath,
          '--ignore-path',
          ignoreFile,
        ],
        { stdio: 'inherit' },
      )
    : {}

  if (
    resultJs.error ||
    resultTs.error ||
    resultJs.status === 1 ||
    resultTs.status === 1
  ) {
    return { status: 1 }
  }

  return { status: 0 }
}
