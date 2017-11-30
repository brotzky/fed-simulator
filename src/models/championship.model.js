import { Record } from "immutable"

export const schema = {
  id: undefined,
  name: "",
  brandId: null,
  male: true,
  switches: 0,
  wrestlers: [],
  tag: false,
  style: {
    backgroundColor: "#FFD700",
    color: "black",
  },
}

export const Championship = new Record(schema)

export default Championship
