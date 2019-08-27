const spawn = require('cross-spawn');
const path = require('path');

const createExtString = require('../utils/createExtString');
const defineProjectPlugins = require('../utils/defineProjectPlugins');
const { ALLOW_PATTERN } = require('../utils/ignore');

const getPrettierExts = async projectPath => {
  const { exts } = await defineProjectPlugins(projectPath);

  return createExtString(exts.pretty);
};

module.exports = async ({ projectPath, args }) => {
  const ignoreFile = path.join(projectPath, '.gitignore');
  const rcFile = path.join(__dirname, '../config/prettier.js');

  const exts = await getPrettierExts(projectPath);

  const result = spawn.sync(
    'prettier',
    [
      '--write',
      `${projectPath}/**/${ALLOW_PATTERN}.${exts}`,
      '--config',
      rcFile,
      '--ignore-path',
      ignoreFile,
      '--plugin-search-dir=.',
      ...args,
    ],
    { stdio: 'inherit' },
  );

  return result;
};
