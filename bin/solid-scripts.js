#!/usr/bin/env node

const spawn = require('cross-spawn')
const inquirer = require('inquirer');
const chalk = require('chalk');
const { version } = require('../package.json')

print = (text = '', color = (v) => v) => console.log(color(`${text}`))

const getMrmArgs = (presets = []) => {
    const configs = presets.map(preset => `--config${preset}: true`)

    return [
        'main', '--preset', '@solid-soda/scripts', ...configs,
    ]
}

const spawnArgs = { stdio: 'inherit' }

const fullArgs = process.argv.join('')
const isNpx = fullArgs.includes('npm') && fullArgs.includes('npx')
const isDlx = fullArgs.includes('yarn') && fullArgs.includes('berry')

const invoke = async () => {
    print(`Hello, it is @solid-soda/scripts v.${version}`, chalk.blue.bold)
    print('We ask you a few questions for setup scripts in your project', chalk.blue)
    print()

    const answers = await inquirer.prompt([
        {
            type: 'checkbox',
            message: 'Select your project properties',
            name: 'additional',
            choices: [
                {
                    name: 'Has some styles (like css, scss)',
                    value: 'styles'
                },
                {
                    name: 'Can be released by git-tag',
                    value: 'release'
                },
            ]
        }
    ])

    print()
    print("Thank you! Let's start setup 🧉", chalk.blue)
    print()

    let globalMrm = false
    if (!isNpx && !isDlx) {
        print("Seems like you aren't using npx or yarn-dlx", chalk.yellow)
        print("We install some utils to global scope, sorry", chalk.yellow)

        spawn.sync(
            'npm',
            [
                'install',
                '-g',
                'mrm',
            ],
            spawnArgs,
        )
        globalMrm = true

        print()
        print('Utils installed globally', chalk.yellow)
        print()
    }

    print('Start scripts generation, it takes a few seconds...', chalk.blue)
    print()

    const mrmArgs = getMrmArgs(answers.additional)

    if (globalMrm) {
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

    print('All done, enjoy! 🥑', chalk.blue)
    print()
}

invoke()

