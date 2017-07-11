"use strict"

const autoprefixer = require("autoprefixer")
const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin")
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")
const eslintFormatter = require("react-dev-utils/eslintFormatter")
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin")
const paths = require("./paths")
const getClientEnvironment = require("./env")

const publicPath = paths.servedPath
const shouldUseRelativeAssetPaths = publicPath === "./"
const publicUrl = publicPath.slice(0, -1)
const env = getClientEnvironment(publicUrl)

if (env.stringified["process.env"].NODE_ENV !== '"production"') {
  throw new Error("Production builds must have NODE_ENV=production.")
}

const cssFilename = "static/css/[name].[contenthash:8].css"

const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split("/").length).join("../"), }
  : {}

const extractSass = new ExtractTextPlugin({
  filename: cssFilename,
  disable: process.env.NODE_ENV === "development",
})

module.exports = {
  bail: true,
  devtool: "source-map",
  entry: {
    vendors: [
      "react",
      "react-dom",
      "react-helmet",
      "react-router",
      "redux",
      "backbone",
      "react-redux",
      "moment",
    ],
    polyfill: require.resolve("./polyfills"),
    app: paths.appIndexJs,
  },
  output: {
    path: paths.appBuild,
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath),
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules,].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: [".js", ".json", ".jsx",],
    alias: {
      "react-native": "react-native-web",
    },
    plugins: [new ModuleScopePlugin(paths.appSrc),],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.json$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve("file-loader"),
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/,],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve("style-loader"),
              use: [
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: {
                    ident: "postcss",
                    plugins: () => [
                      require("postcss-flexbugs-fixes"),
                      autoprefixer({
                        browsers: [
                          ">1%",
                          "last 4 versions",
                          "Firefox ESR",
                          "not ie < 9",
                        ],
                        flexbox: "no-2009",
                      }),
                    ],
                  },
                },
              ],
            },
            extractTextPluginOptions
          )
        ),
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
          // use style-loader in development
          fallback: "style-loader",
        }),
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
    extractSass,
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          return
        }
        console.log(message)
      },
      minify: true,
      navigateFallback: publicUrl + "/index.html",
      navigateFallbackWhitelist: [/^(?!\/__).*/,],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/,],
      stripPrefix: paths.appBuild.replace(/\\/g, "/") + "/",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
}
