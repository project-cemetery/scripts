const find = require('find')
const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

const isReactProject = async projectPath => {
  const files = await new Promise(resolve =>
    find.file(
      new RegExp('^((?!node_modules).)+?(package.json)$'),
      projectPath,
      resolve,
    ),
  )

  const contents = await Promise.all(files.map(name => readFile(name)))

  const haveReact = contents
    .map(content => JSON.parse(content))
    .map(info => info.dependencies || {})
    .map(dependencies => Object.keys(dependencies))
    .reduce((acc, cur) => [...acc, ...cur], [])
    .includes('react')

  return haveReact
}

module.exports = isReactProject
