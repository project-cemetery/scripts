const { json, install, packageJson } = require('mrm-core');

const overwrite = require('../utils/overwrite')

const baseConfig = require('./config/stylelint-base')

function task() {
    // generate config
    overwrite(json, '.stylelintrc')
        .merge(baseConfig)
        .save()

    // dependencies
    install(['stylelint', 'stylelint-config-recess-order', 'stylelint-config-recommended']);

    // scripts
    packageJson()
        .setScript('lint:styles', 'stylelint .')
        .save()
}

task.description = 'Sync Stylelint config';

module.exports = task
