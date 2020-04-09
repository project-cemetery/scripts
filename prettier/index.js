const { json, install, packageJson } = require('mrm-core');

function task() {
  // generate config
  json('.prettierrc')
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
