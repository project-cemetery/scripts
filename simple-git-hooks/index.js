const { install, packageJson, uninstall } = require('mrm-core');
const spawn = require('cross-spawn');

const createExtString = require('../utils/createExtString');
const clear = require('../utils/clear');
const generateExecuteScript = require('../utils/generateExecuteScript');
const isUsingYarn = require('../utils/isUsingYarn');

const EXTS = ['tsx', 'ts', 'js', 'jsx', 'scss', 'css', 'js', 'json', 'md'];

function task() {
  clear({
    files: ['.simple-git-hooks.json', 'simple-git-hooks.json'],
  });
  clear({
    files: ['lint-staged.config.js', '.lintstagedrc'],
    packageJsonPath: 'lint-staged',
  });

  uninstall(['husky']);
  install(['simple-git-hooks', 'lint-staged']);

  packageJson()
    .set('lint-staged', {
      [`*.${createExtString(EXTS)}`]: [
        generateExecuteScript('prettier --write'),
      ],
    })
    .set('simple-git-hooks', {
      'pre-commit': generateExecuteScript('lint-staged'),
      'commit-msg': generateExecuteScript('commitlint -e'),
    })
    .unset('husky.hooks')
    .save();

  if (isUsingYarn()) {
    spawn.sync('yarn', ['simple-git-hooks'], { stdio: 'inherit' });
  } else {
    spawn.sync('npx', ['simple-git-hooks'], { stdio: 'inherit' });
  }
}

task.description = 'Sync simple-git-hooks config';

module.exports = task;
