const { json, install, packageJson } = require('mrm-core');

const overwrite = require('../utils/overwrite')
const createExtString = require('../utils/createExtString')

const baseConfig = require('./config/stylelint-base')

const EXTS = ['css']

function task() {
    // generate config
    overwrite(json, '.stylelintrc')
        .merge(baseConfig)
        .save()

    // dependencies
    install(['stylelint', 'stylelint-config-recess-order', 'stylelint-config-recommended']);

    // scripts
    packageJson()
        .setScript('lint:styles', `stylelint ./**/*.${createExtString(EXTS)}`)
        .save()
}

task.description = 'Sync Stylelint config';

module.exports = task
