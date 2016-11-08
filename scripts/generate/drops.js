// const async = require("asyncawait/async")
// const await = require("asyncawait/await")
// const Promise = require("bluebird")
// const fs = Promise.promisifyAll(require("fs"))
// lowercase directory: for i in `find . -name "*" -type f |grep -e "[A-Z]"`; do j=`echo $i | tr '[A-Z]' '[a-z]' | sed s/\-1$//`; mv $i $i-1; mv $i-1 $j; done
const glob = require("glob")
const jsonfile = require("jsonfile")
const imagePath = "src/imgs/import/"

jsonfile.spaces = 2
var collection = []

const cleanFilename = (filename) => {
  filename = filename.replace(".png", "")
  return filename
    .split("-")
    .map((word, key) => word.replace(/^[a-z]/, (m) => {
      return m.toUpperCase()
    }))
    .join(" ")
}

const writeCollection = (wrestlers) => {
  jsonfile.writeFile(
    "src/reducers/drops.default.json",
    wrestlers,
    (err) => "Error: " + console.error(err)
  )
  return
}

const toSlug = (string) => {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, "-") // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, "")  // remove leading, trailing -
}

glob(imagePath + "**/**.png", function (er, files) {
  var count = 1
  files.forEach((filepath) => {
    var newFilepath = filepath.replace(imagePath, "")
    newFilepath = newFilepath.split("/")
    var bucket = newFilepath[0]
    var male = newFilepath.length === 3 ? false : true

    collection.push({
      id: count++,
      name: cleanFilename(newFilepath[newFilepath.length - 1]),
      bucket: bucket,
      male: male,
    })
  })
  return writeCollection(collection)
})



//
// const imagePaths = [
//   "src/imgs/wrestlers/Raw",
//   "src/imgs/wrestlers/Smackdown",
// ]
// let count = 0
//
// const getFilenames = async (function (directories) {
//   directories.forEach((directory) => {
//     console.log(directory)
//     let filenames = await (fs.readdirAsync(directory))
//     console.log(filenames)
//     filenames = cleanFilenames(filenames)
//     filenames = createCollection(filenames)
//   })
//   return filenames
// })
//
// const cleanFilenames = (filenames) => {
//   filenames.forEach((filename, key) => {
//     filenames[key] = cleanFilename(filename)
//   })
//   return filenames
// }
//
// const cleanFilename = (filename) => {
//   if (filename === undefined) {
//     return false
//   }
//   filename = filename.replace(".png", "")
//   return filename
//     .split("-")
//     .map((word, key) => word.replace(/^[a-z]/, (m) => {
//       return m.toUpperCase()
//     }))
//     .join(" ")
// }
//
// const createCollection = (filenames) => {
//   let collection = []
//   filenames.forEach((filename) => {
//     collection.push({
//       id: count++,
//       name: filename,
//       bucket: "Raw",
//       male: true
//     })
//   })
//   return collection
// }
//
// const writeCollection = (wrestlers) => {
//   jsonfile.writeFile(
//     "src/reducers/drops.default.json",
//     wrestlers,
//     (err) => "Error: " + console.error(err)
//   )
// }
//
// getFilenames(imagePaths)
//   .then (function (drops) {
//     writeCollection(drops)
//     console.log("Drops written")
//   })
//   .catch(function (err) {
//     console.log("Something went wrong: " + err)
//   })
