#!/usr/bin/env node
const path = require('path')

const script = process.argv[2]

const context = {
  projectPath: process.cwd()
}

const existScripts = ['lint', 'pretty']

if (existScripts.includes(script)) {
  const { status } = require(path.join('../scripts', script))(context)
  process.exit(status)
} else {
  console.log(`Unknown script "${script}".`)
  process.exit(1)
}
