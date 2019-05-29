const nanomerge = require('nanomerge')

const projectWithDependency = require('./projectWithDependency')

const checkSvelteProject = async projectPath => {
  const [haveEslintPlugin, haveSvelte, havePrettierPLugin] = await Promise.all([
    projectWithDependency(projectPath, 'eslint-plugin-svelte3'),
    projectWithDependency(projectPath, 'svelte'),
    projectWithDependency(projectPath, 'prettier-plugin-svelte'),
  ])

  const settings = {
    exts: {
      js: [],
      ts: [],
      css: ['svelte'],
      pretty: [],
    },
    plugins: {
      eslint: [],
    },
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
