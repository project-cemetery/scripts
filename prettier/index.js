const { json, install } = require('mrm-core');

function task() {
  const oldFile = json('prettier.config.js')

  if (oldFile.exists()) {
    oldFile.delete()
  }

  const file = json('prettier.config.js')
  file.set({
    trailingComma: 'all',
    singleQuote: true,
  })

  install('eslint');
  file.save()
}

task.description = 'Sync Prettier config';

module.exports = task
