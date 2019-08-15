const fse = require('fs-extra');
const { flatten } = require('lodash');
const { join } = require('path');

const findFiles = async (projectPath, ignoreNames, targetName) => {
  const foundFiles = [];
  const files = await fse.readdir(projectPath);

  await Promise.all(
    files.map(async rawName => {
      const name = join(projectPath, rawName);

      if (ignoreNames.some(ignoreName => name.includes(ignoreName))) {
        return null;
      }

      const isDirectory = await fse.lstatSync(name).isDirectory();

      if (isDirectory) {
        const nestedFound = await findFiles(name, ignoreNames, targetName);
        if (nestedFound.length > 0) {
          foundFiles.push(nestedFound);
        }
        return null;
      }

      if (typeof targetName === 'string') {
        if (name.includes(targetName)) {
          foundFiles.push(name);
          return null;
        }
      } else {
        if (targetName.test(name)) {
          foundFiles.push(name);
          return null;
        }
      }

      return null;
    }),
  );

  return flatten(foundFiles);
};

module.exports = {
  findFiles,
};
