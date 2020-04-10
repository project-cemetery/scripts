const spawn = require('cross-spawn');

const invoke = require('./invoke')

const update = ({ withSelf } = {}) => {
    const packages = ['mrm']

    if (withSelf) {
        packages.push('@solid-soda/scripts')
    }

    spawn.sync(
        'npm',
        [
            'install',
            '-g',
            ...packages,
        ],
        { stdio: 'inherit' },
    )

    invoke()
}

module.exports = update