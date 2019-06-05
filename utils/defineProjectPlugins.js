const nanomerge = require('nanomerge')

const projectWithDependency = require('./projectWithDependency')

const checkSvelteProject = async projectPath => {
  const settings = {
    exts: {
      js: ['js', 'jsx'],
      ts: ['ts', 'tsx'],
      css: ['css', 'svelte'],
      pretty: ['js', 'jsx', 'ts', 'tsx', 'css', 'json'],
    },
    plugins: {
      eslint: [],
    },
  }
  
  const [haveEslintPlugin, haveSvelte, havePrettierPLugin] = await Promise.all([
    projectWithDependency(projectPath, 'eslint-plugin-svelte3'),
    projectWithDependency(projectPath, 'svelte'),
    projectWithDependency(projectPath, 'prettier-plugin-svelte'),
  ])

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
