const { json, install, packageJson } = require('mrm-core');

const overwrite = require('../utils/overwrite')
const clearConfigs = require('../utils/clearConfigs')

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

  // dependencies
  install('prettier');

  // scripts
  packageJson()
    .setScript('pretty', 'prettier --write .')
    .save()
}

task.description = 'Sync Prettier config';

module.exports = task
