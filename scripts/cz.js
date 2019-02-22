#!/usr/bin/env node

const path = require('path')
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap

const [_1, _2, projectPath] = process.argv

bootstrap({
  cliPath: path.join(projectPath, './node_modules/commitizen'),
  config: {
    path: "cz-conventional-changelog"
  }
})
