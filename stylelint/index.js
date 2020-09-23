const { json, install, packageJson, lines } = require('mrm-core');

const overwrite = require('../utils/overwrite');
const createExtString = require('../utils/createExtString');
const clear = require('../utils/clear');
const generateExecuteScript = require('../utils/generateExecuteScript');
const withVersions = require('../utils/withVersions');
const getDefaultIgnore = require('../utils/getDefaultIgnore');
const baseConfig = require('./config/stylelint-base');

const EXTS = ['css'];

function task(params) {
  if (!params.styles) {
    return;
  }

  clear({
    files: [
      '.stylelintrc.json',
      '.stylelintrc.yaml',
      '.stylelintrc.yml',
      '.stylelintrc.js',
      'stylelint.config.js',
    ],
    packageJsonPath: 'stylelint',
  });

  overwrite(json, '.stylelintrc').merge(baseConfig).save();

  overwrite(lines, '.stylelintignore').add(getDefaultIgnore()).save();

  install(
    ...withVersions([
      'stylelint',
      'stylelint-order',
      'stylelint-config-recess-order',
      'stylelint-config-recommended',
    ]),
  );

  packageJson()
    .setScript(
      'lint:styles',
      generateExecuteScript(`stylelint "./**/*.${createExtString(EXTS)}"`),
    )
    .save();
}

task.description = 'Sync Stylelint config';

module.exports = task;
