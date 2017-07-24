import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      current_champion: "",
      name: "",
			losses: 0,
      createdOn: new Date().getDate()
    }
  }
}
