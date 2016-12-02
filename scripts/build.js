process.env.NODE_ENV = 'production'

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import filesize from 'filesize'
import { sync as gzipSize } from 'gzip-size'
import { sync as rimrafSync } from 'rimraf'
import webpack from 'webpack'
import config from '../config/webpack.config.prod'
import paths from '../config/paths'
import { log, error, exit } from '../config/log'

log('Emptying build directory')
rimrafSync(paths.appBuild + '/*')

log('Creating an optimized production build')
webpack(config).run(function(err, stats) {
  if (err) {
    error('Failed to create a production build')
    error(err.message || err)
    process.exit(1)
  }

  log(chalk.green('Compiled successfully.'))
  log('File sizes after gzip:')

  var assets = stats.toJson().assets
    .filter(asset => /\.(js|css|png|mp3|jpg)$/.test(asset.name))
    .map(asset => {
      var fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name)
      var size = gzipSize(fileContents)
      return {
        folder: path.join('build', path.dirname(asset.name)),
        name: path.basename(asset.name),
        size: size,
        sizeLabel: filesize(size)
      }
    })
  assets.sort((a, b) => b.size - a.size)

  var longestSizeLabelLength = Math.max.apply(null,
    assets.map(a => a.sizeLabel.length)
  )
  assets.forEach(asset => {
    var sizeLabel = asset.sizeLabel
    if (sizeLabel.length < longestSizeLabelLength) {
      var rightPadding = ' '.repeat(longestSizeLabelLength - sizeLabel.length)
      sizeLabel += rightPadding
    }
    log(
      chalk.green(sizeLabel) +
      '  ' + chalk.dim(asset.folder + path.sep) +
      chalk.cyan(asset.name)
    )
  })
  log(
    chalk.green('Build production completed'),
    chalk.italic(paths.appBuild + '/*')
  )
  process.on('exit', (code) => {
    exit('closing')
  });
  process.exit()
})
