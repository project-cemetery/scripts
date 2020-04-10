const { install, packageJson, json } = require('mrm-core');

const overwrite = require('../utils/overwrite')
const createExtString = require('../utils/createExtString')

const EXTS = ['tsx','ts','js','jsx','scss','css','js','json','md']

function task() {
    // dependencies
    install(['husky', 'lint-staged']);

    // config
    overwrite(json, '.lintstagedrc')
        .merge({
            [`*.{${createExtString(EXTS)}}`]: ['prettier --write'],
        })
        .save()

    packageJson()
        .merge({
            husky: {
                hooks: {
                    "pre-commit": "lint-staged",
                    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
                }
            }
        })
        .save()
}

task.description = 'Sync Husky config';

module.exports = task
