const find = require('find')

const ignoreToStirng = require('../utils/ignoreToString')

// We must skip typings
const filterTypings = file => !file.includes('d.ts')

const countFiles = (exts, projectPath, ignoreFile) =>
  new Promise(resolve => {
    const ignorePaths = ignoreToStirng(projectPath, ignoreFile)

    find.file(
      new RegExp(`^((?!${ignorePaths}).)*(${exts})$`),
      projectPath,
      files => resolve(files.filter(filterTypings).length),
    )
  })

module.exports = countFiles
