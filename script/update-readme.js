require('date-utils')
const fs = require('fs')
const pkg = require('../package')
const stats = fs.statSync('./package.json')
const mdate = new Date(stats.mtime)
const version = pkg.version
const readme = fs.readFileSync('./README.md', 'utf8')
const readme_lines = readme.toString().split('\n')
const readme_new_lines = []
for (let line of readme_lines) {
  if (line.match(/【バージョン】/)) {
    line = '【バージョン】' + version + '  '
  }
  if (line.match(/【最終更新日】/)) {
    line = '【最終更新日】' + mdate.toFormat('YYYY.MM.DD HH24:MI:SS') + '  '
  }
  readme_new_lines.push(line)
}
fs.writeFileSync('./README.md', readme_new_lines.join('\n'))
