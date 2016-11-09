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
