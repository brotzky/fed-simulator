import { Record } from "immutable"

export const schema = {
  id: undefined,
  teamId: null,
  winner: false,
  loser: false,
}

const Model = new Record(schema)

export default Model
