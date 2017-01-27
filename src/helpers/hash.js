export function hashCode(str) {
  console.log(str)
  return String(str.split('').reduce((prevHash, currVal) =>
    ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0))
}
