const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HTMLMinifier = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  minifyJS: true,
  minifyCSS: true,
}

module.exports = {
  entry: {
    vendors: [
      'react',
      'react-dom',
      'react-helmet',
      'react-router',
      'redux',
      'react-redux',
      'moment',
    ],
    polyfill: require.resolve('./config/polyfills'),
    app: require.resolve('./src/index.js'),
  },
  output: {
    publicPath: '/',
    path: path.resolve('build'),
    filename: 'static/[name].[chunkhash:6].js',
    chunkFilename: 'static/chunk.[id].[chunkhash:6].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader',],
      },
      {
        test: /\.(ot|svg|woff|woff2|mp3|jpg|png)(\?.*)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false,
      compress: {
        warnings: false,
        drop_console: false,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/public/DragDropTouch.js',
        to: 'static/DragDropTouch.js',
      },
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      minify: HTMLMinifier,
      template: path.resolve('src/public/index.html'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
}
