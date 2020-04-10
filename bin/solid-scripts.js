#!/usr/bin/env node

const spawn = require('cross-spawn')

const packages = ['mrm']

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
