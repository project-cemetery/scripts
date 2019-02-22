#!/usr/bin/env node

const path = require('path')
const { bootstrap } = require('commitizen/dist/cli/git-cz')

const projectPath = process.argv[2]

bootstrap({
  cliPath: path.join(projectPath, './node_modules/commitizen'),
  config: {
    path: 'cz-conventional-changelog',
  },
})
