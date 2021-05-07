// vue.config.js
module.exports = {
    // 选项...
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    lintOnSave: process.env.NODE_ENV !== 'production',
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
      }
 
}