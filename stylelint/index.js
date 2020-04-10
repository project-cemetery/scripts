const { json, install, packageJson } = require('mrm-core');

const overwrite = require('../utils/overwrite')
const createExtString = require('../utils/createExtString')
const clearConfigs = require('../utils/clearConfigs')
const generateExecuteScript = require('../utils/generateExecuteScripts')

const baseConfig = require('./config/stylelint-base')

const EXTS = ['css']

function task() {
    clearConfigs({
        files: ['.stylelintrc.json', '.stylelintrc.yaml', '.stylelintrc.yml', '.stylelintrc.js', 'stylelint.config.js'],
        packageJsonPath: 'stylelint',
    })

    // generate config
    overwrite(json, '.stylelintrc')
        .merge(baseConfig)
        .save()

    // dependencies
    install(['stylelint', 'stylelint-config-recess-order', 'stylelint-config-recommended']);

    // scripts
    packageJson()
        .setScript('lint:styles', generateExecuteScript(`stylelint "./**/*.${createExtString(EXTS)}"`))
        .save()
}

task.description = 'Sync Stylelint config';

module.exports = task