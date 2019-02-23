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
      'pre-commit': 'lint-staged',
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    },
  })
  projectPackageJson.set('lint-staged', {
    '*.{ts,tsx,js,jsx}': ['yarn soda lint'],
    '*.{js,jsx,ts,tsx,css,json}': ['yarn soda pretty', 'git add'],
  })
  projectPackageJson.set('commitlint', {
    extends: ['@commitlint/config-conventional'],
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
