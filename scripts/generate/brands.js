const glob = require("glob")
const imagePath = __dirname + "/import/brands/"
import { hashCode } from "../../src/helpers/hash"
import { writeFile, cleanFilename } from "./common"

let collection = []

glob(imagePath + "**/**.png", function (er, files) {
  files.forEach((filepath) => {
    let newFilepath = filepath.replace(imagePath, "")
    newFilepath = newFilepath.split("/")
    let name = cleanFilename(newFilepath[newFilepath.length - 1])
    console.log(name)

    collection.push({
      id: hashCode(name),
      sequence: 0,
      name: name,
      default: false,
    })
  })
  return writeFile(
    "src/reducers/brands.default.json",
    collection,
  )
})
