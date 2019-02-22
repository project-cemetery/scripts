const spawn = require('cross-spawn')
const path = require('path')

module.exports = ({ projectPath }) => {
  const jsRcPath = path.join(__dirname, '../config/eslint-js.js')
  const tsRcPath = path.join(__dirname, '../config/eslint-ts.js')

  const ignoreFile = path.join(projectPath, '.gitignore')

  const resultJs = spawn.sync(
    'eslint',
    [`${projectPath}/**/*.{js,jsx}`, '-c', jsRcPath, '--ignore-path', ignoreFile],
    { stdio: 'inherit' }
  )

  const resultTs = spawn.sync(
    'eslint',
    [`${projectPath}/**/*.{ts,tsx}`, '-c', tsRcPath, '--ignore-path', ignoreFile],
    { stdio: 'inherit' }
  )

  if (resultJs.error || resultTs.error || resultJs.status || resultTs.status) {
    return { status: 1 }
  }

  return { status: 0 }
}