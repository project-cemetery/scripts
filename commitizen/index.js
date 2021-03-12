const { install, packageJson } = require('mrm-core');

const generateExecuteScript = require('../utils/generateExecuteScript');

function task() {
  install(['commitizen', 'cz-conventional-changelog']);

  packageJson()
    .set('config.commitizen', {
      path: 'cz-conventional-changelog',
    })
    .setScript('commit', generateExecuteScript('git-cz'))
    .save();
}

task.description = 'Sync Commitizen config';

module.exports = task;
