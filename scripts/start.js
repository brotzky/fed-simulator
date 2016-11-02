const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const execSync = require('child_process').execSync
const opn = require('opn')
const detect = require('./utils/detectPort')
const prompt = require('./utils/prompt')
const config = require('../config/webpack.config.dev')
import { log, error } from '../config/log'

log('Start development server')

const DEFAULT_PORT = process.env.PORT || 3000
var compiler

// TODO: hide this behind a flag and eliminate dead code on eject.
// This shouldn't be exposed to the user.
var handleCompile
var isSmokeTest = process.argv.some(arg => arg.indexOf('--smoke-test') > -1)
if (isSmokeTest) {
  handleCompile = function (err, stats) {
    if (err || stats.hasErrors() || stats.hasWarnings()) {
      process.exit(1)
    } else {
      process.exit(0)
    }
  }
}

var friendlySyntaxErrorLabel = 'Syntax error:'

function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1
}

// This is a little hacky.
// It would be easier if webpack provided a rich error object.

function formatMessage(message) {
  return message
    // Make some common errors shorter:
    .replace(
      // Babel syntax error
      'Module build failed: SyntaxError:',
      friendlySyntaxErrorLabel
    )
    .replace(
      // Webpack file not found error
      /Module not found: Error: Cannot resolve 'file' or 'directory'/,
      'Module not found:'
    )
    // Internal stacks are generally useless so we strip them
    .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
    // Webpack loader names obscure CSS filenames
    .replace('./~/css-loader!./~/postcss-loader!', '')
}

function setupCompiler(port) {
  compiler = webpack(config, handleCompile)

  compiler.plugin('invalid', function() {
    log('Compiling...')
  })

  compiler.plugin('done', function(stats) {
    var hasErrors = stats.hasErrors()
    var hasWarnings = stats.hasWarnings()
    if (!hasErrors && !hasWarnings) {
      log(chalk.green('Compiled successfully'))
      const url = 'http://localhost:' + port + '/'
      log(url)
      // opn(url)
      return
    }

    var json = stats.toJson()
    var formattedErrors = json.errors.map(message =>
      'Error in ' + formatMessage(message)
    )
    var formattedWarnings = json.warnings.map(message =>
      'Warning in ' + formatMessage(message)
    )

    if (hasErrors) {
      error('Failed to compile')
      if (formattedErrors.some(isLikelyASyntaxError)) {
        formattedErrors = formattedErrors.filter(isLikelyASyntaxError)
      }
      formattedErrors.forEach(message => {
        error(message)
      })
      return
    }

    if (hasWarnings) {
      log(chalk.yellow('Compiled with warnings.'))
      formattedWarnings.forEach(message => {
        error(message)
      })

      log('You may use special comments to disable some warnings.')
      log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.')
      log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.')
    }
  })
}

function runDevServer(port) {
  new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    hot: true,
    quiet: true,
    progress: true,
    colors: true,
    clientLogLevel: "error",
    devServer: {
      hot: true
    },
    watchOptions: {
      ignored: /node_modules/
    }
  }).listen(port, (err, result) => {
    if (err) {
      return error(err)
    }
    log('Development server started')
  })
}

function run(port) {
  setupCompiler(port)
  runDevServer(port)
}

detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port)
    return
  }

  var question =
    chalk.yellow('Something is already running at port ' + DEFAULT_PORT + '.') +
    '\n\nWould you like to run the app at another port instead?'

  prompt(question, true).then(shouldChangePort => {
    if (shouldChangePort) {
      run(port)
    }
  })
})
