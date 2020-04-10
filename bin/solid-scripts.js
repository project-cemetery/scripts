#!/usr/bin/env node

const commandLineArgs = require('command-line-args')

const definitions = [
    { name: 'command', defaultOption: true }
]


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

    spawn.sync(
        'mrm',
        [
            'main', '--preset', '@solid-soda/scripts',
        ],
        { stdio: 'inherit' },
    )
}

const options = commandLineArgs(definitions, { stopAtFirstUnknown: true });
switch (options.command) {
    case 'init':
    case 'update':
        update({ withSelf: true })
        break
    default:
        update({ withSelf: false })
        break;
}

