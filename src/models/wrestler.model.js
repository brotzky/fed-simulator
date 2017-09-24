import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      brandId: null,
      championshipId: null,
      cost: 500,
      damage: 100,
      image: "",
      losses: 0,
      male: true,
      name: "Default",
      points: 50,
      wins: 0,
    }
  }
}
