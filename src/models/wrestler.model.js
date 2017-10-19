import { Record } from "immutable"

export const schema = {
  id: undefined,
  brandId: undefined,
  championshipId: undefined,
  cost: 500,
  damage: 100,
  image: "",
  losses: 0,
  male: true,
  name: "Default",
  points: 50,
  wins: 0,
}

const Wrestler = new Record(schema)

export default Wrestler
