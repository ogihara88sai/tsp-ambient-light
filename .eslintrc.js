module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  globals: {
    TYRANO: true,
    $: true,
    jQuery: true,
    anime: true,
    html2canvas: true,
    __dirname: true,
    process: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
}
