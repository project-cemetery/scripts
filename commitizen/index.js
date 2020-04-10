const { install, packageJson } = require('mrm-core');

const generateExecuteScript = require('../utils/generateExecuteScripts')

function task() {
    // dependencies
    install(['commitizen', 'cz-conventional-changelog']);

    // config
    packageJson()
        .merge({
            config: {
                commitizen: {
                    path: "cz-conventional-changelog"
                }
            }
        })
        .setScript('commit', generateExecuteScript('git-cz'))
        .save()
}

task.description = 'Sync Commitizen config';

module.exports = task
