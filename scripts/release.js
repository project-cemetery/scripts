const spawn = require('cross-spawn');

module.exports = async () => {
  const result = spawn.sync('standard-version', {
    stdio: 'inherit',
  });

  return result;
};
