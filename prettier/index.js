const { install, packageJson, lines } = require('mrm-core');

const overwrite = require('../utils/overwrite');
const clear = require('../utils/clear');
const generateExecuteScript = require('../utils/generateExecuteScript');
const getDefaultIgnore = require('../utils/getDefaultIgnore');

function task() {
  clear({
    files: [
      '.prettierrc',
      '.prettierrc.json',
      '.prettierrc.yml',
      '.prettierrc.yaml',
      '.prettierrc.js',
      'prettier.config.js',
      '.prettierrc.toml',
    ],
    packageJsonPath: 'prettier',
  });

  overwrite(lines, '.prettierignore').add(getDefaultIgnore()).save();

  install('prettier');

  packageJson()
    .setScript('pretty', generateExecuteScript('prettier --write .'))
    .set('prettier', {
      trailingComma: 'all',
      singleQuote: true,
    })
    .save();
}

task.description = 'Sync Prettier config';

module.exports = task;
