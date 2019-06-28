const projectWithDependency = async (contents, dependency) => {
  const haveDependency = contents
    .map(content => JSON.parse(content))
    .map(info => {
      const dependencies = info.dependencies || {}
      const devDependencies = info.devDependencies || {}

      return {
        ...dependencies,
        ...devDependencies,
      }
    })
    .map(dependencies => Object.keys(dependencies))
    .reduce((acc, cur) => [...acc, ...cur], [])
    .includes(dependency)

  return haveDependency
}

module.exports = projectWithDependency
