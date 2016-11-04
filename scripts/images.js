const async = require("asyncawait/async")
const await = require("asyncawait/await")
const Promise = require("bluebird")
const fs = Promise.promisifyAll(require("fs")) // adds Async() versions that return promises
const jsonfile = require("jsonfile")

jsonfile.spaces = 2

const imagePath = "src/imgs/wrestlers"
let count = 0

const writeFile = (wrestlers) => {
  jsonfile.writeFile(
    "src/reducers/drops.default.json",
    wrestlers,
    (err) => "Error: " + console.error(err)
  )
}

// Returns a list of filenames converted to real names
const cleanFilenames = (filenames) => {
  filenames.forEach((filename, key) => {
    filenames[key] = cleanFilename(filename)
  })
  return filenames
}

const cleanFilename = (filename) => {
  if (filename === undefined) {
    return false
  }
  filename = filename.replace(".png", "")
  return filename
    .split("-")
    .join(" ")
    .replace(/^[a-z]/, function(m){
      return m.toUpperCase()
    })
}

const convertFilenames = (filenames) => {
  let collection = []
  filenames.forEach((filename) => {
    collection.push({
      id: count++,
      name: filename,
      bucket: "default",
    })
  })
  return collection
}

// Returns the number of files in the given directory.
const getFilenames = async (function (dir) {
  let filenames = await (fs.readdirAsync(dir))
  filenames = cleanFilenames(filenames)
  filenames = convertFilenames(filenames)
  return filenames
})

getFilenames(imagePath)
  .then (function (drops) {
    writeFile(drops)
    console.log("Drops written")
  })
  .catch(function (err) {
    console.log("Something went wrong: " + err)
  })
