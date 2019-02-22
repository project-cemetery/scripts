const spawn = require('cross-spawn')
const path = require('path')
const fs = require('fs')

const isDirectory = (dirPath) => {
  try {
    return fs.lstatSync(dirPath).isDirectory()
  } catch (e) {
    return false
  }
}

module.exports = ({ projectPath }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')
  const rcFile = path.join(__dirname, '../config/prettier.js')

  const ignorePaths = fs.readFileSync(ignoreFile).toString()
    .split('\n')
    .filter((ignorePath) => isDirectory(path.resolve(projectPath, ignorePath)))
    .join('|')

  const result = spawn.sync(
    'prettier',
    ['--write', `${projectPath}/{.,,!(${ignorePaths})/**}/*.{ts,tsx,js,jsx,css,json}`, '--config', rcFile],
    { stdio: 'inherit' }
  )

  return result
}