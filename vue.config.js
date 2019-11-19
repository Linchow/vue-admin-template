module.exports = {
  outputDir: 'vue-admin-template',
  publicPath: './',
  productionSourceMap: false,
  devServer:{
    port: 8060,
    open: true,
    proxy:{
      '/api':{ // 小白
          target: 'http://localhost:8061',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          },
      },
    }
  },
  lintOnSave: false,
};