const { pick } = require('lodash');

const PACKAGE_VERSIONS = {
  commitizen: '^4.2.1',
  'cz-conventional-changelog': '^3.3.0',
  '@commitlint/cli': '^11.0.0',
  '@commitlint/config-conventional': '^11.0.0',
  eslint: '^7.9.0',
  'eslint-plugin-import-helpers': '^1.1.0',
  'babel-eslint': '^10.1.0',
  '@typescript-eslint/eslint-plugin': '^4.2.0',
  '@typescript-eslint/parser': '^4.2.0',
  'eslint-plugin-react': '^7.20.6',
  'eslint-plugin-react-hooks': '^4.1.2',
  'eslint-plugin-import': '^2.22.0',
  'eslint-config-airbnb-base': '^14.2.0',
  'eslint-config-prettier': '^6.11.0',
  'eslint-import-resolver-node ': '^0.3.4',
  husky: '^4.3.0',
  'lint-staged': '^10.4.0',
  prettier: '^2.1.2',
  'standard-version': '^9.0.0',
  stylelint: '^13.7.1',
  'stylelint-config-recess-order': '^2.1.0',
  'stylelint-order': '4.1.0',
  'stylelint-config-recommended': '^3.0.0',
};

const withVersions = (packages) => {
  const versions = pick(PACKAGE_VERSIONS, ...packages);

  return [packages, { versions }];
};

module.exports = withVersions;
