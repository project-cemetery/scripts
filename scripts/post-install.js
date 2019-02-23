const path = require('path')
const spawn = require('cross-spawn')

module.exports = async ({ projectPath }) => {
  const huskyInstaller = path.join(projectPath, './node_modules/husky/husky.js')

  return spawn.sync('node', [huskyInstaller, 'install'], { stdio: 'inherit' })
}
