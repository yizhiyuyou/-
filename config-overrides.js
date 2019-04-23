const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  disableEsLint,
  useEslintRc,
  addDecoratorsLegacy,
} = require('customize-cra')
const path = require('path')

module.exports = override(
  useEslintRc(),
  addDecoratorsLegacy(),
  disableEsLint(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
  }),
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src"),
  }),
)
