const { install, json } = require('mrm-core');
const overwrite = require('../utils/overwrite')

function task() {
    // dependencies
    install(['@commitlint/cli', '@commitlint/config-conventional']);

    // config
    overwrite(json, '.commitlintrc.json')
        .merge({
            extends: ['@commitlint/config-conventional']
        })
        .save()
}

task.description = 'Sync Commitlint config';

module.exports = task
