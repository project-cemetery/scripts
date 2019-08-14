const path = require('path');
const spawn = require('cross-spawn');
const editJsonFile = require('edit-json-file');

const modifyPackageJson = projectPath => {
  const projectPackageJson = editJsonFile(
    path.join(projectPath, 'package.json'),
  );

  projectPackageJson.unset('husky');
  projectPackageJson.unset('lint-staged');
  projectPackageJson.unset('commitlint');
  projectPackageJson.unset('publishConfig');
  projectPackageJson.unset('scripts.s');

  projectPackageJson.set('husky', {
    hooks: {
      'pre-commit': 'yarn soda lint-staged',
      'pre-push': 'yarn soda lint',
      'commit-msg': 'yarn soda commitlint',
    },
  });
  projectPackageJson.set('publishConfig', {
    access: 'public',
  });
  projectPackageJson.set('scripts.s', 'yarn soda');

  projectPackageJson.save();
};

module.exports = async ({ projectPath, args = [] }) => {
  modifyPackageJson(projectPath);

  if (args.includes('--vscode')) {
    spawn.sync('yarn', ['soda', 'init-vscode'], { stdio: 'inherit' });
  }

  return spawn.sync('yarn', ['soda', 'post-install'], { stdio: 'inherit' });
};
