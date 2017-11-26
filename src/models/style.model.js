import { Record } from "immutable"

export const schema = {
  backgroundColor: "#32195a",
  color: "#fff",
  darkBgColor: "#000",
  shade: -60,
  untouched: true,
}

export const Style = new Record(schema)

export default Style
