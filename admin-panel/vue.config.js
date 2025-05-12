const path = require("path");
process.env.VUE_APP_VERSION = `3.1.8`;
process.env.VUE_APP_BUILD_ID = 'dev';
const plugins=[];
/*if(process.env.NODE_ENV === 'production'){
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  plugins.push(new BundleAnalyzerPlugin());
}*/

module.exports = {
  devServer: {
    //proxy: "http://localhost/new_vitepos/"
    proxy: "http://localhost/vite-lite"
  },
  lintOnSave: false,
  productionSourceMap: false,
  publicPath:'',
  filenameHashing: false,
  css: {
    extract: (process.env.NODE_ENV === 'development' ? false : {
      filename: 'css/admin-style.css',
    }),
    sourceMap: process.env.NODE_ENV === 'development'
  },

  configureWebpack: {
    output: {
      filename: 'js/admin-script.js',
      //chunkFilename: 'js/[name].js'
    },
    optimization: {
      splitChunks: false
    },
    plugins: plugins
  },

}