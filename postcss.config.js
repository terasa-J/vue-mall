module.exports = {
  plugins: {
    autoprefixer() { },
    'postcss-px-to-viewport': {
      // 视图宽度，对应设计稿宽度
      viewportWidth: 375,
      // 指定px转换为视图单位值的小数位数
      unitPrecision: 5,
      //指定转换的单位
      viewportUnit: 'vw',
      // 指定不需要转换的类
      selectorBlackList: [".ignore-"],
      // 小于或等于`1px`时不转换为视窗单位
      minPixelValue: 1,
      // 允许在媒体查询中转换，默认为false
      mediaQuery: false,
      exclude: [/TarBar/],

      // unitToConvert: 'px',
      // // 转化为vw的属性列表
      // propList: ['*'],
      // // 字体使用的单位
      // fontViewportUnit: 'vw',
      // replace: true,
      // include: undefined,
      // landscape: false,
      // landscapeUnit: 'vw',
      // landscapeWidth: 568
    }
  }
}