const path = require('path')
const spawn = require('cross-spawn')
const editJsonFile = require('edit-json-file')

const modifyPackageJson = projectPath => {
  const projectPackageJson = editJsonFile(
    path.join(projectPath, 'package.json'),
  )

  projectPackageJson.unset('husky')
  projectPackageJson.unset('lint-staged')
  projectPackageJson.unset('commitlint')
  projectPackageJson.unset('publishConfig')
  projectPackageJson.unset('scripts.s')

  projectPackageJson.set('husky', {
    hooks: {
      'pre-commit': 'yarn soda lint-staged',
      'commit-msg':
        "commitlint -E HUSKY_GIT_PARAMS -x '@commitlint/config-conventional'",
    },
  })
  projectPackageJson.set('publishConfig', {
    access: 'public',
  })
  projectPackageJson.set('scripts.s', 'yarn soda')
  projectPackageJson.set('scripts.postinstall', 'yarn soda post-install')

  projectPackageJson.save()
}

module.exports = async ({ projectPath }) => {
  modifyPackageJson(projectPath)

  return spawn.sync('yarn', ['soda', 'post-install'], { stdio: 'inherit' })
}
