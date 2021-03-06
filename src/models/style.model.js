import { Record } from "immutable"

export const schema = {
	backgroundColor: "#3e029f",
  color: "#fff",
  darkBgColor: "#000",
  shade: -60,
  untouched: true,
}

export const Style = new Record(schema)

export default Style
