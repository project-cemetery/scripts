const fs = require('fs');
const path = require('path');

const isDirectory = dirPath => {
  try {
    const t = fs.lstatSync(dirPath).isDirectory();
    return t;
  } catch (e) {
    return false;
  }
};

module.exports = (projectPath, ignoreFile) =>
  fs
    .readFileSync(ignoreFile)
    .toString()
    .split('\n')
    .filter(ignorePath => isDirectory(path.resolve(projectPath, ignorePath)))
    .filter(ignorePath => ignorePath.length > 0)
    .join('|');
