const spawn = require('cross-spawn');

const invoke = require('./invoke')

const update = () => {
    const packages = ['mrm', '@solid-soda/scripts']

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