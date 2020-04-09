const { getAllPackages } = require('./getAllPackages');

const projectWithDependency = async (rawContents, dependency) => {
  let contents = rawContents;
  if (typeof rawContents === 'string') {
    contents = await getAllPackages(rawContents);
  }

  const haveDependency = contents
    .map((content) => JSON.parse(content))
    .map((info) => {
      const dependencies = info.dependencies || {};
      const devDependencies = info.devDependencies || {};
      const peerDependencies = info.peerDependencies || {};

      return {
        ...dependencies,
        ...devDependencies,
        ...peerDependencies,
      };
    })
    .map((dependencies) => Object.keys(dependencies))
    .reduce((acc, cur) => [...acc, ...cur], [])
    .includes(dependency);

  return haveDependency;
};

module.exports = projectWithDependency;
