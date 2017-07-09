export default function acronymLongName(name, length = 4) {
  return name.length > length ? name.match(/\b\w/g).join("") : name
}
