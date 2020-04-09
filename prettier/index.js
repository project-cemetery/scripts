const { json, install, packageJson } = require('mrm-core');

function task() {
  // generate config
  const config = json('.prettierrc')
  config.set({
    trailingComma: 'all',
    singleQuote: true,
  })

  config.save()

  // dependencies
  install('prettier');

  // scripts
  const package = packageJson()
  package.setScript('pretty', 'prettier --write .')
  package.save()
}

task.description = 'Sync Prettier config';

module.exports = task
