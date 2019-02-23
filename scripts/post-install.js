const path = require('path')
const spawn = require('cross-spawn')
const fs = require('fs')

module.exports = async ({ projectPath }) => {
  const huskyDir = path.join(projectPath, './node_modules/husky')

  if (!fs.existsSync(huskyDir)) {
    return { status: 0 }
  }

  const huskyInstaller = path.join(huskyDir, 'husky.js')

  return spawn.sync('node', [huskyInstaller, 'install'], { stdio: 'inherit' })
}
