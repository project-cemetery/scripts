const spawn = require('cross-spawn');

module.exports = async () => {
  return spawn.sync(
    'commitlint',
    ['-E', 'HUSKY_GIT_PARAMS', '-x', '@commitlint/config-conventional'],
    { stdio: 'inherit' },
  );
};
