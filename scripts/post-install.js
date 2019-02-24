const spawn = require('cross-spawn')

module.exports = async () => {
  try {
    const huskyInstaller = require.resolve('husky/husky.js')

    return spawn.sync('node', [huskyInstaller, 'install'], { stdio: 'inherit' })
  } catch (e) {
    return { status: 0 }
  }
}
