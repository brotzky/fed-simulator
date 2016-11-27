const glob = require("glob")
const jsonfile = require("jsonfile")
const imagePath = __dirname + "/import/championships/"
import { hashCode } from "../../src/helpers/hash"

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
    "src/reducers/championships.default.json",
    wrestlers,
    (err) => "Error: " + console.error(err)
  )
  return
}

glob(imagePath + "**/**.png", function (er, files) {
  files.forEach((filepath) => {
    var newFilepath = filepath.replace(imagePath, "")
    newFilepath = newFilepath.split("/")
    var name = cleanFilename(newFilepath[newFilepath.length - 1])

    collection.push({
      id: hashCode(name),
      name: name,
    })
  })
  return writeCollection(collection)
})
