const fs = require('fs-extra')
const path = require('path')
const util = require('util')
const editJsonFile = require('edit-json-file')

const countFiles = require('../utils/countFiles')

const ensureFile = util.promisify(fs.ensureFile)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const escapeEslintParams = async filePath => {
  const fileContent = await readFile(filePath)
  const newContent = fileContent.toString().replace(/eslint./g, 'eslint')

  await writeFile(filePath, newContent)
}

const unescapeEslintParams = async filePath => {
  const fileContent = await readFile(filePath)
  const newContent = fileContent.toString().replace(/eslint/g, 'eslint.')

  await writeFile(filePath, newContent)
}

const modifySettings = async (projectPath, ignoreFile) => {
  const vsCodeSettingsFilePath = path.join(projectPath, '.vscode/settings.json')
  await ensureFile(vsCodeSettingsFilePath)

  const [tsCount, jsCount] = await Promise.all([
    countFiles('ts|tsx', projectPath, ignoreFile),
    countFiles('js|jsx', projectPath, ignoreFile),
  ])
  const preferTs = tsCount > jsCount
  const rules = preferTs ? 'eslint-ts.js' : 'eslint-js.js'

  await escapeEslintParams(vsCodeSettingsFilePath)

  const vsCodeSettings = editJsonFile(vsCodeSettingsFilePath)
  vsCodeSettings.set('eslintvalidate', [
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact',
  ])
  vsCodeSettings.set('eslintoptions', {
    configFile: `./node_modules/@solid-soda/scripts/config/${rules}`,
  })
  vsCodeSettings.save()

  await unescapeEslintParams(vsCodeSettingsFilePath)
}

module.exports = async ({ projectPath }) => {
  const ignoreFile = path.join(projectPath, '.gitignore')

  await modifySettings(projectPath, ignoreFile)

  return { status: 0 }
}
