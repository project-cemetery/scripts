const { json, install, packageJson } = require('mrm-core');

function task() {
  // generate config
  const CONFIG_FILE = '.prettierrc'
  const oldConfig = json(CONFIG_FILE)

  if (oldConfig.exists()) {
    oldConfig.delete()
  }

  const config = json(CONFIG_FILE)
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
}

task.description = 'Sync Prettier config';

module.exports = task
