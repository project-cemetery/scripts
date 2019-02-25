const spawn = require('cross-spawn')

module.exports = async ({ projectPath }) => {
  const result = spawn.sync('standard-version', ['--', '--path', projectPath], {
    stdio: 'inherit',
  })

  return result
}
