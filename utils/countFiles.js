const find = require('find')

const ignoreToStirng = require('../utils/ignoreToString')

const countFiles = (exts, projectPath, ignoreFile) =>
  new Promise(resolve => {
    const ignorePaths = ignoreToStirng(projectPath, ignoreFile)

    find.file(
      new RegExp(`^((?!${ignorePaths}).)*(${exts})$`),
      projectPath,
      files => resolve(files.length),
    )
  })

module.exports = countFiles
