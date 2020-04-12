const { install, packageJson } = require('mrm-core');

const clearConfigs = require('../utils/clearConfigs')
const withVersions = require('../utils/withVersions')
const generateExecuteScript = require('../utils/generateExecuteScript')

function task() {
    clearConfigs({
        files: ['.commitlintrc', 'commitlint.config.js', '.commitlintrc.js', '.commitlintrc.json', '.commitlintrc.yml'],
        packageJsonPath: 'commitlint',
    })

    install(...withVersions(['@commitlint/cli', '@commitlint/config-conventional']));

    packageJson()
        .set('commitlint', {
            extends: ['@commitlint/config-conventional']
        })
        .setScript('commit', generateExecuteScript('commit'))
        .save()
}

task.description = 'Sync Commitlint config';

module.exports = task
