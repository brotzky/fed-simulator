const glob = require("glob")
const jsonfile = require("jsonfile")
const imagePath = __dirname + "/import/wrestlers/"
import { hashCode } from "../../src/helpers/hash"
const meta = require("./meta")

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
    "src/reducers/wrestlers.default.json",
    wrestlers,
    (err) => "Error: " + console.error(err)
  )
  return
}

glob(imagePath + "**/**.png", function (er, files) {
  files.forEach((filepath) => {
    var newFilepath = filepath.replace(imagePath, "")
    newFilepath = newFilepath.split("/")
    var brand = newFilepath[0]
    var male = newFilepath.length === 3 ? false : true
    var name = cleanFilename(newFilepath[newFilepath.length - 1])
    var rating = meta.filter((wrestler) => wrestler.name === name)
    rating = rating[0] ? rating[0].rating: 0

    collection.push({
      id: hashCode(name),
      name: name,
      brand: brand,
      rating: rating,
      male: male,
    })
  })
  return writeCollection(collection)
})
