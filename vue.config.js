// vue.config.js
module.exports = {
    // 选项...
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    lintOnSave: process.env.NODE_ENV !== 'production'

}