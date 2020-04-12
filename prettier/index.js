const { json, install, packageJson, lines } = require('mrm-core');

const overwrite = require('../utils/overwrite')
const clearConfigs = require('../utils/clearConfigs')
const generateExecuteScript = require('../utils/generateExecuteScripts')
const withVersions = require('../utils/withVersions')
const getDefaultIgnore = require('../utils/getDefaultIgnore')

function task() {
  clearConfigs({
    files: ['.prettierrc.json', '.prettierrc.yml', '.prettierrc.yaml', '.prettierrc.js', 'prettier.config.js', '.prettierrc.toml'],
    packageJsonPath: 'prettier'
  })

  // generate config
  overwrite(json, '.prettierrc')
    .set({
      trailingComma: 'all',
      singleQuote: true,
    })
    .save()

  overwrite(lines, '.prettierignore')
    .add(getDefaultIgnore())
    .save()

  // dependencies
  install(...withVersions(['prettier']));

  // scripts
  packageJson()
    .setScript('pretty', generateExecuteScript('prettier --write .'))
    .save()
}

task.description = 'Sync Prettier config';

module.exports = task
