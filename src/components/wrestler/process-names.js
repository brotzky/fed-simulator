export default function processNames(name) {
  let names = name.trim().split(" ")

  if (names.length > 2) {
    names = [names[0], names.slice(0, -1).join(" ")]
  }
  return names
}
