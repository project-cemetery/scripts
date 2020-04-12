const { yaml } = require('mrm-core');

const generateExecuteScript = (command) => {
  const isYarnBerryPackage = yaml('.yarnrc.yml').exists();

  if (isYarnBerryPackage) {
    return `yarn ${command}`;
  }

  return command;
};

module.exports = generateExecuteScript;
