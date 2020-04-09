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
  package.appendScript('pretty', 'prettier --write .')
}

task.description = 'Sync Prettier config';

module.exports = task
