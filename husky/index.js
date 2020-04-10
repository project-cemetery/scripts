const { install, packageJson, json } = require('mrm-core');

const overwrite = require('../utils/overwrite')
const createExtString = require('../utils/createExtString')
const clearConfigs = require('../utils/clearConfigs')
const generateExecuteScript = require('../utils/generateExecuteScripts')

const EXTS = ['tsx','ts','js','jsx','scss','css','js','json','md']

function task() {
    clearConfigs({
        files: ['.huskyrc.js', 'husky.config.js'],
    })
    clearConfigs({
        files: ['lint-staged.config.js'],
        packageJsonPath: 'lint-staged'
    })

    // dependencies
    install(['husky', 'lint-staged']);

    // config
    overwrite(json, '.lintstagedrc')
        .merge({
            [`*.{${createExtString(EXTS)}}`]: [generateExecuteScript('prettier --write')],
        })
        .save()

    packageJson()
        .merge({
            husky: {
                hooks: {
                    "pre-commit": generateExecuteScript("lint-staged"),
                    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
                }
            }
        })
        .save()
}

task.description = 'Sync Husky config';

module.exports = task
