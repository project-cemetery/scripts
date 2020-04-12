const { packageJson, deleteFiles } = require('mrm-core');

const clear = ({ files, packageJsonPath } = {}) => {
  if (Array.isArray(files) && files.length > 0) {
    deleteFiles(files);
  }

  if (packageJsonPath) {
    packageJson().unset(packageJsonPath);
  }
};

module.exports = clear;
