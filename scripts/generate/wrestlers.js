const glob = require("glob")
const jsonfile = require("jsonfile")
const imagePath = __dirname + "/import/"
import { hashCode } from "../../src/helpers/hash"
const ratings = require("./ratings")

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

const toSlug = (string) => {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, "-") // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, "")  // remove leading, trailing -
    .trim()
}

glob(imagePath + "**/**.png", function (er, files) {
  files.forEach((filepath) => {
    var newFilepath = filepath.replace(imagePath, "")
    newFilepath = newFilepath.split("/")
    var brand = newFilepath[0]
    var male = newFilepath.length === 3 ? false : true
    var name = cleanFilename(newFilepath[newFilepath.length - 1])
    var rating = ratings.filter((drop) => drop.name === name)
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
