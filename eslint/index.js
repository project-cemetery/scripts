const { packageJson, json } = require('mrm-core');
const nanomerge = require('nanomerge')

const baseConfig = require('./config/eslint-base')
const jsConfig = require('./config/eslint-js')
const tsConfig = require('./config/eslint-ts')
const reactConfig = require('./config/eslint-react')

const baseDependencies = ['eslint', 'eslint-plugin-import-helpers', 'eslint-plugin-unicorn']
const jsDependencies = ['babel-eslint']
const tsDependencies = ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']
const reactDependencies = ['eslint-plugin-react', 'eslint-plugin-react-hooks']

function task() {
    const package = packageJson()

    const hasTypeScript = Boolean(package.get('dependencies.typescript'))
    const languageConfig =  hasTypeScript ? tsConfig : jsConfig
    const languageDependencies = hasTypeScript ? tsDependencies : jsDependencies

    let additionalConfig = {}
    const additionalDependencies = []

    const hasReact = Boolean(package.get('dependencies.react'))
    if (hasReact) {
        additionalConfig = nanomerge(additionalConfig, reactConfig)
        additionalDependencies.push(...reactDependencies)
    }

    // generate config
    json('.eslintrc')
        .merge(baseConfig)
        .merge(languageConfig)
        .merge(additionalConfig)
        .save()

    // dependencies
    install([...baseDependencies, ...languageDependencies, ...additionalDependencies]);

    // scripts
    packageJson()
        .setScript('lint:code', 'eslint .')
        .save()
}

task.description = 'Sync ESLint config';

module.exports = task
