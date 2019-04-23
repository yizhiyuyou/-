module.exports = {
  parser: {},  // 解析器
  extends: ['react-app'], // 继承的规则 [扩展]
  plugins: [], // 插件
  rules: { // 规则
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": ["error", "never"],
    'comma-dangle': ['error', 'always-multiline'],
  },
}
