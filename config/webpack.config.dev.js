var webpack = require('webpack')
var path = require('path')
var paths = require('./paths')
var HtmlWebpackPlugin = require('html-webpack-plugin')
require('./environment')
const defaultConfig = require('./webpack.common')
import { log } from './log'

const devConfig = Object.assign({}, defaultConfig, {
  devtool: "source-map",
  devServer: {
    contentBase: './build/',
    hot: true,
    historyApiFallback: true,
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    require.resolve('./polyfills'),
    path.join(paths.appSrc, 'index'),
  ],
  watch: true,
})

devConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
devConfig.plugins.push(
  new HtmlWebpackPlugin({
    inject: true,
    template: paths.appHtml,
  })
)
devConfig.module.rules.push(
  {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
  }
)
log('Webpack dev config finished')
module.exports = devConfig
