import { Record } from "immutable"

export const schema = {
  id: undefined,
  losses: 0,
  current_champion: "",
  name: "",
  male: true,
	style: {
		backgroundColor: "#FFD700",
		color: "black",
	},
}

export const Championship = new Record(schema)

export default Championship
