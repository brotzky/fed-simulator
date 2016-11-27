const glob = require("glob")
const imagePath = __dirname + "/import/championships/"
import { hashCode } from "../../src/helpers/hash"
import { writeFile, cleanFilename } from "./common"

let collection = []

glob(imagePath + "**/**.png", function (er, files) {
  files.forEach((filepath) => {
    let newFilepath = filepath.replace(imagePath, "")
    newFilepath = newFilepath.split("/")
    let name = cleanFilename(newFilepath[newFilepath.length - 1])

    collection.push({
      id: hashCode(name),
      name: name,
    })
  })
  return writeFile(
    "src/reducers/championships.default.json",
    collection,
  )
})
