const fs = require('fs')
const path = require('path')

const isDirectory = async dirPath => {
  try {
    return fs.lstatSync(dirPath).isDirectory()
  } catch (e) {
    return false
  }
}

module.exports = (projectPath, ignoreFile) => 
  fs
    .readFileSync(ignoreFile)
    .toString()
    .split('\n')
    .filter(ignorePath => isDirectory(path.resolve(projectPath, ignorePath)))
    .join('|')
