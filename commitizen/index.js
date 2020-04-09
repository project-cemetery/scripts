const { install, packageJson } = require('mrm-core');

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
        .setScript('commit', 'git-cz')
        .save()
}

task.description = 'Sync Commitizen config';

module.exports = task
