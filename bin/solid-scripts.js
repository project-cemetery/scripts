#!/usr/bin/env node

const spawn = require('cross-spawn')

const mrmArgs = [
    'main', '--preset', '@solid-soda/scripts',
]
const spawnArgs ={ stdio: 'inherit' }

const fullArgs = process.argv.join('')
const isNpx = fullArgs.includes('npm') && fullArgs.includes('npx')
const isDlx = fullArgs.includes('yarn') && fullArgs.includes('berry')

if (!isNpx && !isDlx) {
    spawn.sync(
        'npm',
        [
            'install',
            '-g',
            'mrm',
        ],
        spawnArgs,
    )

    spawn.sync(
        'mrm',
        mrmArgs,
        spawnArgs,
    )
}

if (isDlx) {
    spawn.sync(
        'yarn',
        [
            'dlx', 'mrm', ...mrmArgs,
        ],
        spawnArgs,
    )
}

if (isNpx) {
    spawn.sync(
        'npx',
        [
            'mrm', ...mrmArgs,
        ],
        spawnArgs,
    )
}

