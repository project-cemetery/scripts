const hasDependency = (packageFile) => (dependency) =>
  Boolean(
    packageFile.get(`dependencies.${dependency}`) ||
      packageFile.get(`devDependencies.${dependency}`),
  );

module.exports = hasDependency;
