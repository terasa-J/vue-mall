module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": 
    [
      2, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
      }
    ],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}