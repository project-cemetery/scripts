#!/usr/bin/env node

const { bootstrap } = require('commitizen/dist/cli/git-cz');
const path = require('path');

const projectPath = process.argv[2];

bootstrap({
  cliPath: path.join(projectPath, './node_modules/commitizen'),
  config: {
    path: 'cz-conventional-changelog',
  },
});
