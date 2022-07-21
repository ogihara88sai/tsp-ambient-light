window.addEventListener('DOMContentLoaded', () => {
  for (const dependency of ['chrome', 'node', 'electron']) {
    window.console.log(`${dependency} = ${process.versions[dependency]}`)
  }
})
