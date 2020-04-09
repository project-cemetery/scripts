const { install, packageJson } = require('mrm-core');

function task() {
    // dependencies
    install(['cz-conventional-changelog']);

    // config
    packageJson()
        .merge({
            config: {
                commitizen: {
                    path: "cz-conventional-changelog"
                }
            }
        })
        .appendScript('commit', 'git-cz')
        .save()
}

task.description = 'Sync Commitizen config';

module.exports = task
