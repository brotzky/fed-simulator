import { Record, List } from "immutable"

export const schema = {
  id: undefined,
  showId: undefined,
  generated: false,
  simulated: false,
  wrestlers: List(),
}

export const Model = new Record(schema)

export default Model
