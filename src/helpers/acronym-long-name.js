export default function acronymLongName(name) {
  return name.length > 4 ? name.match(/\b\w/g).join('') : name
}
