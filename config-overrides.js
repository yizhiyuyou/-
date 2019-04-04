const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
    }),
    addWebpackAlias({
      ["@"]: path.resolve(__dirname, "src")
    }),
  ),
}
