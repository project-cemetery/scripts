const fs = require('fs');

function isUsingYarn() {
  return fs.existsSync('yarn.lock');
}

module.exports = isUsingYarn;
