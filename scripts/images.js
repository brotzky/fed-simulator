import fs from "fs"
import paths from "../config/paths"
import jsonfile from "jsonfile"
jsonfile.spaces = 2

const toTitleCase = function(){
  return this.replace(/\b(\w+)/g, function(m,p){ return p[0].toUpperCase() + p.substr(1).toLowerCase() })
}
const imagePath = paths.appImgs + "/wrestlers/"

let wrestlers = []

console.log("Begin reading directory")
fs.readdir(imagePath, (err, files) => {
  function writeFile() {
    console.log("Writing wrestlers to JSON")
    jsonfile.writeFile(
      "src/reducers/drops.default.json",
      wrestlers,
      (err) => "Error: " + console.error(err)
    )
  }
  let itemsProcessed = 0
  console.log("Begin file list creation")
  files.forEach((file) => {
    var asyncFunction = ((file) => {
      itemsProcessed++
      if (itemsProcessed === files.length) {
        writeFile()
      }
    })
    // call async function
    asyncFunction(file)
    if (file === ".DS_Store") return
    file = file.replace(".png", "")
    file = file
      .split("-")
      .join(" ")
      .replace(/^[a-z]/, function(m){
        return m.toUpperCase()
      })
    wrestlers.push({
      name: file,
      bucket: "default",
    })
  })
})
