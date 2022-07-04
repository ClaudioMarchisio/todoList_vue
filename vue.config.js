module.exports = { // 多页面打包
  publicPath: './',
  pages: {
    main: {
      // page 的入口
      entry: 'src/modules/main/main.js',
      template: 'public/main.html',
      filename: 'main.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Main Page'
    }
  }
}
