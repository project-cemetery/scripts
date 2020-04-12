const { uninstall, packageJson, markdown } = require('mrm-core');
const { version } = require('../package.json')

function task() {
  uninstall('@solid-soda/scripts')

  packageJson()
    .removeScript('s')
    .save()

    markdown('README.md')
    .addBadge(
        `https://img.shields.io/static/v1?label=@solid-soda/scripts&message=${version}`,
        'https://github.com/solid-soda/scripts',
        `Scripts sets up by @solid-soda/scripts v${version}`
    )
}

task.description = 'Migrate from @solid-soda/scripts v1.x.x';

module.exports = task
