const spawn = require('cross-spawn');

module.exports = async () => {
  const result = spawn.sync('fixpack', { stdio: 'inherit' });

  return result;
};
