import { patterns, repositories } from './grammar.js'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const grammar = {
  '$schema': 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json',
  name: 'Matry',
  scopeName: 'source.matry',
  fileTypes: ['matry'],
  patterns,
  repositories,
}

const grammarJson = JSON.stringify(grammar)
const outputPath = path.join(__dirname, '../syntaxes', 'matry-generated.tmLanguage.json')
const err = fs.writeFileSync(outputPath, grammarJson)

if (err) {
  console.error(err)
}