import { Record } from "immutable"

export const schema = {
  id: undefined,
  name: "",
  started: false,
}

export const Championship = new Record(schema)

export default Championship
