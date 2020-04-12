const hasDependency = (package) => (dependency) => Boolean(package.get(`dependencies.${dependency}`) || package.get(`devDependencies.${dependency}`))

module.exports = hasDependency