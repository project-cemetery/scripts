const path = require('path')
const spawn = require('cross-spawn')

module.exports = async () => {
  const rcPath = path.join(__dirname, '../config/lint-staged.js')

  return spawn.sync('lint-staged', ['--config', rcPath], { stdio: 'inherit' })
}
