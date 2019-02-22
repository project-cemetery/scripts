#!/usr/bin/env node
const path = require('path')
const spawn = require('cross-spawn')

const script = process.argv[2]

const projectPath = process.cwd()

const functionScripts = ['lint', 'pretty', 'release', 'init']
const processScripts = ['cz']

if (functionScripts.includes(script)) {
  const context = {
    projectPath,
  }

  require(path.join('../scripts', script))(context).then(({ status }) =>
    process.exit(status),
  )
}

if (processScripts.includes(script)) {
  const result = spawn.sync(
    'node',
    [require.resolve(path.join('../scripts', script)), projectPath],
    { stdio: 'inherit' },
  )
  process.exit(result.status)
}

if (![...processScripts, ...functionScripts].includes(script)) {
  console.log(`Unknown script "${script}".`)
  process.exit(1)
}
