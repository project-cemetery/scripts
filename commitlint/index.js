const { install, packageJson } = require('mrm-core');

const clear = require('../utils/clear');
const generateExecuteScript = require('../utils/generateExecuteScript');

function task() {
  clear({
    files: [
      '.commitlintrc',
      'commitlint.config.js',
      '.commitlintrc.js',
      '.commitlintrc.json',
      '.commitlintrc.yml',
    ],
    packageJsonPath: 'commitlint',
  });

  install('@commitlint/cli', '@commitlint/config-conventional');

  packageJson()
    .set('commitlint', {
      extends: ['@commitlint/config-conventional'],
    })
    .setScript('commit', generateExecuteScript('commit'))
    .save();
}

task.description = 'Sync Commitlint config';

module.exports = task;
