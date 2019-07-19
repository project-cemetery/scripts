const spawn = require('cross-spawn')
const path = require('path')
const { flatMap } = require('lodash')

const countFiles = require('../utils/countFiles')
const projectWithDependency = require('../utils/projectWithDependency')
const defineProjectPlugins = require('../utils/defineProjectPlugins')
const createExtString = require('../utils/createExtString')

const preparePlugins = plugins =>
  flatMap(plugins, plugin => ['--plugin', plugin])

const ONLY_CSS = '--css'
const ONLY_JS = '--js'
const ONLY_TS = '--ts'

const ONLY_ARGS = [ONLY_CSS, ONLY_JS, ONLY_TS]

module.exports = async ({ projectPath, args }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')

  const only = args.find(arg => ONLY_ARGS.includes(arg))
  const clearArgs = args.filter(arg => !ONLY_ARGS.includes(arg))

  const needRun = type => !only || only === type

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
    filesAvailable(exts.js),
    filesAvailable(exts.ts),
    filesAvailable(exts.css),
  ])

  const eslintPlugins = preparePlugins(plugins.eslint)

  const resultJs =
    jsFilesExists && needRun(ONLY_JS)
      ? spawn.sync(
          'eslint',
          [
            `${projectPath}/**/*.${createExtString(exts.js)}`,
            '-c',
            jsRcPath,
            '--ignore-path',
            ignoreFile,
            ...eslintPlugins,
            ...clearArgs,
          ],
          { stdio: 'inherit' },
        )
      : {}

  const resultTs =
    tsFilesExists && needRun(ONLY_TS)
      ? spawn.sync(
          'eslint',
          [
            `${projectPath}/**/*.${createExtString(exts.ts)}`,
            '-c',
            tsRcPath,
            '--ignore-path',
            ignoreFile,
            ...eslintPlugins,
            ...clearArgs,
          ],
          { stdio: 'inherit' },
        )
      : {}

  const resultCss =
    cssFilesExists && needRun(ONLY_CSS)
      ? spawn.sync(
          'stylelint',
          [
            `${projectPath}/**/*.${createExtString(exts.css)}`,
            '--config',
            cssRcPath,
            '--ignore-path',
            ignoreFile,
            ...clearArgs,
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
