const fs = require('fs')
const archiver = require('archiver')
const pkg = require('../package')

const zipArchive = async (targetDir) => {
  const zipPath = `${targetDir}.zip`
  const output = fs.createWriteStream(`./dist/${zipPath}`)

  const archive = archiver('zip', {
    zlib: { level: 9 },
  })

  const dir = 'docs/tyranoscript_v488/data/others/plugin/ambient_light'

  archive.pipe(output)
  archive.glob(`*.ks`, { cwd: dir }, { prefix: 'ambient_light' })
  archive.glob(`*.js`, { cwd: dir }, { prefix: 'ambient_light' })
  archive.glob(`*.txt`, { cwd: dir }, { prefix: 'ambient_light' })

  await archive.finalize()

  return
}

;(async () => {
  await zipArchive(`ambient_light_v${pkg.version}_for_TyranoV4`)
})()
