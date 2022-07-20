const fs = require('fs')
const fs_extra = require('fs-extra')
const pkg = require('../package')

// リードミーファイルの md → txt 変換
// ある程度加工して見やすくする
const readme = fs.readFileSync('./README.md', 'utf8')
const readme_lines = readme.toString().split('\n')
const readme_new_lines = []
let ignore_flag = false
const header = `=======================================
#
# {title}
# 
# Ver.{version}
# 
# https://github.com/ogihara88sai/{name}
#
=======================================`
readme_lines.forEach((line, i) => {
  if (ignore_flag) {
    ignore_flag = false
    return
  }
  if (i === 0) {
    line = header
      .replace('{title}', line.replace(/^# /, ''))
      .replace('{version}', pkg.version)
      .replace('{name}', pkg.name)
  }
  if (line.match(/^```$/)) {
    return
  }
  if (line.match(/^---$/)) {
    ignore_flag = true
    return
  }
  if (line.match(/^!\[/)) {
    ignore_flag = false
    return
  }
  if (line.match(/^## /)) {
    line = line.replace(/^## /, '\n\n■ ')
  }
  if (line.match(/^### /)) {
    line = line.replace(/^### /, '\n\n◆ ')
  }
  if (line.match(/\| +パラメータ +\| +説明 +\|/)) {
    return
  }
  if (line.match(/\| +-+ +\| +-+ +\|/)) {
    return
  }
  if (line.match(/\| ([a-z_ ]+) \| (.+) \|/)) {
    line = line.replace(/\| ([a-z_ ]+) \| (.+) \|/, `$1 : $2`)
  }
  line = line.replace(/ {2}$/, '')
  readme_new_lines.push(line)
})
fs_extra.writeFileSync(
  './docs/latest/data/others/plugin/ambient_light/__readme.txt',
  readme_new_lines.join('\n'),
)

const copy_from = './docs/latest/data'
const copy_to_1 = './docs/tyranoscript_v488/data'
const copy_to_2 = './docs/tyranoscript_v514b/data'

fs_extra.removeSync(copy_to_1)
fs_extra.copySync(copy_from, copy_to_1)
fs_extra.removeSync(copy_to_2)
fs_extra.copySync(copy_from, copy_to_2)
