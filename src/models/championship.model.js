import { Record } from "immutable"

export const schema = {
  id: undefined,
  name: "",
  male: true,
  switches: 0,
  amount: 1,
  style: {
    backgroundColor: "#FFD700",
    color: "black",
  },
}

export const Championship = new Record(schema)

export default Championship
