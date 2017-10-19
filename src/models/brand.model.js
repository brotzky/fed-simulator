import { Record } from "immutable"

export const schema = {
  id: undefined,
  name: "",
  style: {
    backgroundColor: "purple",
    color: "white",
  },
}

export const Brand = new Record(schema)

export default Brand
