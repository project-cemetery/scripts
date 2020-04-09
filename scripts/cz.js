#!/usr/bin/env node

const { bootstrap } = require('commitizen/dist/cli/git-cz');
const path = require('path');

const projectPath = process.argv[2];

Object.assign(process.env, {
  CZ_TYPE: ' ',
  CZ_SCOPE: 'commmon',
  CZ_SUBJECT: ' ',
  CZ_BODY: ' ',
  CZ_ISSUES: ' ',
  CZ_MAX_HEADER_WIDTH: 100,
  CZ_MAX_LINE_WIDTH: 100,
});

bootstrap({
  cliPath: path.join(projectPath, './node_modules/commitizen'),
  config: {
    path: 'cz-conventional-changelog',
  },
});
