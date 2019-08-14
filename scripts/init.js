const path = require('path');
const fse = require('fs-extra');
const spawn = require('cross-spawn');
const editJsonFile = require('edit-json-file');

const projectWithDependency = require('../utils/projectWithDependency');
const countFiles = require('../utils/countFiles');
const defineProjectPlugins = require('../utils/defineProjectPlugins');

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

const initEslint = async (projectPath, ignoreFile) => {
  const eslintConfigFileName = path.join(process.cwd(), '.eslintrc.js');
  await fse.ensureFile(eslintConfigFileName);

  const [tsCount, jsCount, isReact] = await Promise.all([
    countFiles(['ts', 'tsx'], projectPath, ignoreFile),
    countFiles(['js', 'jsx'], projectPath, ignoreFile),
    projectWithDependency(projectPath, 'react'),
  ]);

  const preferTs = tsCount > jsCount;

  const configSuffix = isReact ? '-react' : '';

  const langSuffix = preferTs ? `ts` : `js`;

  const rcPath = path.relative(
    process.cwd(),
    path.join(__dirname, `../config/eslint-${langSuffix}${configSuffix}.js`),
  );

  await fse.writeFile(
    eslintConfigFileName,
    `module.exports = { "extends": "./${rcPath}" }`,
  );
};

const initStylelint = async (projectPath, ignoreFile) => {
  const stylelintConfigFileName = path.join(
    process.cwd(),
    'stylelint.config.js',
  );

  const { exts } = await defineProjectPlugins(projectPath);

  const cssFilesCount = await countFiles(exts.css, projectPath, ignoreFile);

  if (cssFilesCount > 0) {
    await fse.ensureFile(stylelintConfigFileName);

    const rcPath = path.relative(
      process.cwd(),
      path.join(__dirname, `../config/stylelint.js`),
    );

    await fse.writeFile(
      stylelintConfigFileName,
      `module.exports = { "extends": "./${rcPath}" }`,
    );
  }
};

module.exports = async ({ projectPath }) => {
  modifyPackageJson(projectPath);

  const ignoreFile = path.join(projectPath, '.gitignore');

  await Promise.all([
    initEslint(projectPath, ignoreFile),
    initStylelint(projectPath, ignoreFile),
  ]);

  return spawn.sync('yarn', ['soda', 'post-install'], { stdio: 'inherit' });
};
