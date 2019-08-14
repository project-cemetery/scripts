const ignoreToStirng = require('../utils/ignoreToString');
const { findFiles } = require('./findFiles');

// We must skip typings
const filterTypings = file => !file.endsWith('d.ts');

const countFiles = (exts, projectPath, ignoreFile) => {
  const extString = exts.join('|');
  const ignorePaths = ignoreToStirng(projectPath, ignoreFile);

  return findFiles(
    projectPath,
    ['node_modules', '.git'],
    new RegExp(`^((?!${ignorePaths}).)*(${extString})$`),
  ).then(files => files.filter(filterTypings).length);
};

module.exports = countFiles;
