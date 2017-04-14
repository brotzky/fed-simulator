const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    vendors: [
      "react",
      "react-dom",
      "react-helmet",
      "react-router",
      "redux",
      "react-redux",
      "moment",
    ],
    polyfill: require.resolve("./config/polyfills"),
    app: require.resolve("./src/index.js"),
  },
  output: {
    publicPath: "/",
    path: path.resolve("build"),
    filename: "[name].[chunkhash:6].js",
    chunkFilename: "chunk[id].[chunkhash:6].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ot|svg|woff|woff2|mp3|jpg|png)(\?.*)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("src/public/index.html"),
    }),
  ],
}
