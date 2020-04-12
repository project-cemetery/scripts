const { install, packageJson, json } = require('mrm-core');

const createExtString = require('../utils/createExtString')
const clear = require('../utils/clear')
const generateExecuteScript = require('../utils/generateExecuteScript')
const withVersions = require('../utils/withVersions')

const EXTS = ['tsx', 'ts', 'js', 'jsx', 'scss', 'css', 'js', 'json', 'md']

function task() {
    clear({
        files: ['.huskyrc.js', 'husky.config.js'],
    })
    clear({
        files: ['lint-staged.config.js', '.lintstagedrc'],
        packageJsonPath: 'lint-staged'
    })

    install(...withVersions(['husky', 'lint-staged']));

    packageJson()
        .set('lint-staged', {
            [`*.${createExtString(EXTS)}`]: [generateExecuteScript('prettier --write')]
        })
        .set('husky.hooks',
            {
                "pre-commit": generateExecuteScript("lint-staged"),
                "commit-msg": generateExecuteScript("commitlint -E HUSKY_GIT_PARAMS")
            }

        )
        .save()
}

task.description = 'Sync Husky config';

module.exports = task
