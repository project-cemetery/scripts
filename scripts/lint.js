const spawn = require('cross-spawn')
const path = require('path')
const { flatMap } = require('lodash')

const countFiles = require('../utils/countFiles')
const projectWithDependency = require('../utils/projectWithDependency')
const defineProjectPlugins = require('../utils/defineProjectPlugins')
const createExtString = require('../utils/createExtString')

const preparePlugins = plugins =>
  flatMap(plugins, plugin => ['--plugin', plugin])

module.exports = async ({ projectPath, args }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')

  const filesAvailable = async exts => {
    const count = await countFiles(exts, projectPath, ignoreFile)
    return count > 0
  }

  const isReact = await projectWithDependency(projectPath, 'react')

  const configSuffix = isReact ? '-react' : ''

  const jsRcPath = path.join(__dirname, `../config/eslint-js${configSuffix}.js`)
  const tsRcPath = path.join(__dirname, `../config/eslint-ts${configSuffix}.js`)
  const cssRcPath = path.join(__dirname, `../config/stylelint.js`)

  const { exts, plugins } = await defineProjectPlugins(projectPath)

  const [jsFilesExists, tsFilesExists, cssFilesExists] = await Promise.all([
    filesAvailable(['js', 'jsx', ...exts.js]),
    filesAvailable(['ts', 'tsx', ...exts.ts]),
    filesAvailable(['css', ...exts.css]),
  ])

  const eslintPlugins = preparePlugins(plugins.eslint)

  const resultJs = jsFilesExists
    ? spawn.sync(
        'eslint',
        [
          `${projectPath}/**/*.{${createExtString(['js', 'jsx'], exts.js)}}`,
          '-c',
          jsRcPath,
          '--ignore-path',
          ignoreFile,
          ...eslintPlugins,
          ...args,
        ],
        { stdio: 'inherit' },
      )
    : {}

  const resultTs = tsFilesExists
    ? spawn.sync(
        'eslint',
        [
          `${projectPath}/**/*.{${createExtString(['ts', 'tsx'], exts.ts)}}`,
          '-c',
          tsRcPath,
          '--ignore-path',
          ignoreFile,
          ...eslintPlugins,
          ...args,
        ],
        { stdio: 'inherit' },
      )
    : {}

  const resultCss = cssFilesExists
    ? spawn.sync(
        'stylelint',
        [
          `${projectPath}/**/*.{${createExtString(['css'], exts.css)}}`,
          '--config',
          cssRcPath,
          '--ignore-path',
          ignoreFile,
          ...args,
        ],
        { stdio: 'inherit' },
      )
    : {}

  if (
    resultJs.error ||
    resultTs.error ||
    resultCss.error ||
    resultJs.status === 1 ||
    resultTs.status === 1 ||
    resultCss.status === 2
  ) {
    return { status: 1 }
  }

  return { status: 0 }
}
