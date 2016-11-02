import fs from "fs"
import paths from "../config/paths"
import jsonfile from "jsonfile"
jsonfile.spaces = 2

const toTitleCase = function(){
  return this.replace(/\b(\w+)/g, function(m,p){ return p[0].toUpperCase() + p.substr(1).toLowerCase() })
}
const imagePath = paths.appImgs + "/wrestlers/"

let wrestlers = []

fs.readdir(imagePath, (err, files) => {
  function callback () { console.log('all done'); }
  files.forEach((file) => {
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
  console.log("wrestlers", wrestlers)
})

jsonfile.writeFile(
  "src/reducers/drops.default.json",
  wrestlers,
  (err) => "Error: " + console.error(err)
)
console.log("complete")
