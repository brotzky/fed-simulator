import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      name: "Default",
      current_champion: "",
      losses: 0,
      male: true,
    }
  }
}