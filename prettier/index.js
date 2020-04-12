const { json, install, packageJson, lines } = require('mrm-core');

const overwrite = require('../utils/overwrite')
const clearConfigs = require('../utils/clearConfigs')
const generateExecuteScript = require('../utils/generateExecuteScript')
const withVersions = require('../utils/withVersions')
const getDefaultIgnore = require('../utils/getDefaultIgnore')

function task() {
  clearConfigs({
    files: ['.prettierrc', '.prettierrc.json', '.prettierrc.yml', '.prettierrc.yaml', '.prettierrc.js', 'prettier.config.js', '.prettierrc.toml'],
    packageJsonPath: 'prettier'
  })

  overwrite(lines, '.prettierignore')
    .add(getDefaultIgnore())
    .save()

  install(...withVersions(['prettier']));

  packageJson()
    .setScript('pretty', generateExecuteScript('prettier --write .'))
    .set('prettier', {
      trailingComma: 'all',
      singleQuote: true,
    })
    .save()
}

task.description = 'Sync Prettier config';

module.exports = task
