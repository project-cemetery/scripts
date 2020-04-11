const { install, packageJson } = require('mrm-core');

const clearConfigs = require('../utils/clearConfigs')
const generateExecuteScript = require('../utils/generateExecuteScripts')


function task(params) {
    if (!params.release) {
        return
    }

    clearConfigs({
        files: ['.versionrc', '.versionrc.json', '.versionrc.js'],
        packageJsonPath: 'standard-version',
    })

    // dependencies
    install('standard-version');

    // scripts
    packageJson()
        .setScript('release', generateExecuteScript("standard-version"))
        .save();
}

task.description = 'Sync Standard Version config';

module.exports = task
