import uniqid from "uniqid"

export function hashCode(str) {
  return String(
    str
      .split("")
      .reduce(
        (prevHash, currVal) =>
          (prevHash << 5) - prevHash + currVal.charCodeAt(0),
        0
      )
  )
}

export function getId() {
  return uniqid()
}
