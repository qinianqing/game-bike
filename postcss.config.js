module.exports = {
  plugins: {
    "postcss-px-to-viewport-8-plugin": {
      unitToConvert: "px", // 需要转换的单位，默认为"px"
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
      propList: ["*"], // 能转化为vw的属性列表
      viewportUnit: "vw", // 希望使用的视口单位
      fontViewportUnit: "vw", // 字体使用的视口单位
      selectorBlackList: ["keep-px"],
      minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false, // 媒体查询里的单位是否需要转换单位
      replace: true, //  是否直接更换属性值，而不添加备用属性
      exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: "vw", // 横屏时使用的单位
      landscapeWidth: 1338 // 横屏时使用的视口宽度
    }
  }
}
