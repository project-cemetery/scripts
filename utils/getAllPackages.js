const find = require('find')
const fse = require('fs-extra')

const getAllPackages = async projectPath => {
  const files = await new Promise(resolve =>
    find.file(
      new RegExp('^((?!node_modules).)+?(package.json)$'),
      projectPath,
      resolve,
    ),
  )

  const contents = await Promise.all(files.map(name => fse.readFile(name)))

  return contents
}

module.exports = {
  getAllPackages,
}
