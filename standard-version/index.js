const { install, packageJson } = require('mrm-core');

const clear = require('../utils/clear')
const generateExecuteScript = require('../utils/generateExecuteScript')
const withVersions = require('../utils/withVersions')

function task(params) {
    if (!params.release) {
        return
    }

    clear({
        files: ['.versionrc', '.versionrc.json', '.versionrc.js'],
        packageJsonPath: 'standard-version',
    })

    install(...withVersions(['standard-version']));

    packageJson()
        .setScript('release', generateExecuteScript("standard-version"))
        .save();
}

task.description = 'Sync Standard Version config';

module.exports = task
