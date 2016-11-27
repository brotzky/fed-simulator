import jsonfile from "jsonfile"
jsonfile.spaces = 2

export function cleanFilename(filename) {
  filename = filename.replace(".png", "")
  return filename
    .split("-")
    .map((word, key) => word.replace(/^[a-z]/, (m) => {
      return m.toUpperCase()
    }))
    .join(" ")
}

export function writeFile(path, data) {
  return jsonfile.writeFile(
    path,
    data,
    (err) => "Error: " + console.error(err)
  )
}
