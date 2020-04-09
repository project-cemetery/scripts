const { install, packageJson } = require('mrm-core');

function task() {
    // dependencies
    install(['cz-conventional-changelog', 'commitizen']);

    // config
    packageJson()
        .merge({
            config: {
                commitizen: {
                    path: "cz-conventional-changelog"
                }
            }
        })
        .save()
}

task.description = 'Sync Commitizen config';

module.exports = task
