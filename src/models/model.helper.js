import uniqid from "uniqid"

export const schema = {
  id: uniqid(),
}

export function getId(value) {
  return value === undefined ? uniqid() : value
}
