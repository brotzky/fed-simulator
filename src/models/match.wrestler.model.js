import { Record } from "immutable"

export const schema = {
  id: undefined,
  championshipId: undefined,
  teamId: undefined,
  winner: false,
  loser: false,
  male: true,
  name: "Vacant",
}

const Model = new Record(schema)

export default Model
