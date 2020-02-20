const spawn = require('cross-spawn');
const fse = require('fs-extra');
const path = require('path');

const createExtString = require('../utils/createExtString');
const defineProjectPlugins = require('../utils/defineProjectPlugins');
const { ALLOW_PATTERN } = require('../utils/ignore');

module.exports = async ({ projectPath }) => {
  const { exts } = await defineProjectPlugins(projectPath);

  const prettyExtensions = createExtString(exts.pretty);

  const config = {
    linters: {
      [`${ALLOW_PATTERN}.${prettyExtensions}`]: ['yarn soda pretty', 'git add'],
      'package.json': ['yarn soda fixpack', 'git add'],
    },
    concurrent: false,
  };

  const varDir = path.join(__dirname, '../var');
  const rcPath = path.join(varDir, 'lint-staged.json');

  await fse.ensureDir(varDir);
  await fse.writeFile(rcPath, JSON.stringify(config));

  return spawn.sync('lint-staged', ['--config', rcPath], { stdio: 'inherit' });
};
