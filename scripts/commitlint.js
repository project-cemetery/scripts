const spawn = require('cross-spawn')

module.exports = async () => {
  return spawn.sync('commitlint', ['--config', rcPath], { stdio: 'inherit' })
}
