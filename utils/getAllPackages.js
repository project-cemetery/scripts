const fse = require('fs-extra');

const { findFiles } = require('./findFiles');

const getAllPackages = async projectPath => {
  const files = await findFiles(
    projectPath,
    ['node_modules', '.git'],
    'package.json',
  );

  const contents = await Promise.all(files.map(name => fse.readFile(name)));

  return contents;
};

module.exports = {
  getAllPackages,
};
