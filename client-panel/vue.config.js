const path = require("path");
const {ips}=require("./ips");


const vitepos_plugin_version = require('./vitepos_plugin_version');
process.env.VUE_APP_BUILD_ID = vitepos_plugin_version.GetBuildString();

function getProxy() {
  if (process.platform == 'darwin') {
    return 'https://wcdev.test/'
  } else {
    if (ips.includes('192.168.10.241')) {
      return 'https://wcdev.test/'
    } else if (ips.includes('192.168.10.71')) {
      return 'https://wcdev.test/'
    } else if (ips.includes('192.168.10.75')) {
      return 'http://localhost/Projects/wcdev/'
    } else if (ips.includes('192.168.10.75')) {
      return 'http://localhost/Projects/wcdev/'
    }else if (ips.includes('192.168.10.85')) {
      return 'http://localhost/projects/wc82/'
    } else if (ips.includes('192.168.10.77')) {
      return 'http://192.168.10.77/vitepos/git/vitepos-report/'
    } else if (ips.includes('192.168.10.80')) {
      return 'http://localhost/projects/new-leg'
    } else if (ips.includes('192.168.10.78')) {
      return 'http://localhost/projects/vite_rewards/'
    }
  }
}

let devServer={
  proxy:getProxy()
}
module.exports = {
  devServer: devServer,
  lintOnSave: false,
  productionSourceMap: false,
  publicPath:'',
  filenameHashing: false,
  css: {
    extract: (process.env.NODE_ENV === 'development' ? false : {
      filename: 'css/vitepos.css',
    }),
    sourceMap: process.env.NODE_ENV === 'development'
  },
  pwa: {
    name: 'vitepos',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  configureWebpack: {
    output: {
      filename: 'js/vitepos.js',
      //chunkFilename: 'js/[name].js'
    },
    optimization: {
      splitChunks: false
    },
    //devtool: 'source-map',
  },

}
