const fse = require('fs-extra')
const { join } = require('path')
const { flatten } = require('lodash')

const customFind = async (projectPath, ignoreNames, targetName) => {
  const foundFiles = []
  const files = await fse.readdir(projectPath)

  await Promise.all(
    files.map(async rawName => {
      const name = join(projectPath, rawName)

      if (ignoreNames.some(ignoreName => name.includes(ignoreName))) {
        return null
      }

      if (name.includes(targetName)) {
        foundFiles.push(name)
        return null
      }

      const isDirectory = await fse.lstatSync(name).isDirectory()

      if (isDirectory) {
        const nestedFound = await customFind(name, ignoreNames, targetName)
        if (nestedFound.length > 0) {
          foundFiles.push(nestedFound)
        }
      }

      return null
    }),
  )

  return flatten(foundFiles)
}

const getAllPackages = async projectPath => {
  const files = await customFind(
    projectPath,
    ['node_modules', '.git'],
    'package.json',
  )

  const contents = await Promise.all(files.map(name => fse.readFile(name)))

  return contents
}

module.exports = {
  getAllPackages,
}
