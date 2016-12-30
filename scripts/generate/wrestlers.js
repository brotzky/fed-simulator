const glob = require("glob")
const imagePath = __dirname + "/import/wrestlers/"
import { hashCode } from "../../src/helpers/hash"
import { writeFile, cleanFilename } from "./common"
const meta = require("./meta")

let collection = []

glob(imagePath + "**/**.png", function (er, files) {
  files.forEach((filepath) => {
    let newFilepath = filepath.replace(imagePath, "")
    newFilepath = newFilepath.split("/")
    let brand = newFilepath[0]
    let male = newFilepath.length === 3 ? false : true
    let name = cleanFilename(newFilepath[newFilepath.length - 1])
    let rating = meta.filter((wrestler) => wrestler.name === name)
    rating = rating[0] ? rating[0].rating: 0

    collection.push({
      id: hashCode(name),
      name: name,
      brand: brand,
      rating: rating,
      male: male,
      wins: 0,
      losses: 0
    })
  })
  return writeFile(
    "src/reducers/wrestlers.default.json",
    collection,
  )
})
