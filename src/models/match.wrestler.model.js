import { Record, List } from "immutable"

export const schema = {
  id: undefined,
  teamId: undefined,
  winner: false,
  loser: false,
  male: true,
  name: "Vacant",
}

const Model = new Record(schema)

export default Model
