const nanoclone = require('nanoclone');
const nanomerge = require('nanomerge');

const { getAllPackages } = require('./getAllPackages');
const projectWithDependency = require('./projectWithDependency');

const checkSvelteProject = async (packageFiles, originalSettings) => {
  const settings = nanoclone(originalSettings);

  const [haveEslintPlugin, haveSvelte, havePrettierPLugin] = await Promise.all([
    projectWithDependency(packageFiles, 'eslint-plugin-svelte3'),
    projectWithDependency(packageFiles, 'svelte'),
    projectWithDependency(packageFiles, 'prettier-plugin-svelte'),
  ]);

  if (!haveSvelte) {
    return originalSettings;
  }

  settings.exts.css.push('svelte');

  if (haveEslintPlugin) {
    settings.exts.js.push('svelte');
    settings.plugins.eslint.push('svelte3');
  }

  if (havePrettierPLugin) {
    settings.exts.pretty.push('svelte');
  }

  return settings;
};

const defineProjectPlugins = async projectPath => {
  const packageFiles = await getAllPackages(projectPath);

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
  };

  const newSettings = await Promise.all([
    checkSvelteProject(packageFiles, settings),
  ]);

  return nanomerge(...newSettings);
};

module.exports = defineProjectPlugins;
