process.on('unhandledRejection', err => {
	console.trace(err)
});

const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const getProcessForPort = require('./utils/getProcessForPort');
const detect = require('detect-port');
const prompt = require('./utils/prompt')
const config = require('../config/webpack.config.dev')
import {log, error} from '../config/log'
const isInteractive = process.stdout.isTTY;

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  );
}

log('Start development server')

const DEFAULT_PORT = process.env.PORT || 8080

function alertTerminal() {
  log(chalk.green('Done!'))
}

var compiler
// TODO: hide this behind a flag and eliminate dead code on eject.
// This shouldn't be exposed to the user.
var handleCompile
var isSmokeTest = process.argv.some(arg => arg.indexOf('--smoke-test') > -1)
if (isSmokeTest) {
  handleCompile = function(err, stats) {
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
  return (
    message
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
  )
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
      return
    }

    var json = stats.toJson()
    var formattedErrors = json.errors.map(
      message => 'Error in ' + formatMessage(message)
    )
    var formattedWarnings = json.warnings.map(
      message => 'Warning in ' + formatMessage(message)
    )

    if (hasErrors) {
      error('Failed to compile')
      if (formattedErrors.some(isLikelyASyntaxError)) {
        formattedErrors = formattedErrors.filter(isLikelyASyntaxError)
      }
      formattedErrors.forEach(message => {
        alertTerminal('error.mp3')
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
      log(
        'Use ' +
          chalk.yellow('// eslint-disable-next-line') +
          ' to ignore the next line.'
      )
      log(
        'Use ' +
          chalk.yellow('/* eslint-disable */') +
          ' to ignore all warnings in a file.'
      )
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
    clientLogLevel: 'error',
    devServer: {
      hot: true,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  }).listen(port, err => {
    if (err) {
      alertTerminal()
      return error(err)
    }
    alertTerminal()
    log('Development server started')
  })
}

function run(port) {
  setupCompiler(port)
  runDevServer(port)
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
detect(DEFAULT_PORT).then(port => {
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  if (isInteractive) {
    clearConsole();
    const existingProcess = getProcessForPort(DEFAULT_PORT);
    const question = chalk.yellow(
      `Something is already running on port ${DEFAULT_PORT}.` +
        `${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}`
    ) + '\n\nWould you like to run the app on another port instead?';

    prompt(question, true).then(shouldChangePort => {
      if (shouldChangePort) {
        run(port);
      }
    });
  } else {
    console.log(
      chalk.red(`Something is already running on port ${DEFAULT_PORT}.`)
    );
  }
});
