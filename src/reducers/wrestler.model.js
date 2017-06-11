import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      name: "Default",
      damage: 100,
      losses: 0,
      male: true,
      points: 50,
      wins: 0,
    }
  }
}
