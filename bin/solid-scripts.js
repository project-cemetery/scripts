#!/usr/bin/env node
const spawn = require('cross-spawn');
const path = require('path');

const script = process.argv[2];
const args = process.argv.slice(3);

const projectPath = process.cwd();

const functionScripts = [
  'lint',
  'lint-staged',
  'pretty',
  'release',
  'init',
  'post-install',
  'commitlint',
];
const processScripts = ['cz'];

if (functionScripts.includes(script)) {
  const context = {
    projectPath,
    args,
  };

  require(path.join('../scripts', script))(context).then(({ status }) =>
    process.exit(status),
  );
}

if (processScripts.includes(script)) {
  const result = spawn.sync(
    'node',
    [require.resolve(path.join('../scripts', script)), projectPath, ...args],
    { stdio: 'inherit' },
  );
  process.exit(result.status);
}

if (![...processScripts, ...functionScripts].includes(script)) {
  console.log(`Unknown script "${script}".`);
  process.exit(1);
}
