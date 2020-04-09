const { findFiles } = require('./findFiles');
const ignoreToPartOfRegexp = require('./ignoreToPartOfRegexp');

// We must skip typings
const filterTypings = (file) => !file.endsWith('d.ts');

const countFiles = (exts, projectPath, ignoreFile) => {
  const extString = exts.join('|');
  const ignorePaths = ignoreToPartOfRegexp(projectPath, ignoreFile);

  return findFiles(
    projectPath,
    ['node_modules', '.git'],
    new RegExp(`^((?!${ignorePaths}).)*(${extString})$`),
  ).then((files) => files.filter(filterTypings).length);
};

module.exports = countFiles;
