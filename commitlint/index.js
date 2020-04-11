const { install, json } = require('mrm-core');

const overwrite = require('../utils/overwrite')
const clearConfigs = require('../utils/clearConfigs')
const withVersions = require('../utils/withVersions')

function task() {
    clearConfigs({
        files: ['commitlint.config.js', '.commitlintrc.js', '.commitlintrc.json', '.commitlintrc.yml'],
        packageJsonPath: 'commitlint',
    })

    // dependencies
    install(...withVersions(['@commitlint/cli', '@commitlint/config-conventional']));

    // config
    overwrite(json, '.commitlintrc')
        .merge({
            extends: ['@commitlint/config-conventional']
        })
        .save()
}

task.description = 'Sync Commitlint config';

module.exports = task
