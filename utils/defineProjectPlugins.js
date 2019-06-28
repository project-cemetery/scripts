const nanomerge = require('nanomerge')

const { getAllPackages } = require('./getAllPackages')
const projectWithDependency = require('./projectWithDependency')

const checkSvelteProject = async projectPath => {
  const packageFiles = await getAllPackages(projectPath)

  const settings = {
    exts: {
      js: ['js', 'jsx'],
      ts: ['ts', 'tsx'],
      css: ['css'],
      pretty: ['js', 'jsx', 'ts', 'tsx', 'css', 'json'],
    },
    plugins: {
      eslint: [],
    },
  }

  const [haveEslintPlugin, haveSvelte, havePrettierPLugin] = await Promise.all([
    projectWithDependency(packageFiles, 'eslint-plugin-svelte3'),
    projectWithDependency(packageFiles, 'svelte'),
    projectWithDependency(packageFiles, 'prettier-plugin-svelte'),
  ])

  if (haveSvelte) {
    settings.exts.css.push('svelte')
  }

  if (haveEslintPlugin && haveSvelte) {
    settings.exts.js.push('svelte')
    settings.plugins.eslint.push('svelte3')
  }

  if (havePrettierPLugin && haveSvelte) {
    settings.exts.pretty.push('svelte')
  }

  return settings
}

const defineProjectPlugins = async projectPath => {
  const settings = await Promise.all([
    checkSvelteProject(projectPath),
    checkSvelteProject(projectPath),
  ])

  return nanomerge(...settings)
}

module.exports = defineProjectPlugins
