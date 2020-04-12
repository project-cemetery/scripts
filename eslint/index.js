const { packageJson, json, install, uninstall, lines } = require('mrm-core');
const { difference, merge } = require('lodash')

const overwrite = require('../utils/overwrite')
const hasDependency = require('../utils/hasDependency')
const clearConfigs = require('../utils/clearConfigs')
const generateExecuteScript = require('../utils/generateExecuteScripts')
const withVersions = require('../utils/withVersions')
const createExtString = require('../utils/createExtString')
const getDefaultIgnore = require('../utils/getDefaultIgnore')
const overwrite = require('../utils/overwrite')

const baseConfig = require('./config/eslint-base')
const jsConfig = require('./config/eslint-js')
const tsConfig = require('./config/eslint-ts')
const reactConfig = require('./config/eslint-react')

const baseDependencies = ['eslint', 'eslint-plugin-import-helpers', 'eslint-plugin-unicorn']
const jsDependencies = ['babel-eslint']
const tsDependencies = ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']
const reactDependencies = ['eslint-plugin-react', 'eslint-plugin-react-hooks']

const jsExtensions = ['js', 'jsx']
const tsExtensions = ['ts', 'tsx']

function task() {
    clearConfigs({
        files: ['.eslintrc.js', '.eslintrc.cjs', '.eslintrc.yaml', '.eslintrc.yml', '.eslintrc.json'],
        packageJsonPath: 'eslintConfig'
    })

    // prepare
    const packageHasDependency = hasDependency(packageJson())

    const hasTypeScript = packageHasDependency('typescript')
    const languageConfig =  hasTypeScript ? tsConfig : jsConfig
    const languageDependencies = hasTypeScript ? tsDependencies : jsDependencies
    const languageExtensions = hasTypeScript ? tsExtensions : jsExtensions

    let additionalConfig = {}
    const additionalDependencies = []

    const hasReact = packageHasDependency('react')
    if (hasReact) {
        additionalConfig = merge(additionalConfig, reactConfig)
        additionalDependencies.push(...reactDependencies)
    }

    // generate config
    overwrite(json, '.eslintrc')
        .merge(baseConfig)
        .merge(languageConfig)
        .merge(additionalConfig)
        .save()

    overwrite(lines, '.eslintignore')
        .add(...getDefaultIgnore())
        .save();

    // dependencies
    const allDependencies = [...baseDependencies, ...jsDependencies, ...tsDependencies, ...reactDependencies]
    const installDependencies = [...baseDependencies, ...languageDependencies, ...additionalDependencies]

    const uninstallDependencies = difference(allDependencies, installDependencies)
    uninstall(uninstallDependencies)

    install(...withVersions(installDependencies));

    // scripts
    packageJson()
        .setScript('lint:code', generateExecuteScript(`eslint "./**/*.${createExtString(languageExtensions)}"`))
        .save()
}

task.description = 'Sync ESLint config';

module.exports = task
