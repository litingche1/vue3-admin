// vue.config.js
const path = require("path");
module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // eslint-disable-next-line no-dupe-keys
  lintOnSave: false,
  chainWebpack: config => {
    config.module.rules.delete('svg'); //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/svg')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        prependData: `@import "./src/style/main.scss";`
      },
    }
  },
  devServer: {
    open: true, // 运行项目后是否自动打开
    host: "0.0.0.0", // 可以让外部访问
    port: 8000,
    proxy: {
      [process.env.VUE_APP_FLAG]: {
        target: process.env.VUE_APP_APIURL,
        ws: false, // webstock
        changeOrigin: true, // 是否开启跨域
        pathRewrite: {
          [`^${process.env.VUE_APP_FLAG}`]: ""
        }
      }
    }
  }
}