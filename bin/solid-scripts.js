#!/usr/bin/env node

const commandLineArgs = require('command-line-args')

const invoke = require('./scripts/invoke')
const update = require('./scripts/update')

const definitions = [
    { name: 'command', defaultOption: true }
]

const options = commandLineArgs(definitions, { stopAtFirstUnknown: true });

switch (options.command) {
    case 'init':
    case 'update':
        update({ withSelf: true })
        break
    case 'x':
        update({ withSelf: false })
        break
    default:
        invoke()
        break;
}

