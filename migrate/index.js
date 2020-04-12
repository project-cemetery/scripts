const { uninstall, packageJson } = require('mrm-core');

function task() {
  uninstall('@solid-soda/scripts')

  packageJson()
    .removeScript('s')
    .save()
}

task.description = 'Migrate from @solid-soda/scripts v1.x.x';

module.exports = task
