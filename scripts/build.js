import chalk from "chalk"
import { log, error, exit } from "../config/log"
import { sync as rimrafSync } from "rimraf"

const fs = require("fs-extra")
const webpack = require("webpack")
const config = require("../config/webpack.config.prod")
const paths = require("../config/paths")
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles")
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages")
const FileSizeReporter = require("react-dev-utils/FileSizeReporter")
;("use strict")

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = "production"

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err
})

// Ensure environment variables are read.
require("../config/env")

log("Emptying build directory")
rimrafSync(paths.appBuild + "/*")

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild
const useYarn = fs.existsSync(paths.yarnLockFile)

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs,])) {
  process.exit(1)
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuild)
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild)
    // Merge with the public folder
    copyPublicFolder()
    // Start the webpack build
    return build(previousFileSizes)
  })
  .then(
    ({ warnings, }) => {
      if (warnings.length) {
        error(chalk.yellow("Compiled with warnings.\n"))
        error(warnings.join("\n\n"))
        error(
          "\nSearch for the " +
            chalk.underline(chalk.yellow("keywords")) +
            " to learn more about each warning."
        )
        error(
          "To ignore, add " +
            chalk.cyan("// eslint-disable-next-line") +
            " to the line before.\n"
        )
      } else {
        log(chalk.green("Compiled successfully.\n"))
      }

      exit()
    },
    err => {
      error(chalk.red("Failed to compile.\n"))
      error((err.message || err) + "\n")
      process.exit(1)
    }
  )

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  log("Creating an optimized production build...")

  let compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats.toJson({}, true))
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join("\n\n")))
      }
      if (process.env.CI && messages.warnings.length) {
        log(
          yellow(
            "\nTreating warnings as errors because process.env.CI = true.\n" +
              "Most CI servers set it automatically.\n"
          )
        )
        return reject(new Error(messages.warnings.join("\n\n")))
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      })
    })
  })
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  })
}
