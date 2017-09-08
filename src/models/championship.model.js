import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
			losses: 0,
      current_champion: "",
      name: "",
    }
  }
}
