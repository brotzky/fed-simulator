const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const autoprefixer = require("autoprefixer")
const path = require("path")
const paths = require("./paths")

module.exports = {
  output: {
    publicPath: "/",
    path: paths.appBuild,
    filename: "static/[name]-[hash:8].bundle.js",
    chunkFilename: "static/[id]-[hash:8].chunk.js",
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin(
      "static/[name].css"
    ),
    new CopyWebpackPlugin([
      {
        from: paths.appPublic,
        to: "static/",
      },
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.PORT": JSON.stringify(process.env.PORT),
      "process.env.DEBUG": JSON.stringify(process.env.DEBUG),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules",
    ],
    enforceExtension: false,
    extensions: [
      ".js",
      ".scss",
      ".json",
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      {
        test: /\.js$/,
        use: [
          "babel-loader",
        ],
        exclude: /node_modules/,
        include: paths.appSrc,
      },
      {
        test: /\.(ot|svg|woff|woff2|mp3|jpg|png)(\?.*)?$/,
        include: [
          paths.appSrc,
          paths.appPublic,
          paths.appNodeModules,
        ],
        use: "file-loader",
      },
    ],
  },
}
