const spawn = require('cross-spawn')
const path = require('path')
const find = require('find')

const ignoreToStirng = require('../utils/ignoreToString')

module.exports = async ({ projectPath }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')

  const filesAvailable = (exts) => new Promise(resolve => {
    const ignorePaths = ignoreToStirng(projectPath, ignoreFile)

    find.file(new RegExp(`^((?!${ignorePaths}).)*(${exts})$`), projectPath, (files) => {
      resolve(files.length > 0)
    })
  })

  const jsRcPath = path.join(__dirname, '../config/eslint-js.js')
  const tsRcPath = path.join(__dirname, '../config/eslint-ts.js')

  const [jsFilesExists, tsFilesExists] = await Promise.all([
    filesAvailable('js|jsx'),
    filesAvailable('ts|tsx'),
  ])

  const resultJs = jsFilesExists ? spawn.sync(
    'eslint',
    [
      `${projectPath}/**/*.{js,jsx}`,
      '-c',
      jsRcPath,
      '--ignore-path',
      ignoreFile,
    ],
    { stdio: 'inherit' },
  ) : {}

  const resultTs = tsFilesExists ? spawn.sync(
    'eslint',
    [
      `${projectPath}/**/*.{ts,tsx}`,
      '-c',
      tsRcPath,
      '--ignore-path',
      ignoreFile,
    ],
    { stdio: 'inherit' },
  ) : {}

  if (resultJs.error || resultTs.error || resultJs.status === 1 || resultTs.status === 1) {
    return { status: 1 }
  }

  return { status: 0 }
}
