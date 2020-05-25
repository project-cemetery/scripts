const { pick } = require('lodash');

const PACKAGE_VERSIONS = {
  commitizen: '^4.0.4',
  'cz-conventional-changelog': '^3.1.0',
  '@commitlint/cli': '^8.3.5',
  '@commitlint/config-conventional': '^8.3.4',
  eslint: '^6.8.0',
  'eslint-plugin-import-helpers': '^1.0.2',
  'eslint-plugin-unicorn': '^18.0.1',
  'babel-eslint': '^10.1.0',
  '@typescript-eslint/eslint-plugin': '^2.27.0',
  '@typescript-eslint/parser': '^2.27.0',
  'eslint-plugin-react': '^7.19.0',
  'eslint-plugin-react-hooks': '^3.0.0',
  'eslint-plugin-import': '^2.20.2',
  'eslint-config-airbnb-base': '^14.1.0',
  'eslint-config-prettier': '^6.10.1',
  'eslint-import-resolver-node ': '^0.3.3',
  husky: '^4.2.5',
  'lint-staged': '^10.1.3',
  prettier: '^2.0.4',
  'standard-version': '^7.1.0',
  stylelint: '^13.3.1',
  'stylelint-config-recess-order': '^2.0.4',
  'stylelint-config-recommended': '^3.0.0',
};

const withVersions = (packages) => {
  const versions = pick(PACKAGE_VERSIONS, ...packages);

  return [packages, { versions }];
};

module.exports = withVersions;
